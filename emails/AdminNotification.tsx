import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

export interface AdminNotificationProps {
  fullName: string;
  email: string;
  phone?: string | null;
  school: string;
  major: string;
  videoUrl: string;
  eventSlug: string;
  submittedAt: string;
}

export function AdminNotification({
  fullName,
  email,
  phone,
  school,
  major,
  videoUrl,
  eventSlug,
  submittedAt,
}: AdminNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New PITCHER registration: {fullName} ({email})
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>New pitcher registration</Heading>
          <Text style={meta}>
            Event: {eventSlug} &middot; {submittedAt}
          </Text>

          <Text style={typeBadge}>PITCHER</Text>

          <Hr style={hr} />

          <Row label="Name" value={fullName} />
          <Row label="Email" value={email} />
          {phone ? <Row label="Phone" value={phone} /> : null}
          <Row label="School" value={school} />
          <Row label="Major" value={major} />

          <Hr style={hr} />

          <Text style={rowStyle}>
            <strong style={labelStyle}>Pitch Video:</strong>{" "}
            <Link href={videoUrl} style={linkStyle}>
              Watch video &rarr;
            </Link>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            View full record in the Supabase dashboard. This email is
            informational; no action required.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Text style={rowStyle}>
      <strong style={labelStyle}>{label}:</strong> {value}
    </Text>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#f5f7f8",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "12px",
  border: "1px solid #e6ebea",
};

const h1: React.CSSProperties = {
  color: "#003d4d",
  fontSize: "24px",
  fontWeight: 700,
  margin: "0 0 8px",
};

const meta: React.CSSProperties = {
  color: "#5a6f77",
  fontSize: "13px",
  margin: 0,
};

const typeBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#003d4d",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: 700,
  padding: "4px 10px",
  borderRadius: "4px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  margin: "8px 0 0",
};

const rowStyle: React.CSSProperties = {
  color: "#1a1a1a",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const labelStyle: React.CSSProperties = {
  color: "#5a6f77",
  marginRight: "8px",
};

const linkStyle: React.CSSProperties = {
  color: "#003d4d",
  textDecoration: "underline",
};

const hr: React.CSSProperties = {
  borderColor: "#e6ebea",
  margin: "20px 0",
};

const footer: React.CSSProperties = {
  color: "#9aa6a3",
  fontSize: "12px",
  margin: 0,
};

export default AdminNotification;
