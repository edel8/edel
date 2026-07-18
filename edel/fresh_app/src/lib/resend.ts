/* ============================================================
   MINDWELL — RESEND EMAIL HELPER (Free: 100/day, 3000/month)
   Set RESEND_API_KEY in .env.local
   Docs: https://resend.com/docs
   ============================================================ */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = "Mindwell <hello@mindwell.app>";

type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: EmailPayload) {
  if (!RESEND_API_KEY) {
    console.warn("[resend] RESEND_API_KEY not set — skipping send");
    return { skipped: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend failed: ${err}`);
  }
  return res.json();
}

export function welcomeEmail(name: string) {
  return {
    subject: "Welcome to your calm space 🌿",
    html: `
      <div style="font-family:Georgia,serif;max-width:480px;margin:auto;padding:32px;background:#FFFBF5;border-radius:24px">
        <h1 style="color:#1A1A1A;font-size:28px">Welcome, ${name}.</h1>
        <p style="color:#475569;line-height:1.6">
          Your Mindwell sanctuary is ready. Start with a single breath — we'll guide the rest.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://mindwell.app"}/dashboard"
           style="display:inline-block;margin-top:16px;padding:14px 28px;background:#9CAF88;color:#FFFBF5;border-radius:16px;text-decoration:none;font-weight:600">
          Enter your space
        </a>
      </div>`,
  };
}

export function verificationEmail(code: string) {
  return {
    subject: "Verify your Mindwell account",
    html: `
      <div style="font-family:Georgia,serif;max-width:480px;margin:auto;padding:32px;background:#FFFBF5;border-radius:24px">
        <h1 style="color:#1A1A1A">Almost there 🌿</h1>
        <p style="color:#475569">Your verification code is:</p>
        <p style="font-size:32px;letter-spacing:8px;color:#9CAF88;font-weight:700">${code}</p>
      </div>`,
  };
}
