"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, CheckCircle, AlertCircle, X, Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

type UploadState =
  | { kind: "idle" }
  | { kind: "validating" }
  | { kind: "uploading"; progress: number }
  | { kind: "done"; url: string; name: string }
  | { kind: "error"; message: string };

const MAX_DURATION_SECONDS = 60;
const MAX_FILE_SIZE = 100 * 1024 * 1024;
const VIDEO_METADATA_TIMEOUT_MS = 10_000;
const ALLOWED_TYPES = new Set(["video/mp4", "video/quicktime", "video/webm"]);

function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    const url = URL.createObjectURL(file);
    video.src = url;
    const done = () => {
      URL.revokeObjectURL(url);
    };

    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      done();
      reject(new Error("Video metadata timed out"));
    }, VIDEO_METADATA_TIMEOUT_MS);

    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      done();
      fn();
    };

    video.onloadedmetadata = () => {
      finish(() => resolve(video.duration));
    };
    video.onerror = () => {
      finish(() => reject(new Error("Could not read video metadata")));
    };
  });
}

export function VideoUpload({ value, onChange, error }: Props) {
  const [state, setState] = useState<UploadState>(
    value ? { kind: "done", url: value, name: "Uploaded video" } : { kind: "idle" },
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = useCallback(
    async (file: File) => {
      if (!ALLOWED_TYPES.has(file.type)) {
        setState({
          kind: "error",
          message: "Unsupported format. Use MP4, MOV, or WebM.",
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setState({ kind: "error", message: "File too large. Max 100 MB." });
        return;
      }

      setState({ kind: "validating" });

      try {
        const duration = await getVideoDuration(file);
        if (duration > MAX_DURATION_SECONDS + 1) {
          setState({
            kind: "error",
            message: `Video is ${Math.ceil(duration)}s. Please keep it under 1 minute.`,
          });
          return;
        }
      } catch {
        /* Let server handle duration enforcement */
      }

      setState({ kind: "uploading", progress: 0 });

      try {
        const formData = new FormData();
        formData.append("video", file);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload-video");

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setState({
              kind: "uploading",
              progress: Math.round((e.loaded / e.total) * 100),
            });
          }
        };

        const result = await new Promise<{ ok: boolean; url?: string; error?: string }>(
          (resolve, reject) => {
            xhr.onload = () => {
              if (xhr.status < 200 || xhr.status >= 300) {
                reject(new Error(`Upload failed (${xhr.status})`));
                return;
              }
              try {
                resolve(JSON.parse(xhr.responseText));
              } catch {
                reject(new Error("Invalid response"));
              }
            };
            xhr.onerror = () => reject(new Error("Network error"));
            xhr.send(formData);
          },
        );

        if (!result.ok || !result.url) {
          setState({
            kind: "error",
            message: result.error ?? "Upload failed. Please try again.",
          });
          return;
        }

        setState({ kind: "done", url: result.url, name: file.name });
        onChange(result.url);
      } catch {
        setState({ kind: "error", message: "Upload failed. Please try again." });
      }
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const reset = useCallback(() => {
    setState({ kind: "idle" });
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }, [onChange]);

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => state.kind !== "done" && inputRef.current?.click()}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          dragOver
            ? "border-[var(--color-brand-accent)] bg-[var(--color-brand-accent)]/10"
            : state.kind === "done"
              ? "border-[var(--color-brand-accent)]/40 bg-[var(--color-brand-accent)]/5 cursor-default"
              : state.kind === "error"
                ? "border-red-400/40 bg-red-400/5"
                : "border-white/20 bg-white/[0.04] hover:border-[var(--color-brand-accent)]/30 hover:bg-white/[0.07]",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
          onChange={handleChange}
          className="sr-only"
        />

        {state.kind === "idle" && (
          <>
            <Upload className="size-10 text-[var(--color-brand-accent)]/60" />
            <div>
              <p className="text-sm font-medium text-[color:var(--color-brand-cream)]">
                Drag and drop video here or{" "}
                <span className="text-[var(--color-brand-accent)] underline">
                  click to browse
                </span>
              </p>
              <div className="mt-2 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[color:var(--color-brand-cream)]/60">
                1 min max, YC-style
              </div>
              <p className="mt-1 text-xs text-[color:var(--color-brand-cream)]/40">
                MP4, MOV, or WebM &middot; 100 MB limit
              </p>
            </div>
          </>
        )}

        {state.kind === "validating" && (
          <>
            <Film className="size-10 text-[var(--color-brand-accent)] animate-pulse" />
            <p className="text-sm text-[color:var(--color-brand-cream)]/70">
              Checking video&hellip;
            </p>
          </>
        )}

        {state.kind === "uploading" && (
          <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-[color:var(--color-brand-cream)]/60">
              <span>Uploading&hellip;</span>
              <span className="font-[family-name:var(--font-mono)]">
                {state.progress}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-brand-accent)] transition-[width] duration-300"
                style={{ width: `${state.progress}%` }}
              />
            </div>
            <p className="text-[10px] text-center text-[color:var(--color-brand-cream)]/40 font-[family-name:var(--font-mono)] uppercase tracking-wider">
              Upload Progress: {state.progress}%
            </p>
          </div>
        )}

        {state.kind === "done" && (
          <div className="flex items-center gap-3">
            <CheckCircle className="size-6 text-[var(--color-brand-accent)] shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium text-[color:var(--color-brand-cream)] truncate max-w-[200px]">
                {state.name}
              </p>
              <p className="text-xs text-[var(--color-brand-accent)]">
                Uploaded successfully
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
              className="ml-auto rounded-full p-1.5 text-[color:var(--color-brand-cream)]/50 hover:bg-white/10 hover:text-[color:var(--color-brand-cream)] transition-colors"
              aria-label="Remove video"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {state.kind === "error" && (
          <>
            <AlertCircle className="size-10 text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-400">
                {state.message}
              </p>
              <p className="mt-1 text-xs text-[color:var(--color-brand-cream)]/40">
                Click to try again
              </p>
            </div>
          </>
        )}
      </div>
      {error && state.kind !== "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
