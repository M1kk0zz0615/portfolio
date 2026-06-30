"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { Lightbox } from "@/components/Lightbox";
import { buildLogProjects } from "@/data/buildLogProjects";

interface ArchiveContentProps {
  className?: string;
  /** 点击跳转按钮时回调（Build Log / 照片档案 / 影像档案） */
  onNavigate?: (target: string) => void;
}

/* ────────── 区段标记 ────────── */
function SectionMark({ label }: { label: string }) {
  return (
    <div className="anim-y-60 flex items-center gap-3 mb-6">
      <span
        className="bg-[#D10000]"
        style={{ width: "clamp(24px, 3vw, 40px)", height: "4px" }}
      />
      <span
        className="text-[#D10000] uppercase"
        style={{
          fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)",
          fontFamily: "var(--font-tasa-explorer), var(--font-geist-mono), sans-serif",
          fontWeight: 700,
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ────────── 项目索引卡片（仅名称 + 一句定位）────────── */
function ProjectIndexCard({
  title,
  desc,
  delay,
}: {
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className={`anim-y-60 ${delay} relative border-l-[3px] border-[#D10000]/30 pl-5 py-2`}
    >
      <h3
        className="type-display text-[var(--fg)]"
        style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)", lineHeight: 1.2 }}
      >
        {title}
      </h3>
      <p
        className="mt-1 text-[var(--fg)] leading-relaxed"
        style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ────────── Archive 内容主体 ────────── */
export function ArchiveContent({ className, onNavigate }: ArchiveContentProps) {
  const ref = useScrollReveal<HTMLDivElement>(0.1);
  const [avatarLightbox, setAvatarLightbox] = useState<{ src: string; rect: DOMRect } | null>(null);

  return (
    <div ref={ref} className={className}>
      {/* ═══════════════════════════════════════════
          ① 档案信息（封面）
          ═══════════════════════════════════════════ */}
      <div className="relative px-6 pt-16 pb-4 md:px-12 md:pt-16 md:pb-6">
        {/* 左侧大字 — 氛围文本 */}
        <div
          className="anim-y-60 d-1 absolute right-0 top-[clamp(1.2rem,4.5vw,3.5rem)] z-0"
          style={{
            fontSize: "clamp(3.4rem, 7.5vw, 7.5rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: "-0.03em",
            opacity: 0.2,
            color: "var(--fg)",
            maxWidth: "55vw",
          }}
        >
          当我们谈论迷蔻紫，<br />我们在谈论什么？
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-16">
          {/* 左侧：名字 */}
          <div>
            <h1
              className="anim-y-60 d-2 inline-block -mt-8 mb-5"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
                fontFamily: "var(--font-noto-sc), 'PingFang SC', 'Microsoft YaHei', 'Heiti SC', sans-serif",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.03em",
              }}
            >
              刘俊宁
            </h1>
            <p
              className="anim-y-60 d-2 text-[var(--fg)] leading-relaxed"
              style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
            >
              Mikkozz（迷蔻紫）
            </p>
            <p
              className="anim-y-60 d-3 text-[var(--fg)] leading-relaxed mt-2"
              style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
            >
              计算机学生 / 摄影师 / 影像创作者
            </p>
            <p
              className="anim-y-60 d-3 text-[var(--fg)] leading-relaxed mt-1"
              style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
            >
              广东工业大学 · 计算机科学与技术 · 本科大二 · 2024—至今
            </p>
          </div>

          {/* 右侧：头像 */}
          <div className="anim-scale d-3 shrink-0" style={{ width: "clamp(120px, 22vw, 200px)" }}>
            <div
              className="relative cursor-pointer rotate-[-2deg] hover:rotate-0 hover:scale-120 transition-transform duration-300"
              style={{ transitionTimingFunction: "cubic-bezier(0.2,0,0,1)" }}
              onClick={(e) => {
                const el = e.currentTarget;
                setAvatarLightbox({ src: "/avatar/2.jpg", rect: el.getBoundingClientRect() });
              }}
            >
              {/* 红色不规则底块 */}
              <div
                className="absolute bg-[#D10000]"
                style={{
                  left: "3%",
                  top: "4%",
                  right: "-10%",
                  bottom: "-6%",
                  clipPath: "polygon(0 5%, 96% 0, 100% 95%, 5% 100%, 0 55%)",
                  opacity: 0.55,
                  zIndex: 0,
                }}
              />
              <Image
                src="/avatar/1.jpg"
                alt="刘俊宁"
                width={200}
                height={200}
                className="relative z-10 w-full h-auto"
                style={{
                  clipPath: "polygon(5% 0, 100% 4%, 100% 96%, 0 100%)",
                  filter: "grayscale(0) contrast(1) brightness(1)",
                }}
              />
            </div>
          </div>
        </div>

        {/* 底部红线 */}
        <div
          className="anim-line-x d-4 absolute right-0 h-[3px] bg-[#D10000] z-0"
          style={{ bottom: "0%", width: "clamp(120px, 25vw, 320px)" }}
        />
      </div>

      {/* ═══════════════════════════════════════════
          ② 技能
          ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        {/* 至上主义 — 细长红方块 + 远处黑点 */}
        <div
          className="anim-scale d-2 absolute bg-[#D10000] z-0"
          style={{ right: "25%", top: "24%", width: "48px", height: "4px", transform: "rotate(-4deg)" }}
        />
        <div
          className="anim-scale d-3 absolute bg-[var(--fg)]/60 z-0"
          style={{ right: "15%", top: "36%", width: "8px", height: "8px" }}
        />

        <SectionMark label="SKILLS" />
        <h2
          className="anim-y-60 d-1 type-display mb-6"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          技能
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { cat: "编程", items: ["Java", "C", "JavaScript"] },
            { cat: "Web", items: ["Next.js", "TypeScript"] },
            { cat: "创作", items: ["摄影", "视频剪辑", "Photoshop"] },
          ].map(({ cat, items }, i) => (
            <div key={cat} className={`anim-y-60 d-${i + 2}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#D10000]" style={{ width: "10px", height: "3px" }} />
                <span
                  className="text-[var(--fg)] leading-relaxed"
                  style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
                >
                  {cat}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="type-label text-[var(--fg)] border border-[var(--fg)]/08 px-2 py-1"
                    style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ═══════════════════════════════════════════
          ④ 项目档案（索引）
          ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        {/* 至上主义 — 黑方块 + 红线的引力场 */}
        <div
          className="anim-scale d-3 absolute bg-[var(--fg)] z-0"
          style={{ right: "22%", top: "35%", width: "22px", height: "22px" }}
        />
        <div
          className="anim-line-x d-2 absolute h-[3px] bg-[#D10000] z-0"
          style={{ right: "14%", top: "28%", width: "56px", transform: "rotate(-6deg)" }}
        />
        <div
          className="anim-scale d-4 geo-circle absolute bg-[#D10000]/60 z-0"
          style={{ right: "32%", top: "42%", width: "6px", height: "6px" }}
        />

        <SectionMark label="PROJECTS" />
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2
            className="anim-y-60 d-1 type-display"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            项目档案
          </h2>
          <div className="anim-y-60 d-1">
            <button
              onClick={() => onNavigate?.("build-log")}
              className="group inline-flex items-center gap-2 border-[3px] border-[#0D0D0D] bg-[#0D0D0D] px-5 py-2.5 font-mono text-xs tracking-widest text-[#F5EDE0] uppercase shadow-[3px_3px_0_0_#D10000] transition-all duration-200 hover:border-[#D10000] hover:bg-[#D10000] hover:shadow-[5px_5px_0_0_#0D0D0D]"
            >
              Build Log
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {buildLogProjects.map((project, i) => (
            <ProjectIndexCard
              key={project.id}
              title={project.title}
              desc={project.desc}
              delay={`d-${i + 2}`}
            />
          ))}
        </div>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ═══════════════════════════════════════════
          ⑤ 摄影档案
          ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        {/* 右侧装饰 */}
        <div className="anim-scale d-2 geo-circle absolute border-[2px] border-[#D10000]/30 z-0" style={{ right: "10%", top: "12%", width: "28px", height: "28px" }} />

        <SectionMark label="PHOTO ARCHIVE" />
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2
            className="anim-y-60 d-1 type-display"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            摄影档案
          </h2>
          <div className="anim-y-60 d-1">
            <button
              onClick={() => onNavigate?.("photography")}
              className="group inline-flex items-center gap-2 border-[3px] border-[#0D0D0D] bg-[#0D0D0D] px-5 py-2.5 font-mono text-xs tracking-widest text-[#F5EDE0] uppercase shadow-[3px_3px_0_0_#D10000] transition-all duration-200 hover:border-[#D10000] hover:bg-[#D10000] hover:shadow-[5px_5px_0_0_#0D0D0D]"
            >
              照片档案
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
            </button>
          </div>
        </div>
        <p
          className="anim-y-60 d-2 text-[var(--fg)] leading-relaxed"
          style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
        >
          摄影作品与长期影像记录。胶片与数码，纪实与创意。
        </p>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ═══════════════════════════════════════════
          ⑥ 影像档案
          ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        {/* 装饰 */}
        <div className="anim-scale d-3 geo-circle absolute bg-[#D10000] z-0" style={{ right: "18%", top: "14%", width: "8px", height: "8px" }} />
        <div className="anim-line-x d-2 absolute h-[3px] bg-[#D10000]/50 z-0" style={{ right: "6%", top: "28%", width: "50px" }} />

        <SectionMark label="FILM ARCHIVE" />
        <div className="flex items-center flex-wrap gap-4 mb-4">
          <h2
            className="anim-y-60 d-1 type-display"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            影像档案
          </h2>
          <div className="anim-y-60 d-1">
            <button
              onClick={() => onNavigate?.("video")}
              className="group inline-flex items-center gap-2 border-[3px] border-[#0D0D0D] bg-[#0D0D0D] px-5 py-2.5 font-mono text-xs tracking-widest text-[#F5EDE0] uppercase shadow-[3px_3px_0_0_#D10000] transition-all duration-200 hover:border-[#D10000] hover:bg-[#D10000] hover:shadow-[5px_5px_0_0_#0D0D0D]"
            >
              影像档案
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
            </button>
          </div>
        </div>
        <p
          className="anim-y-60 d-2 text-[var(--fg)] leading-relaxed"
          style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
        >
          纪录片、短片与影像实验。工作影像与个人创作。
        </p>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ═══════════════════════════════════════════
          ⑦ 校园记录
          ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        {/* 右侧装饰 */}
        <div className="anim-scale d-2 geo-circle absolute border-[2px] border-[#D10000]/30 z-0" style={{ right: "10%", top: "12%", width: "28px", height: "28px" }} />
        <div className="anim-line-x d-3 absolute h-[3px] bg-[#D10000]/50 z-0" style={{ right: "6%", top: "30%", width: "50px" }} />

        <SectionMark label="CAMPUS" />
        <h2
          className="anim-y-60 d-1 type-display mb-6"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          校园记录
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="anim-y-60 d-2 relative border-l-[3px] border-[#D10000]/30 pl-5">
            <h3
              className="type-display text-[#9B1B1B]"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.5rem)" }}
            >
              计算机学院融媒体工作室部长
            </h3>
            <p
              className="mt-2 text-[var(--fg)] leading-relaxed"
              style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
            >
              负责学院公众号影像内容制作与团队协作。
            </p>
          </div>
          <div className="anim-y-60 d-3 relative border-l-[3px] border-[var(--fg)]/20 pl-5">
            <h3
              className="type-display text-[#9B1B1B]"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.5rem)" }}
            >
              高中电视台组长
            </h3>
            <p
              className="mt-2 text-[var(--fg)] leading-relaxed"
              style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
            >
              负责组织团队拍摄校园活动与制作节目。
            </p>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ═══════════════════════════════════════════
          ⑧ 联系方式
          ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        <SectionMark label="CONTACT" />
        <h2
          className="anim-y-60 d-1 type-display mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          联系方式
        </h2>
        <div className="anim-y-60 d-2 space-y-2 type-label" style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}>
          <p className="text-[var(--fg)]">邮箱：934331621@qq.com</p>
          <p className="text-[var(--fg)]">微信：Mikko0615</p>
          <p className="text-[var(--fg)]">
            GitHub：{" "}
            <a
              href="https://github.com/M1kk0zz0615"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--fg)] hover:text-[#D10000] underline transition-colors duration-200"
            >
              M1kk0zz0615
            </a>
          </p>
        </div>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ═══════════════════════════════════════════
          ⑨ 附注
          ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-8 md:px-12 md:py-10 pb-20">
        {/* 至上主义 — 孤独的黑方块 */}
        <div
          className="anim-scale d-2 absolute bg-[var(--fg)] z-0"
          style={{ right: "28%", top: "18%", width: "24px", height: "24px" }}
        />
        <div
          className="anim-scale d-4 geo-circle absolute border-[1.5px] border-[var(--fg)]/15 z-0"
          style={{ right: "18%", top: "32%", width: "38px", height: "38px" }}
        />

        <SectionMark label="NOTE" />
        <h2
          className="anim-y-60 d-1 type-display mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          附注
        </h2>
        <p
          className="anim-y-60 d-2 text-[var(--fg)] leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
        >
          持续探索软件工程、视觉设计与影像表达之间的联系，希望创造兼具工程性与审美的数字作品。
        </p>

        {/* 底部几何装饰 */}
        <div className="anim-scale d-4 absolute right-[6%] flex gap-3" style={{ marginTop: "3rem" }}>
          <div className="bg-[var(--fg)]" style={{ width: "40px", height: "4px" }} />
          <div className="geo-circle bg-[#D10000]" style={{ width: "8px", height: "8px" }} />
          <div className="border-[2px] border-[var(--fg)]/15" style={{ width: "16px", height: "16px" }} />
        </div>
      </section>

      {/* 头像 Lightbox */}
      {avatarLightbox && (
        <Lightbox src={avatarLightbox.src} originRect={avatarLightbox.rect} onClose={() => setAvatarLightbox(null)} />
      )}
    </div>
  );
}
