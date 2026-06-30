"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";
import { ArchiveContent } from "@/components/ArchiveContent";

/* 跳转首页海报前打上标记，让海报显示返回按钮 */
function useJumpToPoster() {
  const router = useRouter();
  return (to: string) => {
    sessionStorage.setItem("from-archive", "1");
    router.push(`/?to=${to}`);
  };
}

/* ────────── archive 页面（兼容保留）────────── */
export default function ArchivePage() {
  const ref = useScrollReveal<HTMLDivElement>(0.1);
  const jumpToPoster = useJumpToPoster();

  return (
    <main className="bg-paper text-[var(--fg)] min-h-screen" ref={ref}>
      {/* ====== 顶部导航 ====== */}
      <div className="anim-y-60 fixed left-6 top-6 z-50">
        <Link
          href="/"
          className="type-label text-[#F5EDE0] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] transition-colors duration-200"
          style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
        >
          <span className="inline-block bg-[#F5EDE0]" style={{ width: "12px", height: "1.5px" }} />
          ← 返回
        </Link>
      </div>

      <ArchiveContent
        className="bg-paper text-[var(--fg)]"
        onNavigate={jumpToPoster}
      />

      <ScrollArrow />
    </main>
  );
}
