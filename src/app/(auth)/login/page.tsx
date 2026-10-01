import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to Polu to place and track your print orders.",
  openGraph: { title: "Log in - Polu", description: "Log in to Polu to place and track your print orders." },
  twitter: { title: "Log in - Polu", description: "Log in to Polu to place and track your print orders." },
};

export default function LoginPage() {
  return <LoginForm />;
}
