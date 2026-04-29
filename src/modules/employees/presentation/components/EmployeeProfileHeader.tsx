import { BadgeCheck } from "lucide-react";
import type { EmployeeProfile } from "../../domain/entities/EmployeeProfile";
import styles from "../screens/EmployeeDetailScreen.module.css";

type EmployeeProfileHeaderProps = {
  employee: EmployeeProfile;
};

export function EmployeeProfileHeader({ employee }: EmployeeProfileHeaderProps) {
  return (
    <section className={styles.profileHeader}>
      <div className={styles.avatar}>{employee.avatar}</div>
      <div className={styles.identity}>
        <span className={styles.employeeCode}>{employee.code}</span>
        <h1>{employee.name}</h1>
        <p>{employee.title}</p>
      </div>
      <div className={styles.headerMeta}>
        <span className={styles.statusBadge}>
          <BadgeCheck size={16} />
          {employee.status}
        </span>
        <span>{employee.department}</span>
        <span>{employee.location}</span>
      </div>
    </section>
  );
}
