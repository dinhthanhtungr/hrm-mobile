import Link from "next/link";
import { routes } from "@/core/config/routes";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#f7f8f3] text-[#151713]">
      <section className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-8">
        <p className="text-sm font-medium text-[#5c6658]">VAE HRM</p>
        <h1 className="mt-2 text-3xl font-semibold">Trang chu dang duoc chuan bi.</h1>
        <p className="mt-3 text-sm leading-6 text-[#5c6658]">
          Phan cham cong da duoc go ra khoi project de lam lai sau. Ban co the vao man
          dang nhap de tiep tuc ket noi backend.
        </p>
        <Link
          className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-[#173b2c] px-5 text-sm font-semibold text-white transition hover:bg-[#23543f]"
          href={routes.login}
        >
          Mo man dang nhap
        </Link>
      </section>
    </main>
  );
}
