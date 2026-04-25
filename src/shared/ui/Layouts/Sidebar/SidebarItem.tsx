import Link from "next/link";
import styles from "./Sidebar.module.css";

type SidebarLink = {
  key: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type SidebarItemProps = {
  item: SidebarLink;
  isActive: boolean;
};

export function SidebarItem({ item, isActive }: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
    >
      {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
      <span className={styles.label}>{item.label}</span>
    </Link>
  );
}
