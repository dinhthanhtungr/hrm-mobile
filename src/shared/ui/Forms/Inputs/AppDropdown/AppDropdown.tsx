"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./AppDropdown.module.css";

export type AppDropdownOption = {
  label: string;
  value: string;
  description?: string;
};

type AppDropdownProps = {
  label?: React.ReactNode;
  options: AppDropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
};

function getSelectedOptions(options: AppDropdownOption[], value: string | string[]) {
  const values = Array.isArray(value) ? value : [value];

  return options.filter((option) => values.includes(option.value));
}

export function AppDropdown({
  className,
  disabled,
  label,
  multiple = false,
  onChange,
  options,
  placeholder = "Chọn...",
  searchable = false,
  value,
}: AppDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const selectedOptions = getSelectedOptions(options, value);
  const selectedValues = new Set(selectedOptions.map((option) => option.value));

  const filteredOptions = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return options;
    }

    return options.filter((option) =>
      `${option.label} ${option.description ?? ""}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [options, query]);

  const displayValue =
    selectedOptions.length === 0
      ? placeholder
      : multiple
        ? `${selectedOptions.length} đã chọn`
        : selectedOptions[0]?.label;

  React.useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  function selectOption(option: AppDropdownOption) {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const nextValues = currentValues.includes(option.value)
        ? currentValues.filter((currentValue) => currentValue !== option.value)
        : [...currentValues, option.value];

      onChange(nextValues);
      return;
    }

    onChange(option.value);
    setIsOpen(false);
  }

  return (
    <div ref={rootRef} className={cn(styles.root, className)}>
      {label ? <span className={styles.label}>{label}</span> : null}

      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span
          className={
            selectedOptions.length === 0 ? styles.placeholder : styles.value
          }
        >
          {displayValue}
        </span>
        <ChevronDown size={16} />
      </button>

      {isOpen ? (
        <div className={styles.popover}>
          {searchable ? (
            <label className={styles.searchBox}>
              <Search size={15} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tìm kiếm..."
                autoFocus
              />
            </label>
          ) : null}

          <div className={styles.optionList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.empty}>Không có lựa chọn.</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(styles.option, isSelected && styles.selected)}
                    onClick={() => selectOption(option)}
                  >
                    <span>
                      <strong>{option.label}</strong>
                      {option.description ? (
                        <small>{option.description}</small>
                      ) : null}
                    </span>
                    {isSelected ? <Check size={16} /> : null}
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
