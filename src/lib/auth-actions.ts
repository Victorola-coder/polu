"use client";

import type { Role } from "@/db/schema";
import { authClient } from "./auth-client";

export type { Role };
export { emailError, passwordError } from "./validation";

export type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class EmailNotVerifiedError extends Error {}

type Result = { error: { message?: string; code?: string; status?: number } | null };

function unwrap<T extends Result>(res: T, fallback: string) {
  if (res.error) {
    if (res.error.code === "EMAIL_NOT_VERIFIED") throw new EmailNotVerifiedError("Verify your email to continue");
    throw new Error(res.error.message || fallback);
  }
  return res;
}

export async function signUp(input: SignUpInput & { role: Role }) {
  unwrap(
    await authClient.signUp.email({
      email: input.email.trim().toLowerCase(),
      password: input.password,
      name: `${input.firstName.trim()} ${input.lastName.trim()}`,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      role: input.role,
    }),
    "Could not create your account",
  );
  return { email: input.email };
}

export async function verifyEmail(email: string, code: string) {
  unwrap(await authClient.emailOtp.verifyEmail({ email, otp: code }), "That code didn’t work");
  return { email };
}

export async function resendCode(email: string) {
  unwrap(
    await authClient.emailOtp.sendVerificationOtp({ email, type: "email-verification" }),
    "Could not send a new code",
  );
  return { email };
}

export async function logIn(email: string, password: string) {
  unwrap(
    await authClient.signIn.email({ email: email.trim().toLowerCase(), password }),
    "Email or password is incorrect",
  );
  return { email };
}

export async function requestPasswordReset(email: string) {
  unwrap(
    await authClient.requestPasswordReset({ email: email.trim().toLowerCase(), redirectTo: "/reset-password" }),
    "Could not send the reset link",
  );
  return { email };
}

export async function resetPassword(token: string, password: string) {
  unwrap(await authClient.resetPassword({ token, newPassword: password }), "This reset link is invalid or has expired");
  return { ok: true };
}

export async function continueWithGoogle() {
  unwrap(await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" }), "Google sign-in failed");
}
