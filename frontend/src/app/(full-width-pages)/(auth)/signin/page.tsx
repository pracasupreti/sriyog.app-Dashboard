import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LogIn Page | Sriyog Login Page",
  description: "This is Next.js Sriyog LogIn Page",
};

export default function SignIn() {
  return <SignInForm />;
}
