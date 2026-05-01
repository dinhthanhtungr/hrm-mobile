"use client";

import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import styles from "./FilterPopover.module.css";

type FilterPopoverProps = {
  children:
    | React.ReactNode
    | ((controls: { close: () => void }) => React.ReactNode);
  activeCount?: number;
  onClear?: () => void;
};

export function FilterPopover({
  children,
  activeCount = 0,
  onClear,
}: FilterPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  function close() {
    setIsOpen(false);
  }

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
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
        className={styles.button}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span>Filter</span>
        {activeCount > 0 ? (
          <span className={styles.count}>{activeCount}</span>
        ) : null}
        {activeCount > 0 && onClear ? (
          <span
            role="button"
            tabIndex={0}
            className={styles.clearButton}
            aria-label="Xóa bộ lọc"
            onClick={(event) => {
              event.stopPropagation();
              onClear();
              close();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                onClear();
                close();
              }
            }}
          >
            <X size={13} />
          </span>
        ) : null}
        <SlidersHorizontal size={16} />
      </button>

      {isOpen ? (
        <div className={styles.popover}>
          {typeof children === "function" ? children({ close }) : children}
        </div>
      ) : null}
    </div>
  );
}
