import type { EmployeeProfile } from "../../domain/entities/EmployeeProfile";
import styles from "../screens/EmployeeDetailScreen.module.css";

type EmployeePersonalEditFormProps = {
  employee: EmployeeProfile;
};

export function EmployeePersonalEditForm({
  employee,
}: EmployeePersonalEditFormProps) {
  return (
    <>
      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionHeader}>
          <h3>Thông tin định danh</h3>
        </div>

        <div className={styles.drawerGrid}>
          <label className={styles.drawerField}>
            CCCD
            <input defaultValue={employee.personal.identifier} />
          </label>

          <label className={styles.drawerField}>
            Ngày cấp
            <input defaultValue="2021-04-12" type="date" />
          </label>

          <label className={`${styles.drawerField} ${styles.fullSpan}`}>
            Nơi cấp
            <input defaultValue={employee.personal.identifierIssuePlace} />
          </label>
        </div>
      </section>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionHeader}>
          <h3>Thông tin cá nhân</h3>
        </div>

        <div className={styles.drawerGrid}>
          <label className={styles.drawerField}>
            Ngày sinh
            <input defaultValue="1996-08-18" type="date" />
          </label>

          <label className={styles.drawerField}>
            Giới tính
            <select defaultValue={employee.personal.gender}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </label>

          <label className={styles.drawerField}>
            Dân tộc
            <input defaultValue={employee.personal.ethnicity} />
          </label>

          <label className={styles.drawerField}>
            Trình độ
            <select defaultValue={employee.personal.educationLevel}>
              <option value="THPT">THPT</option>
              <option value="Trung cấp">Trung cấp</option>
              <option value="Cao đẳng">Cao đẳng</option>
              <option value="Đại học">Đại học</option>
              <option value="Thạc sĩ">Thạc sĩ</option>
              <option value="Khác">Khác</option>
            </select>
          </label>

          <label className={`${styles.drawerField} ${styles.fullSpan}`}>
            Tình trạng hôn nhân
            <select defaultValue={employee.personal.maritalStatus}>
              <option value="Độc thân">Độc thân</option>
              <option value="Đã kết hôn">Đã kết hôn</option>
              <option value="Khác">Khác</option>
            </select>
          </label>
        </div>
      </section>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionHeader}>
          <h3>Địa chỉ</h3>
        </div>

        <div className={styles.drawerGrid}>
          <label className={`${styles.drawerField} ${styles.fullSpan}`}>
            Địa chỉ thường trú
            <textarea defaultValue={employee.personal.permanentAddress} />
          </label>

          <label className={`${styles.drawerField} ${styles.fullSpan}`}>
            Địa chỉ tạm trú
            <textarea defaultValue={employee.personal.temporaryAddress} />
          </label>
        </div>
      </section>
    </>
  );
}
