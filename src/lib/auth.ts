import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { roles } from "@/db/schema";
import { existingAccountEmail, otpEmail, resetEmail } from "@/emails/templates";
import { sendEmail } from "@/lib/email";
import { passwordError } from "@/lib/validation";

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
    : undefined;

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  // fixed url when set (production); otherwise trust the request host if it's one of ours
  baseURL: process.env.BETTER_AUTH_URL || {
    allowedHosts: ["localhost:*", "127.0.0.1:*", "polu-rho.vercel.app"],
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    resetPasswordTokenExpiresIn: 60 * 60,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({ to: user.email, ...resetEmail({ url }) });
    },
    // sign-up with a taken email returns a normal-looking success (so the form can't be used
    // to probe who has an account); tell the real owner instead
    onExistingUserSignUp: async ({ user }, request) => {
      const origin = request ? new URL(request.url).origin : (process.env.BETTER_AUTH_URL ?? "");
      const name = (user as { firstName?: string | null }).firstName;
      await sendEmail({
        to: user.email,
        ...existingAccountEmail({ name, loginUrl: `${origin}/login`, resetUrl: `${origin}/forgot-password` }),
      });
    },
  },

  emailVerification: { autoSignInAfterVerification: true },

  socialProviders: google ? { google } : {},

  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "user", input: true },
      firstName: { type: "string", required: false, input: true },
      lastName: { type: "string", required: false, input: true },
    },
  },

  plugins: [
    emailOTP({
      otpLength: 4,
      expiresIn: 10 * 60,
      sendVerificationOnSignUp: true,
      overrideDefaultEmailVerification: true,
      sendVerificationOTP: async ({ email, otp }) => {
        const existing = await db.query.user.findFirst({
          where: (u, { eq }) => eq(u.email, email),
          columns: { firstName: true },
        });
        await sendEmail({ to: email, ...otpEmail({ name: existing?.firstName, otp }) });
      },
    }),
    nextCookies(), // keep last so server actions can set cookies
  ],

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const { password, role } = ctx.body ?? {};
        const problem = passwordError(String(password ?? ""));
        if (problem) throw new APIError("BAD_REQUEST", { message: problem });
        if (role !== undefined && !roles.includes(role)) {
          throw new APIError("BAD_REQUEST", { message: "Pick a valid role" });
        }
      }

      if (ctx.path === "/reset-password") {
        const problem = passwordError(String(ctx.body?.newPassword ?? ""));
        if (problem) throw new APIError("BAD_REQUEST", { message: problem });
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
