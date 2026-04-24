"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const generated = useId();
  const inputId = name || generated;

  const [isFocused, setIsFocused] = useState(false);
  const [hasAutofillValue, setHasAutofillValue] = useState(false);

  useEffect(() => {
    const syncValue = () => {
      if (inputRef.current) {
        setHasAutofillValue(inputRef.current.value.trim().length > 0);
      }
    };

    syncValue();

    const frameId = requestAnimationFrame(syncValue);
    const timeoutId = window.setTimeout(syncValue, 150);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const hasValue = value.trim().length > 0;
  const isActive = isFocused || hasValue || hasAutofillValue;

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
        ref={inputRef}
        id={inputId}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue);
          setHasAutofillValue(nextValue.trim().length > 0);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.input}
      />
      <label
        htmlFor={inputId}
        className={`${styles.label} ${isActive ? styles.labelActive : ""}`}
      >
        {label}
      </label>
    </div>
  );
}