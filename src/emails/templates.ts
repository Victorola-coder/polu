// email layouts from the figma "otp email message" and "password reset email" frames:
// polu wordmark, greeting, a highlighted code or button, small print, footer.

const purple = "#9f79ff";
const ink = "#1e1e1e";
const grey = "#7e7e7e";

function layout(body: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#f7f7f7;font-family:Helvetica,Arial,sans-serif;color:${ink}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:12px;padding:40px">
          <tr><td style="font-size:28px;font-weight:800;color:${purple};letter-spacing:-0.5px;padding-bottom:28px">polu</td></tr>
          ${body}
          <tr><td style="padding-top:32px;font-size:12px;color:${grey}">© ${new Date().getFullYear()} Polu Technology Limited</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function otpEmail({ name, otp }: { name?: string | null; otp: string }) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  return {
    subject: `${otp} is your Polu verification code`,
    text: `${greeting}\n\nYour 4-digit code to verify your Polu account is ${otp}. It expires in 10 minutes.\n\nIf you didn't request this code, you can safely ignore this email.\n\nThe Polu Team`,
    html: layout(`
      <tr><td style="font-size:16px;font-weight:700;padding-bottom:8px">${greeting}</td></tr>
      <tr><td style="font-size:14px;line-height:22px;color:${grey};padding-bottom:20px">Your 4-digit code to verify your Polu account is:</td></tr>
      <tr><td align="center" style="background:#f5f1ff;border-radius:8px;padding:16px;font-size:32px;font-weight:800;letter-spacing:8px">${otp}</td></tr>
      <tr><td style="font-size:14px;line-height:22px;color:${grey};padding-top:20px">Enter this code in the app to complete your sign-up. It expires in 10 minutes for your security.</td></tr>
      <tr><td style="font-size:14px;line-height:22px;color:${grey};padding-top:12px">If you didn’t request this code, you can safely ignore this email. Thanks for choosing Polu.</td></tr>
      <tr><td style="font-size:14px;color:${grey};padding-top:12px">The Polu Team</td></tr>`),
  };
}

export function resetEmail({ url }: { url: string }) {
  return {
    subject: "Reset your Polu password",
    text: `We received a request to reset your password.\n\nReset it here: ${url}\n\nIf you didn't want to reset your password, you can ignore this email. For security reasons, this link will expire after 1 hour.\n\nThe Polu Team`,
    html: layout(`
      <tr><td style="font-size:14px;line-height:22px;padding-bottom:12px">We received a request to reset your password.</td></tr>
      <tr><td style="font-size:14px;line-height:22px;color:${grey};padding-bottom:12px">If you didn’t want to reset your password, you can ignore this email. If you didn’t request this change, you may want to review your account security settings.</td></tr>
      <tr><td style="font-size:14px;line-height:22px;color:${grey};padding-bottom:24px">For security reasons, this link will expire after 1 hour.</td></tr>
      <tr><td><a href="${url}" style="display:inline-block;background:${purple};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px">Reset password</a></td></tr>
      <tr><td style="font-size:14px;color:${grey};padding-top:24px">The Polu Team</td></tr>`),
  };
}

export function existingAccountEmail({ name, loginUrl, resetUrl }: { name?: string | null; loginUrl: string; resetUrl: string }) {
  const greeting = name ? `Hi ${name},` : "Hi,";
  return {
    subject: "You already have a Polu account",
    text: `${greeting}\n\nSomeone just tried to sign up to Polu with this email, but you already have an account.\n\nLog in: ${loginUrl}\nForgot your password? ${resetUrl}\n\nIf this wasn't you, you can ignore this email.\n\nThe Polu Team`,
    html: layout(`
      <tr><td style="font-size:16px;font-weight:700;padding-bottom:8px">${greeting}</td></tr>
      <tr><td style="font-size:14px;line-height:22px;color:${grey};padding-bottom:24px">Someone just tried to sign up to Polu with this email, but you already have an account. Log in instead, or reset your password if you’ve forgotten it.</td></tr>
      <tr><td><a href="${loginUrl}" style="display:inline-block;background:${purple};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px">Log in</a>
        <a href="${resetUrl}" style="display:inline-block;margin-left:12px;color:${ink};font-size:14px">Reset password</a></td></tr>
      <tr><td style="font-size:14px;line-height:22px;color:${grey};padding-top:24px">If this wasn’t you, you can safely ignore this email.</td></tr>`),
  };
}
