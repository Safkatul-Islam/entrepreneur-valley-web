import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export interface AdminNotificationProps {
  fullName: string;
  email: string;
  phone?: string | null;
  school: string;
  yearMajor: string;
  motivation?: string | null;
  dietary?: string | null;
  accessibility?: string | null;
  eventSlug: string;
  submittedAt: string;
}

export function AdminNotification({
  fullName,
  email,
  phone,
  school,
  yearMajor,
  motivation,
  dietary,
  accessibility,
  eventSlug,
  submittedAt,
}: AdminNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New registration: {fullName} ({email})
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>New registration</Heading>
          <Text style={meta}>
            Event: {eventSlug} · {submittedAt}
          </Text>

          <Hr style={hr} />

          <Row label="Name" value={fullName} />
          <Row label="Email" value={email} />
          {phone ? <Row label="Phone" value={phone} /> : null}
          <Row label="School" value={school} />
          <Row label="Year & major" value={yearMajor} />
          {dietary ? <Row label="Dietary" value={dietary} /> : null}
          {accessibility ? (
            <Row label="Accessibility" value={accessibility} />
          ) : null}
          {motivation ? <Row label="Motivation" value={motivation} /> : null}

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
  backgroundColor: "#f6f8f7",
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
  color: "#0a5f32",
  fontSize: "24px",
  fontWeight: 700,
  margin: "0 0 8px",
};

const meta: React.CSSProperties = {
  color: "#5a6b66",
  fontSize: "13px",
  margin: 0,
};

const rowStyle: React.CSSProperties = {
  color: "#1a1a1a",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const labelStyle: React.CSSProperties = {
  color: "#5a6b66",
  marginRight: "8px",
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
