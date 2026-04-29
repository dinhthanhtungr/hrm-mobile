import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  FileText,
  History,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { EmployeeProfile } from "../../domain/entities/EmployeeProfile";
import {
  documents,
  history,
  jobInfo,
  organizationInfo,
  payrollInfo,
  permissions,
  personalInfo,
  roles,
} from "../data/mockEmployees";
import { InfoList } from "./InfoList";
import { SectionCard } from "./SectionCard";
import {
  type EmployeeDetailDrawerKey,
  type EmployeeDetailTabKey,
} from "./employee-detail.types";
import styles from "../screens/EmployeeDetailScreen.module.css";

type EmployeeTabContentProps = {
  employee: EmployeeProfile;
  onEdit: (section: EmployeeDetailDrawerKey) => void;
  tab: EmployeeDetailTabKey;
};

export function EmployeeTabContent({
  employee,
  onEdit,
  tab,
}: EmployeeTabContentProps) {
  if (tab === "overview") {
    return (
      <div className={styles.sectionGrid}>
        <SectionCard icon={<UserRound size={18} />} title="Hồ sơ nhanh">
          <InfoList items={personalInfo.slice(0, 3)} />
        </SectionCard>
        <SectionCard icon={<BriefcaseBusiness size={18} />} title="Công việc">
          <InfoList items={jobInfo.slice(0, 3)} />
        </SectionCard>
        <SectionCard icon={<Building2 size={18} />} title="Tổ chức">
          <InfoList items={organizationInfo.slice(0, 3)} />
        </SectionCard>
        <SectionCard icon={<ShieldCheck size={18} />} title="Quyền">
          <div className={styles.tagList}>
            {roles.slice(0, 4).map((role) => (
              <span key={role} className={styles.tag}>
                <KeyRound size={14} />
                {role}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>
    );
  }

  if (tab === "personal") {
    return (
      <div className={styles.sectionGrid}>
        <SectionCard
          icon={<UserRound size={18} />}
          title="Thông tin cá nhân"
          onEdit={() => onEdit("personal")}
        >
          <InfoList items={personalInfo} />
        </SectionCard>
        <SectionCard icon={<Phone size={18} />} title="Liên hệ">
          <div className={styles.contactList}>
            <span>
              <Mail size={16} />
              {employee.email}
            </span>
            <span>
              <Phone size={16} />
              {employee.phone}
            </span>
            <span>
              <MapPin size={16} />
              {employee.address}
            </span>
            <span>
              <CalendarClock size={16} />
              Vào làm: {employee.joinDate}
            </span>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (tab === "job") {
    return (
      <SectionCard
        icon={<BriefcaseBusiness size={18} />}
        title="Công việc"
        actionLabel="Cập nhật"
        onEdit={() => onEdit("job")}
      >
        <InfoList items={jobInfo} />
      </SectionCard>
    );
  }

  if (tab === "organization") {
    return (
      <div className={styles.sectionGrid}>
        <SectionCard
          icon={<Building2 size={18} />}
          title="Tổ chức"
          actionLabel="Điều chuyển"
          onEdit={() => onEdit("organization")}
        >
          <InfoList items={organizationInfo} />
        </SectionCard>
        <SectionCard
          icon={<UsersRound size={18} />}
          title="Team"
          onEdit={() => onEdit("organization")}
        >
          <div className={styles.teamList}>
            <span>{employee.team}</span>
            <span>6 thành viên</span>
            <span>2 yêu cầu đang chờ duyệt</span>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (tab === "account") {
    return (
      <SectionCard
        icon={<ShieldCheck size={18} />}
        title="Tài khoản & phân quyền"
        actionLabel="Quản lý quyền"
        onEdit={() => onEdit("account")}
      >
        <div className={styles.permissionLayout}>
          <div>
            <span className={styles.subTitle}>Roles</span>
            <div className={styles.tagList}>
              {roles.map((role) => (
                <span key={role} className={styles.tag}>
                  <KeyRound size={14} />
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className={styles.subTitle}>Quyền thao tác</span>
            <div className={styles.tagList}>
              {permissions.map((permission) => (
                <span key={permission} className={styles.tagMuted}>
                  {permission}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>
    );
  }

  if (tab === "payroll") {
    return (
      <SectionCard
        icon={<Banknote size={18} />}
        title="Lương & đãi ngộ"
        actionLabel="Cập nhật lương"
        onEdit={() => onEdit("payroll")}
      >
        <InfoList items={payrollInfo} />
      </SectionCard>
    );
  }

  if (tab === "documents") {
    return (
      <SectionCard
        icon={<FileText size={18} />}
        title="Tài liệu"
        actionLabel="Tải lên"
        onEdit={() => onEdit("documents")}
      >
        <div className={styles.table}>
          {documents.map((document) => (
            <div key={document.name} className={styles.tableRow}>
              <strong>{document.name}</strong>
              <span>{document.status}</span>
              <span>{document.updatedAt}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard icon={<History size={18} />} title="Lịch sử & audit">
      <ol className={styles.timeline}>
        {history.map((item) => (
          <li key={`${item.event}-${item.time}`}>
            <span>{item.time}</span>
            <strong>{item.event}</strong>
            <p>{item.detail}</p>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}
