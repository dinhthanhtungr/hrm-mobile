import { AppShell } from "@/shared/ui/Layouts/AppShell/AppShell";

export default function ProtectedAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}
