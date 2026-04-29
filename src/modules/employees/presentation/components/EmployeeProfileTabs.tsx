import {
  employeeDetailTabs,
  type EmployeeDetailTabKey,
} from "./employee-detail.types";
import styles from "../screens/EmployeeDetailScreen.module.css";

type EmployeeProfileTabsProps = {
  activeTab: EmployeeDetailTabKey;
  onTabChange: (tab: EmployeeDetailTabKey) => void;
};

export function EmployeeProfileTabs({
  activeTab,
  onTabChange,
}: EmployeeProfileTabsProps) {
  return (
    <nav className={styles.tabs} aria-label="Employee profile sections">
      {employeeDetailTabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          data-active={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
