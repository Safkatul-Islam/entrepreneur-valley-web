import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface RegistrationConfirmationProps {
  fullName: string;
  discordInvite: string;
  siteUrl: string;
}

export function RegistrationConfirmation({
  fullName,
  discordInvite,
  siteUrl,
}: RegistrationConfirmationProps) {
  const firstName = fullName.split(/\s+/)[0] || "there";

  return (
    <Html>
      <Head />
      <Preview>
        You&rsquo;re registered for Sharks&rsquo; Valley — see you there.
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={h1}>You&rsquo;re in.</Heading>

          <Text style={paragraph}>Hi {firstName},</Text>

          <Text style={paragraph}>
            Thanks for registering for <strong>Sharks&rsquo; Valley</strong> —
            Entrepreneur Valley&rsquo;s flagship pitch event. We&rsquo;ll send
            event details (date, time, location, prep notes) to this email
            address as the date approaches.
          </Text>

          <Section style={cta}>
            <Link href={discordInvite} style={button}>
              Join the Discord →
            </Link>
          </Section>

          <Text style={paragraph}>
            The Discord is where the community actually happens — introductions,
            cofounder hunts, Q&amp;A with mentors. Worth ten minutes today.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Entrepreneur Valley · Santa Monica College
            <br />
            <Link href={siteUrl} style={footerLink}>
              {siteUrl.replace(/^https?:\/\//, "")}
            </Link>
          </Text>

          <Text style={footerSmall}>
            You received this because you registered on our website. We only
            email about event logistics. Reply to this email with any
            questions.
          </Text>
        </Container>
      </Body>
    </Html>
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
  padding: "40px 32px",
  maxWidth: "560px",
  borderRadius: "12px",
  border: "1px solid #e6ebea",
};

const h1: React.CSSProperties = {
  color: "#0a5f32",
  fontSize: "32px",
  fontWeight: 700,
  lineHeight: "1.2",
  margin: "0 0 24px",
};

const paragraph: React.CSSProperties = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const cta: React.CSSProperties = {
  margin: "32px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#0a5f32",
  color: "#ffffff",
  display: "inline-block",
  padding: "12px 24px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "15px",
};

const hr: React.CSSProperties = {
  borderColor: "#e6ebea",
  margin: "32px 0 24px",
};

const footer: React.CSSProperties = {
  color: "#5a6b66",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0 0 12px",
};

const footerLink: React.CSSProperties = {
  color: "#0a5f32",
  textDecoration: "none",
};

const footerSmall: React.CSSProperties = {
  color: "#9aa6a3",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: 0,
};

export default RegistrationConfirmation;
