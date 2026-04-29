import Link from "next/link";

export default function AppNotFoundPage() {
  return (
    <section style={{ maxWidth: 560 }}>
      <p style={{ marginBottom: 8, color: "#64748b", fontWeight: 600 }}>
        404
      </p>

      <h1 style={{ marginBottom: 12, fontSize: 32, fontWeight: 700 }}>
        Không tìm thấy trang
      </h1>

      <p style={{ marginBottom: 24, color: "#475569", lineHeight: 1.6 }}>
        Trang bạn đang mở chưa tồn tại hoặc đã được di chuyển.
      </p>

      <Link
        href="/"
        style={{
          minHeight: 40,
          padding: "0 14px",
          borderRadius: 8,
          display: "inline-flex",
          alignItems: "center",
          background: "#e8f2ff",
          color: "#0f3768",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Về trang chủ
      </Link>
    </section>
  );
}
