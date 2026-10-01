/*
 * auth api stubs. there's no backend yet, so these just simulate latency.
 * swap each body for a real fetch to the polu api when it's ready.
 */

export type Role = "user" | "merchant" | "rider";

export type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const wait = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms));

export async function signUp(input: SignUpInput & { role: Role }) {
  await wait();
  return { email: input.email };
}

export async function verifyEmail(email: string, code: string) {
  await wait();
  if (code.length !== 4) throw new Error("Enter the 4 digit code");
  return { email };
}

export async function resendCode(email: string) {
  await wait(500);
  return { email };
}

export async function logIn(email: string, password: string) {
  await wait();
  if (!email || !password) throw new Error("Enter your email and password");
  return { email };
}

export async function requestPasswordReset(email: string) {
  await wait();
  return { email };
}

export async function resetPassword(token: string, password: string) {
  await wait();
  return { ok: !!password };
}

export function passwordError(password: string) {
  if (password.length < 8) return "Use at least 8 characters";
  if (!/\d/.test(password)) return "Add at least one number";
  if (!/[A-Z]/.test(password)) return "Add at least one uppercase letter";
  if (!/[^A-Za-z0-9]/.test(password)) return "Add at least one special symbol";
  return null;
}

export function emailError(email: string) {
  return /^\S+@\S+\.\S+$/.test(email) ? null : "Enter a valid email address";
}
