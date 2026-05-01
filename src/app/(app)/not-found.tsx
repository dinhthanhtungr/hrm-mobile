import Link from "next/link";

export default function AppNotFound() {
  return (
    <main>
      <p>404</p>
      <h1>Không tìm thấy trang</h1>
      <p>Trang bạn đang mở chưa tồn tại hoặc đã được di chuyển.</p>
      <Link href="/">Về trang chủ</Link>
    </main>
  );
}
