import AuthForm from "@/components/auth-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign Out",
};

const SignUpPage = () => {
  return <AuthForm type="SignUp" />;
};

export default SignUpPage;
