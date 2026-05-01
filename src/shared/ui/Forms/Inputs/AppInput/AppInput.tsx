"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./AppInput.module.css";

type AppInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  error?: React.ReactNode;
};

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  function AppInput({ className, error, label, ...props }, ref) {
    return (
      <label className={styles.field}>
        {label ? <span className={styles.label}>{label}</span> : null}
        <input
          ref={ref}
          className={cn(styles.input, className)}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error ? <span className={styles.error}>{error}</span> : null}
      </label>
    );
  },
);
