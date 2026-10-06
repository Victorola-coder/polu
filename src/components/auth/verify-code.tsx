"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import { resendCode } from "@/lib/auth-actions";
import { AuthCard } from "./auth-shell";

const RESEND_SECONDS = 120;

type Props = {
  email: string;
  verifying: boolean;
  success?: string;
  error?: string;
  onVerify: (code: string) => void;
};

export function VerifyCode({ email, verifying, success, error, onVerify }: Props) {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  const [resendError, setResendError] = useState<string>();

  const resend = async () => {
    if (seconds > 0) return;
    setResendError(undefined);
    try {
      await resendCode(email);
      setSeconds(RESEND_SECONDS);
      setCode("");
    } catch (err) {
      setResendError((err as Error).message);
    }
  };

  const time = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <AuthCard center className="flex flex-col gap-10">
      {success && (
        <p
          role="status"
          className="flex items-center gap-2 rounded-lg border border-success/40 bg-success-50 px-4 py-2.5 text-left text-body-sm text-success"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.03 7.03-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 4.47-4.47a.75.75 0 1 1 1.06 1.06Z" />
          </svg>
          {success}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-h5 text-ink">We’ve sent you a code</h1>
        <p className="text-body text-neutral-600">
          Please enter the 4 digit code we sent to <span className="text-ink">{email}</span>
        </p>
      </div>

      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          onVerify(code);
        }}
      >
        <OtpInput value={code} onChange={setCode} />
        {error && <p className="-mt-4 text-body-sm text-red-500">{error}</p>}

        <div className="flex flex-col items-center gap-8">
          <Button type="submit" className="w-full" loading={verifying} disabled={code.length < 4}>
            Verify email
          </Button>

          <div className="flex flex-col items-center gap-3 text-body-sm">
            <p className="text-neutral-600">
              Didn’t get a code?{" "}
              <button
                type="button"
                onClick={resend}
                disabled={seconds > 0}
                className="cursor-pointer text-ink underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                Click here to get a new one
              </button>
            </p>
            {resendError && <p className="text-red-500">{resendError}</p>}
            {seconds > 0 && (
              <p className="text-ink">
                Resend code in <span className="text-success">{time}</span> minutes
              </p>
            )}
          </div>
        </div>
      </form>
    </AuthCard>
  );
}
