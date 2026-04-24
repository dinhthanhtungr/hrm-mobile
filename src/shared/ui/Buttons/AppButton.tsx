import { cn } from "@/lib/utils";
import { Button } from "../shadcn/button";
import styles from "./AppButton.module.css";

type AppButtonProps = React.ComponentProps<typeof Button>;

export function AppButton({
  className,
  variant = "default",
  size = "default",
  ...props
}: AppButtonProps) {
  return (
    <Button
      className={cn(
        styles.button,
        variant === "default" && styles.default,
        variant === "outline" && styles.outline,
        variant === "secondary" && styles.secondary,
        variant === "ghost" && styles.ghost,
        variant === "destructive" && styles.destructive,
        size === "default" && styles.sizeDefault,
        size === "sm" && styles.sizeSm,
        size === "lg" && styles.sizeLg,
        className,
      )}
      size={size}
      variant={variant}
      {...props}
    />
  );
}
