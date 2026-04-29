import { notFound } from "next/navigation";
import {
  EmployeeDetailScreen,
  employees,
  findEmployeeById,
} from "@/modules/employees";

type EmployeeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return employees.map((employee) => ({
    id: employee.id,
  }));
}

export default async function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  const { id } = await params;
  const employee = findEmployeeById(id);

  if (!employee) {
    notFound();
  }

  return <EmployeeDetailScreen employee={employee} />;
}
