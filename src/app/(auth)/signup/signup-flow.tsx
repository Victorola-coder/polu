"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthCard, AuthHeading, AuthShell } from "@/components/auth/auth-shell";
import { VerifyCode } from "@/components/auth/verify-code";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import {
  continueWithGoogle,
  emailError,
  passwordError,
  signUp,
  verifyEmail,
  type Role,
  type SignUpInput,
} from "@/lib/auth-actions";
import { cn } from "@/lib/cn";

type Step = "details" | "role" | "verify";

const roles: { id: Role; title: string; caption: string; label: string }[] = [
  {
    id: "user",
    title: "User",
    label: "user",
    caption:
      "Order custom prints, track your deliveries and get high-quality posters and stickers delivered to your doorstep",
  },
  {
    id: "merchant",
    title: "Merchant",
    label: "merchant",
    caption:
      "Start receiving customer print orders, manage your printing workflow, in partnership with us",
  },
  {
    id: "rider",
    title: "Delivery rider",
    label: "delivery rider",
    caption:
      "Earn by picking up and delivering print orders efficiently, while choosing delivery schedules that work for you.",
  },
];

const signInPrompt = { text: "Already have an account ?", cta: "Sign in", href: "/login" };

export function SignUpFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<SignUpInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpInput, string>>>({});
  const [role, setRole] = useState<Role>("user");
  const [busy, setBusy] = useState(false);
  const [verifyError, setVerifyError] = useState<string>();
  const [created, setCreated] = useState(false);
  const [formError, setFormError] = useState<string>();

  const update = (key: keyof SignUpInput) => (e: { target: { value: string } }) => {
    setDetails((d) => ({ ...d, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const submitDetails = (e: FormEvent) => {
    e.preventDefault();
    const next = {
      firstName: details.firstName.trim() ? undefined : "Enter your first name",
      lastName: details.lastName.trim() ? undefined : "Enter your last name",
      email: emailError(details.email) ?? undefined,
      password: passwordError(details.password) ?? undefined,
    };
    setErrors(next);
    if (Object.values(next).every((v) => !v)) setStep("role");
  };

  const submitRole = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setFormError(undefined);
    try {
      await signUp({ ...details, role });
      setStep("verify");
    } catch (err) {
      setFormError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setFormError(undefined);
    try {
      await continueWithGoogle();
    } catch {
      setFormError("Google sign-in isn’t available yet. Use your email for now.");
    }
  };

  const verify = async (code: string) => {
    setBusy(true);
    setVerifyError(undefined);
    try {
      await verifyEmail(details.email, code);
      setCreated(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setVerifyError((err as Error).message);
      setBusy(false);
    }
  };

  if (step === "verify") {
    const label = roles.find((r) => r.id === role)!.label;
    return (
      <AuthShell prompt={signInPrompt}>
        <VerifyCode
          email={details.email}
          verifying={busy}
          error={verifyError}
          success={created ? `Account created successfully, you’re now a ${label}!` : undefined}
          onVerify={verify}
        />
      </AuthShell>
    );
  }

  return (
    <AuthShell prompt={signInPrompt} illustration>
      {step === "details" ? (
        <AuthCard className="flex flex-col gap-10">
          <AuthHeading title="Let’s get started" caption="Please enter your credentials below" />

          <form onSubmit={submitDetails} noValidate className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
                <Input
                  label="First name"
                  autoComplete="given-name"
                  value={details.firstName}
                  onChange={update("firstName")}
                  error={errors.firstName}
                />
                <Input
                  label="Last name"
                  autoComplete="family-name"
                  value={details.lastName}
                  onChange={update("lastName")}
                  error={errors.lastName}
                />
              </div>
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={details.email}
                onChange={update("email")}
                error={errors.email}
              />
              <PasswordInput
                label="Password"
                autoComplete="new-password"
                value={details.password}
                onChange={update("password")}
                error={errors.password}
                hint="Your password must be at least 8 characters with a number, an uppercase letter, and a special symbol."
              />
            </div>

            <div className="flex flex-col gap-5">
              <Button type="submit" icon="arrow-right" className="w-full">
                Continue
              </Button>
              <div className="flex items-center gap-2.5 text-xs text-ink">
                <span className="h-px flex-1 bg-neutral-100" />
                OR
                <span className="h-px flex-1 bg-neutral-100" />
              </div>
              <Button type="button" variant="ghost" icon="google" className="w-full" onClick={google}>
                Sign up with Google
              </Button>
              {formError && <p className="text-center text-body-sm text-red-500">{formError}</p>}
            </div>
          </form>
        </AuthCard>
      ) : (
        <AuthCard className="flex flex-col gap-10">
          <h1 className="text-h5 text-ink">Sign up as a</h1>

          <form onSubmit={submitRole} className="flex flex-col gap-10">
            <fieldset className="flex flex-col gap-3">
              <legend className="sr-only">Choose a role</legend>
              {roles.map((r) => (
                <label
                  key={r.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-5 rounded-lg border-[1.5px] p-5 transition-colors",
                    role === r.id ? "border-primary" : "border-transparent hover:bg-neutral-50",
                  )}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.id}
                    checked={role === r.id}
                    onChange={() => setRole(r.id)}
                    className="sr-only"
                  />
                  <span className="flex flex-1 flex-col gap-3">
                    <span className="text-xl leading-7 font-bold text-ink">{r.title}</span>
                    <span className="text-body text-neutral-600">{r.caption}</span>
                  </span>
                  <Image
                    src="/icons/check-circle.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={cn("shrink-0 transition-opacity", role === r.id ? "opacity-100" : "opacity-0")}
                  />
                </label>
              ))}
            </fieldset>

            <div className="flex flex-col gap-3">
              {formError && <p className="text-center text-body-sm text-red-500">{formError}</p>}
              <Button type="submit" className="w-full" loading={busy}>
                Continue
              </Button>
              <button
                type="button"
                onClick={() => setStep("details")}
                className="cursor-pointer text-body-sm text-neutral-700 hover:text-ink"
              >
                Back
              </button>
            </div>
          </form>
        </AuthCard>
      )}
    </AuthShell>
  );
}
