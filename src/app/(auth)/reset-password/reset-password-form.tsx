"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthCard, AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/input";
import { passwordError, resetPassword } from "@/lib/auth";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = {
      password: passwordError(password) ?? undefined,
      confirm: confirm === password ? undefined : "Passwords don’t match",
    };
    setErrors(next);
    if (next.password || next.confirm) return;
    setBusy(true);
    await resetPassword(token, password);
    router.push("/login");
  };

  return (
    <AuthShell>
      <AuthCard center className="flex max-w-[460px] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl leading-7 font-extrabold text-ink">Reset password</h1>
          <p className="text-body-sm text-neutral-600">
            Almost done. Enter your new password and you’re good to go.
          </p>
        </div>
        <form onSubmit={submit} noValidate className="flex flex-col gap-6 text-left">
          <PasswordInput
            label="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint="Your password must be at least 8 characters with a number, an uppercase letter, and a special symbol."
          />
          <PasswordInput
            label="Confirm password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
          />
          <Button type="submit" className="w-full" loading={busy}>
            Reset password
          </Button>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
