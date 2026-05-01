"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu } from "lucide-react";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./AppShell.module.css";

import {
  BreadcrumbProvider,
  useBreadcrumbLabels,
} from "./BreadcrumbContext";


type AppShellProps = {
  children: React.ReactNode;
};

const routeLabels: Record<string, string> = {
  attendance: "Chấm công",
  employees: "Nhân viên",
  lab: "Lab",
  leave: "Nghỉ phép",
  reports: "Báo cáo",
};

function formatSegmentLabel(
  segment: string,
  breadcrumbLabels: Record<string, string>,
) {
  return (
    breadcrumbLabels[segment] ??
    routeLabels[segment] ??
    decodeURIComponent(segment)
      .replaceAll("-", " ")
      .replace(/\b\w/g, (character) => character.toUpperCase())
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <BreadcrumbProvider>
      <AppShellContent>{children}</AppShellContent>
    </BreadcrumbProvider>
  );
}

function AppShellContent({ children }: AppShellProps) {
  const breadcrumbLabels = useBreadcrumbLabels();

  const pathname = usePathname();
  const [isPinnedOpen, setIsPinnedOpen] = React.useState(true);
  const [isPeekOpen, setIsPeekOpen] = React.useState(false);  

  const isSidebarVisible = isPinnedOpen || isPeekOpen;
  const sidebarMode = isPinnedOpen ? "pinned" : "peek";
  const breadcrumbSegments = pathname.split("/").filter(Boolean);

  function openPeekSidebar(){
    if (!isPinnedOpen) {
      setIsPeekOpen(true);
    }
  }

  function closePeekSidebar(){
    if (!isPinnedOpen) {
      setIsPeekOpen(false);
    }
  }

  function closeSidebar(){
    setIsPinnedOpen(false);
    setIsPeekOpen(false);
  }

  function openPinnedSidebar(){
    setIsPinnedOpen(true);
    setIsPeekOpen(false);
  }

  React.useEffect(() => {
    function closePeekWhenPageIsInactive() {
      setIsPeekOpen(false);
    }

    window.addEventListener("blur", closePeekWhenPageIsInactive);
    document.addEventListener("visibilitychange", closePeekWhenPageIsInactive);

    return () => {
      window.removeEventListener("blur", closePeekWhenPageIsInactive);
      document.removeEventListener("visibilitychange", closePeekWhenPageIsInactive);
    };
  }, []);


 return (
    <div
      className={styles.shell}
      data-sidebar-pinned={isPinnedOpen}
      data-sidebar-visible={isSidebarVisible}
    >
      {!isPinnedOpen ? (
        <button
          type="button"
          className={styles.edgeHotspot}
          aria-label="Mở tạm thanh điều hướng"
          onMouseEnter={openPeekSidebar}
          onFocus={openPeekSidebar}
        />
      ) : null}

      <Sidebar
        isOpen={isSidebarVisible}
        mode={sidebarMode}
        onClose={closeSidebar}
        onPin={openPinnedSidebar}
        onMouseLeave={closePeekSidebar}
      />

      <main className={styles.main}>
        <header className={styles.topbar}>
          {!isPinnedOpen ? (
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Mở thanh điều hướng"
              onClick={openPinnedSidebar}
            >
              <Menu size={22} />
            </button>
          ) : null}

          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.homeCrumb} aria-label="Trang chủ">
              <Home size={17} />
            </Link>

            <ol className={styles.crumbList}>
              <li>
                <Link href="/">Trang chủ</Link>
              </li>

              {breadcrumbSegments.map((segment, index) => {
                const href = `/${breadcrumbSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === breadcrumbSegments.length - 1;

                return (
                  <li key={href} aria-current={isLast ? "page" : undefined}>
                    <span className={styles.crumbSeparator}>/</span>
                    {isLast ? (
                      <span>{formatSegmentLabel(segment, breadcrumbLabels)}</span>
                    ) : (
                      <Link href={href}>{formatSegmentLabel(segment, breadcrumbLabels)}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </header>

        <div className={styles.body}>{children}</div>
      </main>
    </div>
  );
}
