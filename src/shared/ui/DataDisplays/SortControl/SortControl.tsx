"use client";

import { ArrowDownAZ } from "lucide-react";
import { AppDropdown } from "@/shared/ui/Forms/Inputs/AppDropdown/AppDropdown";
import styles from "./SortControl.module.css";

export type SortDirection = "asc" | "desc";

type SortOption = {
  label: string;
  value: string;
};

type SortControlProps = {
  label?: string;
  value: string;
  direction: SortDirection;
  options: SortOption[];
  onChange: (value: string) => void;
  onDirectionChange: (direction: SortDirection) => void;
};

export function SortControl({
  label = "Sắp xếp",
  value,
  direction,
  options,
  onChange,
  onDirectionChange,
}: SortControlProps) {
  return (
    <div className={styles.sortControl}>
      <span className={styles.label}>{label}:</span>

      <AppDropdown
        value={value}
        options={options}
        onChange={(nextValue) => {
          if (typeof nextValue === "string") {
            onChange(nextValue);
          }
        }}
      />

      <button
        type="button"
        className={styles.directionButton}
        onClick={() => onDirectionChange(direction === "asc" ? "desc" : "asc")}
        aria-label="Đổi chiều sắp xếp"
      >
        <ArrowDownAZ size={16} />
        {direction === "asc" ? "Tăng" : "Giảm"}
      </button>
    </div>
  );
}
