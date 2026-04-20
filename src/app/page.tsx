"use client";

import { useMemo, useState } from "react";
import { getCurrentPosition } from "@/lib/device";

type AttendanceState = "ready" | "locating" | "done" | "error";

export default function Home() {
  const [state, setState] = useState<AttendanceState>("ready");
  const [message, setMessage] = useState("San sang cham cong ca lam hom nay.");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date()),
    [],
  );

  async function handleCheckIn() {
    setState("locating");
    setMessage("Dang lay vi tri hien tai...");

    try {
      const position = await getCurrentPosition();
      const nextCoords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setCoords(nextCoords);
      setState("done");
      setMessage("Da lay vi tri. Buoc tiep theo la goi API cham cong cua ban.");
    } catch {
      setState("error");
      setMessage("Khong lay duoc vi tri. Hay kiem tra quyen Location tren thiet bi.");
    }
  }

  return (
    <main className="min-h-dvh bg-[#f7f8f3] text-[#151713]">
      <section className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-6 pt-4">
        <header className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-[#5c6658]">VAE HRM</p>
            <h1 className="text-2xl font-semibold tracking-normal">Cham cong</h1>
          </div>
          <div className="grid size-11 place-items-center rounded-lg bg-[#d9ebe0] text-sm font-bold text-[#173b2c]">
            HR
          </div>
        </header>

        <section className="mt-4 rounded-lg border border-[#d8ded1] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#5c6658]">{today}</p>
          <div className="mt-5 aspect-[4/3] rounded-lg bg-[linear-gradient(135deg,#d9ebe0_0%,#f8f0c8_48%,#ffd6db_100%)] p-4">
            <div className="flex h-full flex-col justify-between rounded-lg border border-white/70 bg-white/60 p-4">
              <span className="w-fit rounded-md bg-[#173b2c] px-3 py-1 text-xs font-semibold text-white">
                Morning shift
              </span>
              <div>
                <p className="text-4xl font-semibold">08:00</p>
                <p className="mt-1 text-sm text-[#5c6658]">Ca lam mac dinh</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-lg border border-[#d8ded1] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-normal text-[#5c6658]">
            Trang thai
          </p>
          <p className="mt-2 text-lg font-semibold">{message}</p>

          {coords ? (
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-[#eef6f1] p-3">
                <dt className="text-[#5c6658]">Latitude</dt>
                <dd className="mt-1 font-semibold">{coords.lat.toFixed(6)}</dd>
              </div>
              <div className="rounded-md bg-[#fff6d8] p-3">
                <dt className="text-[#5c6658]">Longitude</dt>
                <dd className="mt-1 font-semibold">{coords.lng.toFixed(6)}</dd>
              </div>
            </dl>
          ) : null}
        </section>

        <div className="mt-auto pt-5">
          <button
            className="h-14 w-full rounded-lg bg-[#173b2c] px-5 text-base font-semibold text-white transition hover:bg-[#23543f] disabled:cursor-not-allowed disabled:bg-[#87968c]"
            disabled={state === "locating"}
            onClick={handleCheckIn}
            type="button"
          >
            {state === "locating" ? "Dang xu ly..." : "Cham cong ngay"}
          </button>
          <p className="mt-3 text-center text-xs text-[#5c6658]">
            Location se duoc gui ve ASP.NET Core API khi ban noi endpoint.
          </p>
        </div>
      </section>
    </main>
  );
}
