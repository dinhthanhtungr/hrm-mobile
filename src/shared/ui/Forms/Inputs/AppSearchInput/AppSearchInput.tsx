"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./AppSearchInput.module.css";

type AppSearchInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  onClear?: () => void;
};

export const AppSearchInput = React.forwardRef<
  HTMLInputElement,
  AppSearchInputProps
>(function AppSearchInput({ className, onClear, value, ...props }, ref) {
  const canClear = Boolean(onClear && value);

  return (
    <label className={cn(styles.searchInput, className)}>
      <Search size={16} />
      <input ref={ref} type="text" value={value} {...props} />
      {canClear ? (
        <button type="button" aria-label="Xóa tìm kiếm" onClick={onClear}>
          <X size={14} />
        </button>
      ) : null}
    </label>
  );
});
