"use client";

import { useMemo, useState } from "react";
import { saveAuthSession } from "@/core/auth/tokenStorage";
import { createLoginUseCase } from "../../infrastructure/factories/createLoginUseCase";

type LoginFormState = {
  password: string;
  username: string;
};

export function useLogin() {
  const [form, setForm] = useState<LoginFormState>({
    password: "",
    username: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loginUseCase = useMemo(() => createLoginUseCase(), []);

  function updateField(field: keyof LoginFormState, value : string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }


  async function submit() {

    if (!form.username.trim()) {
      setError("Không được để trống tên đăng nhập.");
      setSuccessMessage(null);
      return { ok: false as const };
    } 

    else if (!form.password.trim()) {
      setError("Không được để trống mật khẩu.");
      setSuccessMessage(null);
      return { ok: false as const };
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const session = await loginUseCase.execute({
        password: form.password,
        username: form.username,
      });

      saveAuthSession({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        roles: session.roles,
      });

      setSuccessMessage(
        session.personName
          ? `Đăng nhập thành công! Xin chào ${session.personName}`
          : "Đăng nhập thành công!",
      );

      return { ok: true as const };
    } catch {
      setError("Đăng nhập không thành công.");
      return { ok: false as const };
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    error,
    form,
    isSubmitting,
    submit,
    successMessage,
    updateField,
  };
}
