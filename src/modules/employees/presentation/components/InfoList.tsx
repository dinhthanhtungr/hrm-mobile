import styles from "../screens/EmployeeDetailScreen.module.css";

type InfoListProps = {
  items: string[][];
};

export function InfoList({ items }: InfoListProps) {
  return (
    <dl className={styles.infoList}>
      {items.map(([label, value]) => (
        <div key={label} className={styles.infoRow}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
