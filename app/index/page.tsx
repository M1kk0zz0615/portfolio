"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";

/* ============================================
   目录条目
   ============================================ */

interface IndexEntry {
  num: string;
  title: string;
  href: string;
  desc: string[];
}

const ENTRIES: IndexEntry[] = [
  {
    num: "01",
    title: "PHOTOGRAPHY",
    href: "/photography/film",
    desc: ["Creative · Street Photography", "Film Photography", "Landscape Studies"],
  },
  {
    num: "02",
    title: "FILM",
    href: "/video/work",
    desc: ["Video Projects", "Experimental Shorts"],
  },
  {
    num: "03",
    title: "PROJECTS",
    href: "https://github.com/M1kk0zz0615/portfolio",
    desc: ["GitHub Repositories", "Code · Tools · Experiments"],
  },
  {
    num: "04",
    title: "ABOUT",
    href: "/about",
    desc: ["刘俊宁", "Computer Science · Photography · Video"],
  },
];

function IndexItem({ item, delay }: { item: IndexEntry; delay: string }) {
  const isExternal = item.href.startsWith("http");

  const inner = (
    <>
      {/* 数字 */}
      <span
        className="type-display text-[#D10000] shrink-0 leading-none select-none"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 8rem)",
          lineHeight: 0.85,
        }}
      >
        {item.num}
      </span>

      {/* 标题 + 描述 */}
      <div className="flex flex-col gap-1">
        <span
          className="type-display text-[var(--fg)] group-hover:text-[#D10000] transition-colors duration-200"
          style={{
            fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
            lineHeight: 1.1,
          }}
        >
          {item.title}
        </span>
        <span className="hidden sm:flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.desc.map((line, i) => (
            <span
              key={i}
              className="type-label text-[var(--fg)]/35"
              style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
            >
              {line}
            </span>
          ))}
        </span>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`anim-y-60 ${delay} group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 no-underline py-6 border-b-[1px] border-[var(--fg)]/06 hover:border-[#D10000]/20 transition-colors duration-300`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={`anim-y-60 ${delay} group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 no-underline py-6 border-b-[1px] border-[var(--fg)]/06 hover:border-[#D10000]/20 transition-colors duration-300`}
    >
      {inner}
    </Link>
  );
}

/* ============================================
   主页面
   ============================================ */

export default function IndexPage() {
  const ref = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <main
      ref={ref}
      className="bg-paper text-[var(--fg)] min-h-screen relative"
    >
      {/* ====== 顶部导航 ====== */}
      <div className="fixed left-6 top-6 z-50">
        <Link
          href="/"
          className="type-label text-[var(--paper-cream)] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--fg)] transition-colors duration-200"
          style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
        >
          <span
            className="inline-block bg-[var(--paper-cream)]"
            style={{ width: "12px", height: "1.5px" }}
          />
          ← 返回
        </Link>
      </div>

      {/* ====== 主内容 ====== */}
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:px-12 md:pt-36 md:pb-24">
        {/* 页眉：INDEX */}
        <div className="anim-y-60 mb-16 md:mb-24 flex items-center gap-3">
          <span
            className="type-cyrillic text-[var(--fg)]/20"
            style={{ fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)" }}
          >
            CONTENTS
          </span>
          <span
            className="bg-[var(--fg)]/10"
            style={{ width: "clamp(40px, 8vw, 100px)", height: "1px" }}
          />
        </div>

        {/* 目录条目 */}
        <nav className="flex flex-col">
          {ENTRIES.map((item, i) => (
            <IndexItem key={item.num} item={item} delay={`d-${i + 1}`} />
          ))}
        </nav>

        {/* ====== 页脚 ====== */}
        <div className="anim-y-60 d-5 mt-20 md:mt-28 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span
              className="type-cyrillic text-[var(--fg)]/25"
              style={{ fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)" }}
            >
              LIU JUNNING
            </span>
            <span
              className="type-label text-[var(--fg)]/20 leading-relaxed"
              style={{ fontSize: "clamp(0.6rem, 0.7vw, 0.68rem)" }}
            >
              ARCHIVE OF IMAGES,
              <br />
              SYSTEMS AND STORIES
            </span>
          </div>
          <span
            className="type-label text-[var(--fg)]/15"
            style={{ fontSize: "clamp(0.6rem, 0.7vw, 0.68rem)" }}
          >
            2026
          </span>
        </div>

        {/* 页尾几何标记 */}
        <div className="mt-16 flex items-center gap-3">
          <div
            className="anim-scale bg-[var(--fg)]/20"
            style={{ width: "24px", height: "2px" }}
          />
          <div
            className="anim-scale bg-[#D10000]"
            style={{ width: "6px", height: "6px" }}
          />
        </div>
      </div>
      <ScrollArrow />
    </main>
  );
}
