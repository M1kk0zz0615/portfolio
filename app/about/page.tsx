"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";

/* ============================================
   排版组件
   ============================================ */

/** 章节分割线 */
function SectionDivider({ delay }: { delay?: string }) {
  return (
    <div className={`anim-line-x ${delay || ""} w-full h-[1px] bg-[var(--fg)]/10 my-8 md:my-12`} />
  );
}

/** 章节标题 */
function SectionTitle({
  en,
  zh,
  delay,
}: {
  en: string;
  zh: string;
  delay?: string;
}) {
  return (
    <div className={`anim-y-60 ${delay || ""} flex items-baseline gap-3 mb-5`}>
      <span
        className="type-cyrillic text-[var(--fg)]/25"
        style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
      >
        {en}
      </span>
      <h2
        className="type-display text-[var(--fg)]"
        style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
      >
        {zh}
      </h2>
    </div>
  );
}

/* ============================================
   主页面
   ============================================ */

export default function AboutPage() {
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

      {/* ====== 主内容区 ====== */}
      <div
        className="mx-auto max-w-2xl px-6 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32"
      >
        {/* --- 姓名 + 身份 + 头像 --- */}
        <div className="mb-12 md:mb-16 flex items-start gap-8">
          <div className="flex-1">
            <h1
              className="anim-y-60 type-display text-[var(--fg)] mb-5"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              刘俊宁
            </h1>
            <p
              className="anim-y-60 d-1 type-label text-[var(--fg)]/50"
              style={{ fontSize: "clamp(1.1rem, 1.35vw, 1.2rem)" }}
            >
              计算机科学学生&ensp;/&ensp;摄影师&ensp;/&ensp;影像创作者
            </p>
          </div>
          {/* 头像 — 构成主义裁切 */}
          <div className="anim-scale d-2 relative shrink-0" style={{ width: "clamp(100px, 18vw, 160px)" }}>
            <div
              className="absolute bg-[#D10000]"
              style={{
                left: "-6%",
                top: "-4%",
                right: "4%",
                bottom: "6%",
                clipPath: "polygon(3% 0, 100% 2%, 98% 100%, 0 98%)",
                opacity: 0.6,
                zIndex: 0,
              }}
            />
            <img
              src="/avatar/1.jpg"
              alt="刘俊宁"
              className="anim-scale d-3 relative z-10 w-full h-auto"
              style={{
                clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)",
                filter: "grayscale(0.3) contrast(1.05)",
              }}
            />
          </div>
        </div>

        {/* --- 个人介绍 --- */}
        <section>
          <p
            className="anim-y-60 d-2 text-[var(--fg)]/75 leading-relaxed max-w-xl"
            style={{ fontSize: "clamp(1.15rem, 1.45vw, 1.3rem)" }}
          >
            目前就读于广东工业大学计算机科学与技术专业。
          </p>
          <p
            className="anim-y-60 d-2 text-[var(--fg)]/75 leading-relaxed max-w-xl mt-5"
            style={{ fontSize: "clamp(1.15rem, 1.45vw, 1.3rem)" }}
          >
            我的创作围绕摄影、影像与数字媒介展开。我对技术、视觉叙事与设计之间的关系保持兴趣。
          </p>
          <p
            className="anim-y-60 d-3 text-[var(--fg)]/75 leading-relaxed max-w-xl mt-5"
            style={{ fontSize: "clamp(1.15rem, 1.45vw, 1.3rem)" }}
          >
            通过摄影、视频创作与软件开发，我尝试记录人与环境、日常与时间，并探索影像与系统如何共同塑造我们理解世界的方式。
          </p>
        </section>

        <SectionDivider delay="d-1" />

        {/* --- 经历 --- */}
        <section>
          <SectionTitle en="EXPERIENCE" zh="经历" />

          <div className="anim-y-60 d-2 space-y-4">
            {/* 时间标记 */}
            <div className="flex items-center gap-3">
              <span
                className="bg-[#D10000] shrink-0"
                style={{ width: "6px", height: "6px" }}
              />
              <span
                className="type-label text-[var(--fg)]/40"
                style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
              >
                2024 — 至今
              </span>
            </div>

            {/* 内容 */}
            <div className="ml-[18px] pl-5 border-l-[1px] border-[var(--fg)]/10">
              <h3
                className="type-display text-[var(--fg)]"
                style={{
                  fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                  lineHeight: 1.3,
                }}
              >
                广东工业大学计算机学院
                <br />
                融媒体工作室 · 部长
              </h3>
              <p
                className="text-[var(--fg)]/55 leading-relaxed mt-4 max-w-lg"
                style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.35rem)" }}
              >
                负责摄影摄像、视频制作、视觉传播及新媒体内容创作。参与学院宣传片、活动纪录片、年度总结视频及视觉内容制作。
              </p>
            </div>
          </div>
        </section>

        <SectionDivider delay="d-2" />

        {/* --- 技能 --- */}
        <section>
          <SectionTitle en="SKILLS" zh="技能" />

          <div className="grid grid-cols-2 gap-12 md:gap-20">
            {/* 编程 */}
            <div className="anim-y-60 d-2">
              <h4
                className="type-cyrillic text-[var(--fg)]/20 mb-5"
                style={{ fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)" }}
              >
                CODE
              </h4>
              <ul
                className="space-y-2 text-[var(--fg)]/70"
                style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
              >
                <li>C</li>
                <li>Java</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>Git</li>
              </ul>
            </div>

            {/* 创作 */}
            <div className="anim-y-60 d-3">
              <h4
                className="type-cyrillic text-[var(--fg)]/20 mb-5"
                style={{ fontSize: "clamp(0.6rem, 0.75vw, 0.7rem)" }}
              >
                CREATE
              </h4>
              <ul
                className="space-y-2 text-[var(--fg)]/70"
                style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
              >
                <li>Photography</li>
                <li>Lightroom</li>
                <li>Photoshop</li>
                <li>Premiere Pro</li>
                <li>剪映</li>
              </ul>
            </div>
          </div>
        </section>

        <SectionDivider delay="d-3" />

        {/* --- 创作工具 --- */}
        <section>
          <SectionTitle en="TOOLS" zh="创作工具" />

          <div className="space-y-10">
            {/* 数字摄影 */}
            <div className="anim-y-60 d-2">
              <span
                className="type-label text-[var(--fg)]/35 mb-3 block"
                style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
              >
                数字摄影
              </span>
              <p
                className="text-[var(--fg)]/70"
                style={{ fontSize: "clamp(1.1rem, 1.35vw, 1.2rem)" }}
              >
                Sony A6400
              </p>
            </div>

            {/* 胶片摄影 */}
            <div className="anim-y-60 d-3">
              <span
                className="type-label text-[var(--fg)]/35 mb-3 block"
                style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
              >
                胶片摄影
              </span>
              <div
                className="text-[var(--fg)]/70 space-y-1"
                style={{ fontSize: "clamp(1.1rem, 1.35vw, 1.2rem)" }}
              >
                <p>Contax 139Q</p>
                <p>Rollei 35T</p>
                <p>Balda CE35A</p>
              </div>
            </div>
          </div>

          {/* 引语 */}
          <p
            className="anim-y-60 d-4 type-label text-[var(--fg)]/30 mt-10 italic"
            style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)" }}
          >
            不同的媒介，对应不同的观看方式。
          </p>
        </section>

        <SectionDivider delay="d-4" />

        {/* --- 联系方式 --- */}
        <section>
          <SectionTitle en="CONTACT" zh="联系方式" />

          <div
            className="anim-y-60 d-2 space-y-4"
            style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
          >
            <p>
              <span className="type-label text-[var(--fg)]/30 mr-4">Email</span>
              <a
                href="mailto:934331621@qq.com"
                className="text-[var(--fg)]/70 hover:text-[#D10000] no-underline transition-colors duration-200"
              >
                934331621@qq.com
              </a>
            </p>
            <p>
              <span className="type-label text-[var(--fg)]/30 mr-4">GitHub</span>
              <span className="text-[var(--fg)]/35">暂定</span>
            </p>
            <p>
              <span className="type-label text-[var(--fg)]/30 mr-4">Bilibili</span>
              <a
                href="https://space.bilibili.com/39276639"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg)]/70 hover:text-[#D10000] no-underline transition-colors duration-200"
              >
                space.bilibili.com/39276639
              </a>
            </p>
          </div>
        </section>

        {/* --- 页尾几何标记 --- */}
        <div className="mt-12 flex items-center gap-3">
          <div
            className="anim-scale d-4 bg-[var(--fg)]"
            style={{ width: "24px", height: "2px" }}
          />
          <div
            className="anim-scale d-5 bg-[#D10000]"
            style={{ width: "6px", height: "6px" }}
          />
        </div>
      </div>
      <ScrollArrow />
    </main>
  );
}
