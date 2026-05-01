import {
  createMockEmployeeProfile,
  EmployeeDetailScreen,
  findEmployeeById,
} from "@/modules/employees";

type EmployeeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  const { id } = await params;
  const employee = findEmployeeById(id) ?? createMockEmployeeProfile(id);

  return <EmployeeDetailScreen breadcrumbSegment={id} employee={employee} />;
}
