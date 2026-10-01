import type { Metadata } from "next";
import { SignUpFlow } from "./signup-flow";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return <SignUpFlow />;
}
