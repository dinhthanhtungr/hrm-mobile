"use client";

import { AppButton } from "@/shared/ui/Buttons/AppButton";
import { PrimaryButton } from "@/shared/ui/Buttons/PrimaryButton";
import { FloatingLabelInput } from "@/shared/ui/Forms/Inputs/FloatingLabelInput/FloatingLabelInput";

type LoginFormProps = {
  error: string | null;
  isSubmitting: boolean;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onUsernameChange: (value: string) => void;
  password: string;
  successMessage: string | null;
  username: string;
};

export function LoginForm({
  error,
  isSubmitting,
  onPasswordChange,
  onSubmit,
  onUsernameChange,
  password,
  successMessage,
  username,
}: LoginFormProps) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden bg-[linear-gradient(145deg,#173b2c_0%,#23543f_38%,#d9ebe0_100%)] lg:block" />
      <section className="flex min-h-dvh items-center justify-center px-5 py-8">
        <div className="w-full max-w-md rounded-lg border border-[#d8ded1] bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-[#151713]">Đăng nhập</h1>
          <p className="mt-2 text-sm text-[#5c6658]">Sử dụng tài khoản hiện tại của bạn.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              void onSubmit();
            }}
          >
            <FloatingLabelInput
              label="Tên đăng nhập"
              value={username}
              onChange={onUsernameChange}
              autoComplete="username"
            />

            <FloatingLabelInput
              label="Mật khẩu"
              value={password}
              onChange={onPasswordChange}
              type="password"
              autoComplete="current-password"
            />
            <AppButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Dang dang nhap..." : "Dang nhap"}
            </AppButton>
          </form>
          {successMessage ? <p className="mt-4 text-sm text-[#1b7a41]">{successMessage}</p> : null}
          {error ? <p className="mt-4 text-sm text-[#c23636]">{error}</p> : null}
        </div>
      </section>
    </div>
  );
}
