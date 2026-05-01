"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useBreadcrumbLabel } from "@/shared/ui/Layouts/AppShell/BreadcrumbContext";
import type { EmployeeProfile } from "../../domain/entities/EmployeeProfile";
import { EmployeeEditDrawer } from "../components/EmployeeEditDrawer";
import { EmployeeProfileHeader } from "../components/EmployeeProfileHeader";
import { EmployeeProfileTabs } from "../components/EmployeeProfileTabs";
import { EmployeeTabContent } from "../components/EmployeeTabContent";
import {
  type EmployeeDetailDrawerKey,
  type EmployeeDetailTabKey,
} from "../components/employee-detail.types";
import styles from "./EmployeeDetailScreen.module.css";

type EmployeeDetailScreenProps = {
  breadcrumbSegment: string;
  employee: EmployeeProfile;
};

export function EmployeeDetailScreen({
  breadcrumbSegment,
  employee,
}: EmployeeDetailScreenProps) {
  useBreadcrumbLabel(breadcrumbSegment, employee.name);

  const [activeTab, setActiveTab] =
    React.useState<EmployeeDetailTabKey>("overview");
  const [activeDrawer, setActiveDrawer] =
    React.useState<EmployeeDetailDrawerKey | null>(null);

  return (
    <div className={styles.page}>
      <Link href="/employees" className={styles.backLink}>
        <ArrowLeft size={16} />
        Quay lại danh sách
      </Link>

      <EmployeeProfileHeader employee={employee} />

      <EmployeeProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className={styles.tabPanel}>
        <EmployeeTabContent
          employee={employee}
          onEdit={setActiveDrawer}
          tab={activeTab}
        />
      </div>

      {activeDrawer ? (
        <EmployeeEditDrawer
          employee={employee}
          onClose={() => setActiveDrawer(null)}
          section={activeDrawer}
        />
      ) : null}
    </div>
  );
}
