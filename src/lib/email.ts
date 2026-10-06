import "server-only";

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const from = process.env.EMAIL_FROM ?? "Polu <onboarding@resend.dev>";

export async function sendEmail({ to, subject, html, text }: { to: string; subject: string; html: string; text: string }) {
  if (!resend) {
    // no provider configured: print it so you can grab codes/links while developing
    console.log(`\n✉️  email to ${to}\n   subject: ${subject}\n   ${text.replace(/\n/g, "\n   ")}\n`);
    return;
  }

  const { error } = await resend.emails.send({ from, to, subject, html, text });
  if (error) {
    console.error("email failed", error);
    throw new Error("Could not send email");
  }
}
