import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimitDb } from "@/lib/rate-limit-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const ALLOWED_TYPES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);
const BUCKET = "pitch-videos";

interface ErrorResponse {
  ok: false;
  error: string;
}

interface SuccessResponse {
  ok: true;
  url: string;
}

function err(
  body: ErrorResponse,
  init: ResponseInit,
): NextResponse<ErrorResponse> {
  return NextResponse.json(body, init);
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";

  const rl = await rateLimitDb(`upload:${ip}`, RATE_LIMIT);
  if (!rl.ok) {
    return err(
      { ok: false, error: "Too many uploads. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return err({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("video");
  if (!(file instanceof File)) {
    return err({ ok: false, error: "No video file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return err(
      { ok: false, error: "Unsupported format. Please upload MP4, MOV, or WebM." },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return err(
      { ok: false, error: "File too large. Maximum size is 100 MB." },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "mp4";
  const fileName = `${crypto.randomUUID()}.${ext}`;

  try {
    const supabase = getSupabaseAdmin();
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[upload-video] storage error", uploadError);
      return err(
        { ok: false, error: "Upload failed. Please try again." },
        { status: 500 },
      );
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    return NextResponse.json({ ok: true, url: urlData.publicUrl });
  } catch (e) {
    console.error("[upload-video] unexpected", e);
    return err(
      { ok: false, error: "Upload failed. Please try again." },
      { status: 500 },
    );
  }
}
