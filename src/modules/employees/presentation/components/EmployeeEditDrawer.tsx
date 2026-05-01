import { Upload, X } from "lucide-react";
import {
  employeeDrawerTitles,
  type EmployeeDetailDrawerKey,
} from "./employee-detail.types";
import { EmployeePersonalEditForm } from "./EmployeePersonalEditForm";
import type { EmployeeProfile } from "../../domain/entities/EmployeeProfile";
import styles from "../screens/EmployeeDetailScreen.module.css";

type EmployeeEditDrawerProps = {
  employee: EmployeeProfile;
  onClose: () => void;
  section: EmployeeDetailDrawerKey;
};

function DrawerContent({
  employee,
  section,
}: {
  employee: EmployeeProfile;
  section: EmployeeDetailDrawerKey;
}) {
  if (section === "personal") {
    return <EmployeePersonalEditForm employee={employee} />;
  }

  if (section === "account") {
    return (
      <>
        <label>
          Tên đăng nhập
          <input defaultValue={employee.account.userName} />
        </label>
        <label>
          Roles
          <select defaultValue={employee.account.roles[0]}>
            <option>HC_HRUser</option>
            <option>Leader</option>
            <option>Admin</option>
          </select>
        </label>
        <label className={styles.checkRow}>
          <input type="checkbox" defaultChecked={employee.account.isActive} />
          Kích hoạt tài khoản
        </label>
      </>
    );
  }

  if (section === "contracts") {
    return (
      <>
        <label>
          Số hợp đồng
          <input defaultValue={employee.contracts[0]?.contractNo} />
        </label>
        <label>
          Loại hợp đồng
          <select defaultValue="indefinite">
            <option value="probation">Thử việc</option>
            <option value="fixed">Xác định thời hạn</option>
            <option value="indefinite">Không xác định thời hạn</option>
            <option value="seasonal">Thời vụ</option>
          </select>
        </label>
        <label>
          Ngày bắt đầu
          <input defaultValue="2024-03-12" type="date" />
        </label>
        <label>
          Ngày kết thúc
          <input type="date" />
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
            <option value="degree">Bằng cấp / chứng chỉ</option>
            <option value="health">Giấy khám sức khỏe</option>
          </select>
        </label>
        <label>
          Ghi chú
          <textarea defaultValue="Tài liệu cần đối chiếu trước khi xác minh." />
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
          Ngân hàng
          <input defaultValue={employee.bankAccounts[0]?.bankName} />
        </label>
        <label>
          Số tài khoản
          <input defaultValue={employee.bankAccounts[0]?.accountNumber} />
        </label>
        <label>
          Số BHXH
          <input defaultValue={employee.insurance.socialInsuranceNumber} />
        </label>
        <label>
          Mã số thuế
          <input defaultValue={employee.insurance.taxCode} />
        </label>
      </>
    );
  }

  if (section === "job") {
    return (
      <>
        <label>
          Mã chấm công
          <input defaultValue={employee.workProfile.attendanceCode} />
        </label>
        <label>
          Phòng ban
          <select defaultValue="human-capital">
            <option value="human-capital">Human Capital</option>
            <option value="lab">Lab</option>
            <option value="manufacture">Manufacture</option>
          </select>
        </label>
        <label>
          Chức vụ
          <input defaultValue={employee.workProfile.jobTitleName} />
        </label>
        <label>
          Hiệu lực từ
          <input defaultValue="2026-05-01" type="date" />
        </label>
      </>
    );
  }

  if (section === "organization") {
    return (
      <>
        <label>
          Quản lý trực tiếp
          <input defaultValue={employee.manager} />
        </label>
        <label>
          Team
          <input defaultValue={employee.team} />
        </label>
        <label>
          Chi nhánh
          <input defaultValue={employee.location} />
        </label>
        <label>
          Ngày hiệu lực
          <input defaultValue="2026-05-01" type="date" />
        </label>
      </>
    );
  }

  return null;
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
          <DrawerContent employee={employee} section={section} />
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
