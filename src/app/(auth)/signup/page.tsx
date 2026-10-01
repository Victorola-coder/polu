import type { Metadata } from "next";
import { SignUpFlow } from "./signup-flow";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a free Polu account and place your first print order in minutes.",
  openGraph: { title: "Sign up - Polu", description: "Create a free Polu account and place your first print order in minutes." },
  twitter: { title: "Sign up - Polu", description: "Create a free Polu account and place your first print order in minutes." },
};

export default function SignUpPage() {
  return <SignUpFlow />;
}
