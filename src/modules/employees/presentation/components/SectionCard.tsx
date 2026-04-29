import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import styles from "../screens/EmployeeDetailScreen.module.css";

type SectionCardProps = {
  actionLabel?: string;
  children: ReactNode;
  icon: ReactNode;
  onEdit?: () => void;
  title: string;
};

export function SectionCard({
  actionLabel = "Chỉnh sửa",
  children,
  icon,
  onEdit,
  title,
}: SectionCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          {icon}
          <h2>{title}</h2>
        </div>

        {onEdit ? (
          <button type="button" className={styles.ghostButton} onClick={onEdit}>
            <Pencil size={15} />
            {actionLabel}
          </button>
        ) : null}
      </div>

      {children}
    </section>
  );
}
