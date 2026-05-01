import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  FileText,
  History,
  KeyRound,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { EmployeeProfile } from "../../domain/entities/EmployeeProfile";
import {
  getBankInfo,
  getInsuranceInfo,
  getJobInfo,
  getOrganizationInfo,
  getPersonalInfo,
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

function renderTags(items: string[]) {
  return (
    <div className={styles.tagList}>
      {items.map((item) => (
        <span key={item} className={styles.tag}>
          <KeyRound size={14} />
          {item}
        </span>
      ))}
    </div>
  );
}

export function EmployeeTabContent({
  employee,
  onEdit,
  tab,
}: EmployeeTabContentProps) {
  const personalInfo = getPersonalInfo(employee);
  const jobInfo = getJobInfo(employee);
  const organizationInfo = getOrganizationInfo(employee);
  const insuranceInfo = getInsuranceInfo(employee);

  if (tab === "overview") {
    return (
      <div className={styles.sectionGrid}>
        <SectionCard icon={<UserRound size={18} />} title="Hồ sơ nhanh">
          <InfoList items={personalInfo.slice(0, 4)} />
        </SectionCard>
        <SectionCard icon={<BriefcaseBusiness size={18} />} title="Công việc">
          <InfoList items={jobInfo.slice(0, 5)} />
        </SectionCard>
        <SectionCard icon={<Building2 size={18} />} title="Tổ chức">
          <InfoList items={organizationInfo} />
        </SectionCard>
        <SectionCard icon={<ShieldCheck size={18} />} title="Tài khoản & quyền">
          {renderTags(employee.account.roles.slice(0, 4))}
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
        <SectionCard icon={<UsersRound size={18} />} title="Người thân">
          <div className={styles.table}>
            {employee.relatives.map((relative) => (
              <div key={relative.fullName} className={styles.tableRow}>
                <strong>{relative.fullName}</strong>
                <span>{relative.relationship}</span>
                <span>{relative.phoneNumber}</span>
              </div>
            ))}
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
            <span>Quản lý: {employee.manager}</span>
            <span>Phòng ban: {employee.department}</span>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (tab === "contracts") {
    return (
      <SectionCard
        icon={<FileText size={18} />}
        title="Hợp đồng"
        actionLabel="Thêm hợp đồng"
        onEdit={() => onEdit("contracts")}
      >
        <div className={styles.table}>
          {employee.contracts.map((contract) => (
            <div key={contract.contractNo} className={styles.tableRow}>
              <strong>{contract.contractNo}</strong>
              <span>{contract.contractType}</span>
              <span>{contract.isCurrent ? "Hiện hành" : contract.endDate}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  }

  if (tab === "account") {
    return (
      <div className={styles.sectionGrid}>
        <SectionCard
          icon={<ShieldCheck size={18} />}
          title="Tài khoản"
          actionLabel="Quản lý tài khoản"
          onEdit={() => onEdit("account")}
        >
          <InfoList
            items={[
              ["Tên đăng nhập", employee.account.userName],
              ["Email", employee.account.email],
              ["Số điện thoại", employee.account.phoneNumber],
              ["Trạng thái", employee.account.isActive ? "Đang hoạt động" : "Đã khóa"],
            ]}
          />
        </SectionCard>
        <SectionCard
          icon={<KeyRound size={18} />}
          title="Role & quyền"
          actionLabel="Quản lý quyền"
          onEdit={() => onEdit("account")}
        >
          <div className={styles.permissionLayout}>
            <div>
              <span className={styles.subTitle}>Roles</span>
              {renderTags(employee.account.roles)}
            </div>
            <div>
              <span className={styles.subTitle}>Quyền thao tác</span>
              <div className={styles.tagList}>
                {employee.account.permissions.map((permission) => (
                  <span key={permission} className={styles.tagMuted}>
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    );
  }

  if (tab === "payroll") {
    return (
      <div className={styles.sectionGrid}>
        <SectionCard
          icon={<Landmark size={18} />}
          title="Tài khoản ngân hàng"
          actionLabel="Cập nhật"
          onEdit={() => onEdit("payroll")}
        >
          {employee.bankAccounts.map((bankAccount) => (
            <InfoList key={bankAccount.accountNumber} items={getBankInfo(bankAccount)} />
          ))}
        </SectionCard>
        <SectionCard
          icon={<Banknote size={18} />}
          title="Bảo hiểm & thuế"
          actionLabel="Cập nhật"
          onEdit={() => onEdit("payroll")}
        >
          <InfoList items={insuranceInfo} />
        </SectionCard>
      </div>
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
          {employee.documents.map((document) => (
            <div key={`${document.documentType}-${document.name}`} className={styles.tableRow}>
              <strong>{document.documentType}</strong>
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
        {employee.history.map((item) => (
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
