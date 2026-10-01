import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SignUpFlow } from "./signup-flow";

export const metadata: Metadata = pageMetadata(
  "Sign up",
  "Create a free Polu account and place your first print order in minutes.",
);

export default function SignUpPage() {
  return <SignUpFlow />;
}
