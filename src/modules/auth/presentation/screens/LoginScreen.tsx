"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/core/config/routes";
import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

export function LoginScreen() {
  const router = useRouter();
  const { error, form, isSubmitting, submit, successMessage, updateField } = useLogin();

  async function handleSubmit() {
    const result = await submit();

    if (result.ok) {
      router.push(routes.home);
    }
  }

  return (
    <LoginForm
      error={error}
      isSubmitting={isSubmitting}
      onPasswordChange={(value) => updateField("password", value)}
      onSubmit={handleSubmit}
      onUsernameChange={(value) => updateField("username", value)}
      password={form.password}
      successMessage={successMessage}
      username={form.username}
    />
  );
}
