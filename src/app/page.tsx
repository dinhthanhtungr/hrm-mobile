import Link from "next/link";
import { routes } from "@/core/config/routes";
import { Sidebar } from "@/shared/ui/Layouts/Sidebar/Sidebar";

export default function HomePage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ padding: 24 }}>Noi dung test</main>
    </div>
  );
}
