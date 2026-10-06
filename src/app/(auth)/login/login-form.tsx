"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthCard, AuthHeading, AuthShell } from "@/components/auth/auth-shell";
import { VerifyCode } from "@/components/auth/verify-code";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import {
  continueWithGoogle,
  emailError,
  EmailNotVerifiedError,
  logIn,
  resendCode,
  verifyEmail,
} from "@/lib/auth-actions";

export function LoginForm({ notice }: { notice?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [busy, setBusy] = useState(false);
  const [needsCode, setNeedsCode] = useState(false);
  const [verifyError, setVerifyError] = useState<string>();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = {
      email: emailError(email) ?? undefined,
      password: password ? undefined : "Enter your password",
    };
    setErrors(next);
    if (next.email || next.password) return;

    setBusy(true);
    try {
      await logIn(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      if (err instanceof EmailNotVerifiedError) {
        // signed up but never entered the code: send a fresh one and verify inline
        await resendCode(email).catch(() => {});
        setNeedsCode(true);
      } else {
        setErrors({ form: (err as Error).message });
      }
      setBusy(false);
    }
  };

  const verify = async (code: string) => {
    setBusy(true);
    setVerifyError(undefined);
    try {
      await verifyEmail(email, code);
      await logIn(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setVerifyError((err as Error).message);
      setBusy(false);
    }
  };

  const google = async () => {
    try {
      await continueWithGoogle();
    } catch {
      setErrors({ form: "Google sign-in isn’t available yet. Use your email for now." });
    }
  };

  if (needsCode) {
    return (
      <AuthShell prompt={{ text: "Don’t have an account?", cta: "Sign up", href: "/signup" }}>
        <VerifyCode email={email} verifying={busy} error={verifyError} onVerify={verify} />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      prompt={{ text: "Don’t have an account?", cta: "Sign up", href: "/signup" }}
      illustration
    >
      <AuthCard className="flex flex-col gap-10">
        <AuthHeading title="Welcome back" caption="Please enter your credentials below" />
        {notice && (
          <p role="status" className="-mt-4 rounded-lg bg-success-50 px-4 py-2.5 text-body-sm text-success">
            {notice}
          </p>
        )}

        <form onSubmit={submit} noValidate className="flex flex-col gap-9">
          <div className="flex flex-col gap-6">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <div className="flex flex-col gap-3">
              <PasswordInput
                label="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              <Link
                href="/forgot-password"
                className="self-end text-body-sm text-neutral-700 hover:text-ink hover:underline"
              >
                Forgotten password?
              </Link>
            </div>
          </div>

          {errors.form && <p className="-mt-4 text-body-sm text-red-500">{errors.form}</p>}

          <div className="flex flex-col gap-5">
            <Button type="submit" icon="arrow-right" className="w-full" loading={busy}>
              Continue
            </Button>
            <div className="flex items-center gap-2.5 text-xs text-ink">
              <span className="h-px flex-1 bg-neutral-100" />
              OR
              <span className="h-px flex-1 bg-neutral-100" />
            </div>
            <Button type="button" variant="ghost" icon="google" className="w-full" onClick={google}>
              Continue with Google
            </Button>
          </div>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
