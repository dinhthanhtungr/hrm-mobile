"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import styles from "./RowActions.module.css";

export type RowActionItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

type RowActionsProps = {
  actions: RowActionItem[];
  label?: string;
};

export function RowActions({
  actions,
  label = "Mở thao tác",
}: RowActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-label={label}
        aria-expanded={isOpen}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((current) => !current);
        }}
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen ? (
        <div className={styles.menu} role="menu">
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              role="menuitem"
              disabled={action.disabled}
              className={`${styles.item} ${action.danger ? styles.danger : ""}`}
              onClick={(event) => {
                event.stopPropagation();

                if (action.disabled) {
                  return;
                }

                action.onSelect();
                setIsOpen(false);
              }}
            >
              {action.icon ? (
                <span className={styles.icon}>{action.icon}</span>
              ) : null}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
