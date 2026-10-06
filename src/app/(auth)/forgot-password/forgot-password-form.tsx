"use client";

import { useState, type FormEvent } from "react";
import { AuthCard, AuthShell } from "@/components/auth/auth-shell";
import { BackToLogin } from "@/components/auth/back-to-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { emailError, requestPasswordReset } from "@/lib/auth-actions";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err = emailError(email);
    setError(err ?? undefined);
    if (err) return;
    setBusy(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <AuthShell>
        <AuthCard center className="flex max-w-[400px] flex-col items-center gap-6">
          <svg width="40" height="32" viewBox="0 0 40 32" fill="none" aria-hidden>
            <rect x="1" y="1" width="38" height="30" rx="3" fill="#FFBC01" stroke="#1E1E1E" />
            <path d="m2 3 18 14L38 3" stroke="#1E1E1E" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl leading-7 font-extrabold text-ink">Email on the way</h1>
            <p className="text-body-sm text-neutral-600">
              We sent you password reset instructions. If it doesn’t show up soon, check your spam
              folder. We sent it from the email address no-reply@polu.ng
            </p>
          </div>
          <BackToLogin />
        </AuthCard>
      </AuthShell>
    );
  }

  return (
    <AuthShell prompt={{ text: "Don’t have an account?", cta: "Sign up", href: "/signup" }}>
      <AuthCard center className="flex max-w-[400px] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl leading-7 font-extrabold text-ink">Forgotten password</h1>
          <p className="text-body-sm text-neutral-600">
            No worries. Enter your account’s email address and we’ll send you a link to reset your
            password.
          </p>
        </div>
        <form onSubmit={submit} noValidate className="flex flex-col gap-6">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            className="text-left"
          />
          <Button type="submit" className="w-full" loading={busy}>
            Send reset link
          </Button>
          <BackToLogin />
        </form>
      </AuthCard>
    </AuthShell>
  );
}
