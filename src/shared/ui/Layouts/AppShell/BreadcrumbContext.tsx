"use client";

import * as React from "react";

type BreadcrumbLabels = Record<string, string>;

type BreadcrumbContextValue = {
  labels: BreadcrumbLabels;
  setLabel: (segment: string, label: string) => void;
  removeLabel: (segment: string) => void;
};

const BreadcrumbContext = React.createContext<BreadcrumbContextValue | null>(
  null,
);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [labels, setLabels] = React.useState<BreadcrumbLabels>({});

  const setLabel = React.useCallback((segment: string, label: string) => {
    setLabels((current) => {
      if (current[segment] === label) {
        return current;
      }

      return {
        ...current,
        [segment]: label,
      };
    });
  }, []);

  const removeLabel = React.useCallback((segment: string) => {
    setLabels((current) => {
      if (!(segment in current)) {
        return current;
      }

      const next = { ...current };
      delete next[segment];
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({
      labels,
      setLabel,
      removeLabel,
    }),
    [labels, removeLabel, setLabel],
  );

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumbLabel(segment: string, label: string) {
  const context = React.useContext(BreadcrumbContext);
  const setLabel = context?.setLabel;
  const removeLabel = context?.removeLabel;

  React.useEffect(() => {
    if (!setLabel || !removeLabel || !segment || !label) {
      return;
    }

    setLabel(segment, label);

    return () => {
      removeLabel(segment);
    };
  }, [label, removeLabel, segment, setLabel]);
}

export function useBreadcrumbLabels() {
  return React.useContext(BreadcrumbContext)?.labels ?? {};
}
