"use client";

import { usePathname } from "next/navigation";
import {
  CalendarDays,
  FileText,
  LayoutGrid,
  PlaneTakeoff,
  Users,
} from "lucide-react";

import { SidebarItem } from "./SidebarItem";
import styles from "./Sidebar.module.css";


type SidebarLink = {
  key: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
};


const sidebarLinks: SidebarLink[] = [
  {
    key: "dashboard",
    label: "Tong quan",
    href: "/dashboard",
    icon: <LayoutGrid size={18} />,
  },
  {
    key: "employees",
    label: "Nhan vien",
    href: "/employees",
    icon: <Users size={18} />,
  },
  {
    key: "attendance",
    label: "Cham cong",
    href: "/attendance",
    icon: <CalendarDays size={18} />,
  },
  {
    key: "leave",
    label: "Nghi phep",
    href: "/leave",
    icon: <PlaneTakeoff size={18} />,
  },
  {
    key: "reports",
    label: "Bao cao",
    href: "/reports",
    icon: <FileText size={18} />,
  },
];


export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>H</div>

        <div className={styles.brandText}>
          <strong>HRM</strong>
          <span>Quan ly nhan su</span>
        </div>
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
    </aside>
  );
}
