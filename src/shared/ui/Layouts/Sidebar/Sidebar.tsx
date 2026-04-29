"use client";

import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  PlaneTakeoff,
  Search,
  Users,
} from "lucide-react";

import { SidebarItem } from "./SidebarItem";
import styles from "./Sidebar.module.css";
import { useLogout } from "@/modules/auth/presentation/hooks/useLogout";

type SidebarLink = {
  key: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type SidebarProps = {
  isOpen: boolean;
  mode: "pinned" | "peek";
  onClose: () => void;
  onPin: () => void;
  onMouseLeave?: () => void;
};

const sidebarLinks: SidebarLink[] = [
  {
    key: "home",
    label: "Trang chủ",
    href: "/",
    icon: <Home size={18} />,
  },
  {
    key: "employees",
    label: "Nhân viên",
    href: "/employees",
    icon: <Users size={18} />,
  },
  {
    key: "attendance",
    label: "Chấm công",
    href: "/attendance",
    icon: <CalendarDays size={18} />,
  },
  {
    key: "leave",
    label: "Nghỉ phép",
    href: "/leave",
    icon: <PlaneTakeoff size={18} />,
  },
  {
    key: "reports",
    label: "Báo cáo",
    href: "/reports",
    icon: <FileText size={18} />,
  },
];

export function Sidebar({ 
  isOpen, 
  mode, 
  onClose,
  onPin, 
  onMouseLeave 
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={styles.sidebar}
      data-open={isOpen}
      data-mode={mode}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.brand}>
        <div className={styles.brandMark}>H</div>

        <div className={styles.brandText}>
          <strong>HRM</strong>
          <span>Quản lý nhân sự</span>
        </div>

        <button
          type="button"
          className={styles.collapseButton}
          aria-label={mode === "peek" ? "Ghim thanh bên" : "Đóng thanh bên"}
          title={mode === "peek" ? "Ghim thanh bên" : "Đóng thanh bên"}
          onClick={mode === "peek" ? onPin : onClose}
        >
          {mode === "peek" ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>

      </div>

      <div className={styles.quickActions}>
        <button type="button" className={styles.homeButton}>
          <Home size={18} />
          <span>Trang chủ</span>
        </button>

        <button type="button" className={styles.iconButton} aria-label="Tìm kiếm">
          <Search size={18} />
        </button>
      </div>

      <nav className={styles.nav}>
        {sidebarLinks.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      <LogoutButton />
    </aside>
  );
}


export function LogoutButton() {
  const { logout } = useLogout();

  return (
    <button type="button" className={styles.logoutButton} onClick={logout}>
      Đăng xuất
    </button>
  );
}
