"use client";

import {
  BadgeCheck,
  Eye,
  Handshake,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useEmployeeBasicInfo } from "@/modules/employees";
import styles from "./page.module.css";

const coreValues = [
  {
    label: "Khách hàng",
    icon: <Users size={18} />,
  },
  {
    label: "Xã hội",
    icon: <Handshake size={18} />,
  },
  {
    label: "Sáng tạo",
    icon: <Lightbulb size={18} />,
  },
  {
    label: "Cá nhân",
    icon: <Sparkles size={18} />,
  },
  {
    label: "Trách nhiệm",
    icon: <BadgeCheck size={18} />,
  },
  {
    label: "Tinh thần đội nhóm",
    icon: <Users size={18} />,
  },
];

export default function HomePage() {
  const employeeBasicInfo = useEmployeeBasicInfo();
  const employeeName = employeeBasicInfo.data?.fullName ?? "Đang tải...";
  const employeeExternalId = employeeBasicInfo.data?.externalId ?? "Đang tải...";

  return (
    <div className={styles.home}>
      <section className={styles.employeeCard} aria-label="Thông tin nhân viên">
        <div className={styles.employeeAvatar}>H</div>

        <div className={styles.employeeInfo}>
          <span className={styles.companyName}>VietAus Polymer</span>
          <strong>{employeeName}</strong>
          <span>Mã nhân viên: {employeeExternalId}</span>
          {employeeBasicInfo.error ? (
            <span className={styles.employeeError}>{employeeBasicInfo.error}</span>
          ) : null}
        </div>
      </section>

      <section className={styles.visionBoard} aria-labelledby="vision-title">
        <div className={styles.boardHeader}>
          <span className={styles.eyebrow}>Định hướng doanh nghiệp</span>
          <h1 id="vision-title">Tầm nhìn, sứ mệnh và giá trị cốt lõi</h1>
        </div>

        <div className={styles.statementGrid}>
          <article className={styles.statement}>
            <div className={styles.statementHeading}>
              <div className={styles.statementIcon}>
                <Eye size={22} />
              </div>
              <span>Tầm nhìn</span>
            </div>

            <strong>Đổi mới sáng tạo - vươn tầm toàn cầu</strong>
          </article>

          <article className={styles.statement}>
            <div className={styles.statementHeading}>
              <div className={styles.statementIcon}>
                <Rocket size={22} />
              </div>
              <span>Sứ mệnh</span>
            </div>

            <strong>Hợp tác bền vững - nâng tầm giá trị</strong>
          </article>
        </div>

        <div className={styles.coreValues} aria-label="Giá trị cốt lõi">
          <div className={styles.timeline} />

          {coreValues.map((value, index) => (
            <article key={value.label} className={styles.valueItem}>
              <div className={styles.valueNumber}>{index + 1}</div>
              <div className={styles.valueIcon}>{value.icon}</div>
              <span>{value.label}</span>
            </article>
          ))}
        </div>

        <div className={styles.boardFooter}>
          <Target size={18} />
          <span>Giá trị cốt lõi</span>
        </div>
      </section>
    </div>
  );
}
