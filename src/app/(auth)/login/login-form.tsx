"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthCard, AuthHeading, AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { emailError, logIn } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [busy, setBusy] = useState(false);

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
      router.push("/");
    } catch (err) {
      setErrors({ form: (err as Error).message });
      setBusy(false);
    }
  };

  return (
    <AuthShell
      prompt={{ text: "Don’t have an account?", cta: "Sign up", href: "/signup" }}
      illustration
    >
      <AuthCard className="flex flex-col gap-10">
        <AuthHeading title="Welcome back" caption="Please enter your credentials below" />

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
            <Button type="button" variant="ghost" icon="google" className="w-full">
              Continue with Google
            </Button>
          </div>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
