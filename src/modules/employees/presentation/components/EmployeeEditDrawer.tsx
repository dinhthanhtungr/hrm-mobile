import { Upload, X } from "lucide-react";
import {
  employeeDrawerTitles,
  type EmployeeDetailDrawerKey,
} from "./employee-detail.types";
import type { EmployeeProfile } from "../../domain/entities/EmployeeProfile";
import styles from "../screens/EmployeeDetailScreen.module.css";

type EmployeeEditDrawerProps = {
  employee: EmployeeProfile;
  onClose: () => void;
  section: EmployeeDetailDrawerKey;
};

function DrawerContent({ section }: { section: EmployeeDetailDrawerKey }) {
  if (section === "account") {
    return (
      <>
        <label>
          Roles
          <select defaultValue="HC_HRUser">
            <option>HC_HRUser</option>
            <option>Leader</option>
            <option>Admin</option>
          </select>
        </label>
        <label className={styles.checkRow}>
          <input type="checkbox" defaultChecked />
          Edit profile
        </label>
        <label className={styles.checkRow}>
          <input type="checkbox" defaultChecked />
          Approve leave
        </label>
        <label className={styles.checkRow}>
          <input type="checkbox" />
          Edit payroll
        </label>
      </>
    );
  }

  if (section === "documents") {
    return (
      <>
        <label>
          Loại tài liệu
          <select defaultValue="contract">
            <option value="contract">Hợp đồng lao động</option>
            <option value="identity">CCCD</option>
            <option value="policy">Cam kết bảo mật</option>
          </select>
        </label>
        <button type="button" className={styles.uploadBox}>
          <Upload size={18} />
          Tải tài liệu lên
        </button>
      </>
    );
  }

  if (section === "payroll") {
    return (
      <>
        <label>
          Lương cơ bản
          <input defaultValue="22000000" />
        </label>
        <label>
          Phụ cấp
          <input defaultValue="2500000" />
        </label>
        <label>
          Ngày hiệu lực
          <input defaultValue="2026-05-01" type="date" />
        </label>
        <label>
          Lý do thay đổi
          <textarea defaultValue="Điều chỉnh theo kỳ đánh giá năng lực." />
        </label>
      </>
    );
  }

  return (
    <>
      <label>
        Trường cần cập nhật
        <input defaultValue={section === "job" ? "Senior HR Executive" : "Nguyễn Thanh An"} />
      </label>
      <label>
        Ngày hiệu lực
        <input defaultValue="2026-05-01" type="date" />
      </label>
      <label>
        Ghi chú
        <textarea defaultValue="Cập nhật theo quyết định mới nhất." />
      </label>
    </>
  );
}

export function EmployeeEditDrawer({
  employee,
  onClose,
  section,
}: EmployeeEditDrawerProps) {
  return (
    <div className={styles.drawerBackdrop}>
      <aside className={styles.drawer} aria-label={employeeDrawerTitles[section]}>
        <div className={styles.drawerHeader}>
          <div>
            <span className={styles.eyebrow}>{employee.name}</span>
            <h2>{employeeDrawerTitles[section]}</h2>
          </div>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Đóng"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <form className={styles.drawerForm}>
          <DrawerContent section={section} />
        </form>

        <div className={styles.drawerFooter}>
          <button type="button" className={styles.secondaryButton} onClick={onClose}>
            Hủy
          </button>
          <button type="button" className={styles.primaryButton}>
            Lưu thay đổi
          </button>
        </div>
      </aside>
    </div>
  );
}
