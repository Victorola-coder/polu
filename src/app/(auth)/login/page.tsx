import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { LoginForm } from "./login-form";

export const metadata: Metadata = pageMetadata(
  "Log in",
  "Log in to Polu to place and track your print orders.",
);

export default function LoginPage() {
  return <LoginForm />;
}
