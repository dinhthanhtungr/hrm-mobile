"use client";

import { useId } from "react";
import styles from "./FloatingLabelInput.module.css";

type FloatingLabelInputTone = "default" | "brand" | "danger";

type FloatingLabelInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password" | "email";
  name?: string;
  autoComplete?: string;
  tone?: FloatingLabelInputTone;
};

export function FloatingLabelInput({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  name,
  tone = "default",
}: FloatingLabelInputProps) {
  const generated = useId();
  const inputId = name || generated;

  return (
    <div
      className={`${styles.wrapper} ${
        tone === "brand"
          ? styles.brand
          : tone === "danger"
            ? styles.danger
            : styles.default
      }`}
    >
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder=" "
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={styles.input}
      />
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
