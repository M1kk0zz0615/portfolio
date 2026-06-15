"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { buildLogProjects } from "@/data/buildLogProjects";


export function PosterBuildLog() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <section
      ref={ref}
      id="build-log"
      className="poster bg-paper text-[var(--fg)]"
      aria-label="构建日志"
    >
      {/* ====== 桌面端 ====== */}
      <div className="hidden lg:contents">
        {/* 红色对角线 */}
        <div
          className="anim-line-x d-1 pointer-events-none absolute bg-[#D10000]/40 z-0"
          style={{
            left: "15%", bottom: "6%", width: "88%", height: "3px",
            transform: "rotate(-16deg)", transformOrigin: "left center",
          }}
        />

        {/* 档案编号 — 模块标签样式 */}
        <div
          className="anim-y-60 absolute z-20 font-mono text-xs tracking-widest uppercase"
          style={{ left: "clamp(1.5rem, 6cqw, 8%)", top: "19%" }}
        >
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 1.8cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>02</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ B</span>
        </div>

        {/* 标题组：西里尔文 + 主标题 + 英文 */}
        <div
          className="anim-y-60 d-1 pointer-events-none absolute z-10 flex flex-col"
          style={{
            left: "clamp(1rem,8cqw,12%)", top: "22%",
          }}
        >
          <span
            className="type-cyrillic text-[#D10000] pl-10"
            style={{
              fontSize: "clamp(1.4rem,1.8vw,1.6rem)", letterSpacing: "0.3em",
            }}
          >
            АРХИВ СБОРКИ
          </span>
          <div className="flex items-baseline gap-3">
            <h2
              className="type-display text-[var(--fg)]"
              style={{
                fontSize: "clamp(3rem,6vw,6rem)", lineHeight: 0.9, fontWeight: 900,
                letterSpacing: "-0.02em", transform: "skewX(-4deg)",
              }}
            >
              构建日志
            </h2>
            <span
              className="type-label text-[var(--fg)]/30"
              style={{
                fontSize: "clamp(1rem,1.5vw,1.3rem)", letterSpacing: "0.15em",
              }}
            >
              BUILD LOG
            </span>
          </div>
        </div>

        {/* 项目卡片 */}
        {buildLogProjects.map((project, i) => {
          const positions = [
            { left: "2%", top: "67%" },
            { left: "28%", top: "53%" },
            { left: "54%", top: "39%" },
            { left: "80%", top: "25%" },
          ];
          return (
            <Link
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`anim-y-60 group no-underline absolute z-10 d-${i + 2} card-hover`}
              style={{ ...positions[i], width: "clamp(280px,28cqw,380px)" }}
            >
              <div
                className="border-l-[3px] border-[#D10000]/30 pl-4 py-2
                  hover:border-[#D10000] hover:bg-[#D10000]/8 transition-all duration-200"
              >
                {/* LED 运行指示灯 */}
                <div
                  className="pointer-events-none led-indicator -mt-[6px] mb-1 group-hover:!bg-[#D49800] group-hover:!shadow-[0_0_4px_rgba(212,152,0,0.6)] group-hover:!animate-none"
                  style={{ width: "8px", height: "8px" }}
                />
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="type-cyrillic text-[#D10000]"
                    style={{ fontSize: "clamp(0.95rem,1.3vw,1.15rem)" }}
                  >
                    {project.id}
                  </span>
                  <span
                    className="type-label text-[var(--fg)]/25"
                    style={{ fontSize: "clamp(0.78rem,1vw,0.88rem)" }}
                  >
                    {project.discipline}
                  </span>
                </div>
                <h3
                  className="type-display text-[var(--fg)]"
                  style={{ fontSize: "clamp(1.45rem,2.3vw,1.8rem)", lineHeight: 1.25 }}
                >
                  {project.title}
                </h3>
                <span
                  className="type-label text-[var(--fg)]/40 mt-1 block"
                  style={{ fontSize: "clamp(0.85rem,1.05vw,0.95rem)" }}
                >
                  {project.tech}
                </span>
                <p
                  className="mt-2 text-[var(--fg)]/70 leading-relaxed"
                  style={{ fontSize: "clamp(1rem,1.3vw,1.15rem)" }}
                >
                  {project.desc}
                </p>
                <span
                  className="absolute right-2 top-2 text-[#D10000] opacity-0
                    group-hover:opacity-100 transition-opacity duration-200"
                  style={{ fontSize: "clamp(0.95rem,1.3vw,1.15rem)" }}
                >
                  ↗
                </span>
              </div>
            </Link>
          );
        })}

        {/* 中间偏上空区 — 色块组 */}
        <div
          className="anim-scale d-2 pointer-events-none absolute bg-[#D10000]/10 z-0"
          style={{ right: "14%", top: "33%", width: "clamp(100px,13cqw,200px)", height: "clamp(80px,10cqh,150px)" }}
        />
        <div
          className="anim-scale d-2 pointer-events-none absolute bg-[#D10000]/8 z-0"
          style={{
            left: "10%", top: "40%",
            width: "clamp(70px,9cqw,130px)", height: "clamp(50px,6cqh,90px)",
            transform: "rotate(-12deg)",
          }}
        />
        <div
          className="anim-scale d-3 pointer-events-none absolute bg-[var(--fg)]/07 z-0"
          style={{
            right: "22%", top: "38%",
            width: "clamp(60px,8cqw,110px)", height: "clamp(45px,5cqh,80px)",
            transform: "skewX(-10deg)",
          }}
        />
        <div
          className="anim-scale d-4 pointer-events-none absolute bg-[#D10000]/12 z-0"
          style={{
            left: "6%", top: "35%",
            width: "clamp(40px,5cqw,70px)", height: "clamp(35px,4cqh,60px)",
            clipPath: "polygon(0 0, 100% 15%, 85% 100%, 10% 90%)",
          }}
        />
        <div
          className="anim-line-x d-3 pointer-events-none absolute bg-[#D10000]/20 z-0"
          style={{ right: "16%", top: "30%", width: "clamp(50px,7cqw,90px)", height: "2px" }}
        />
        <div
          className="anim-scale d-4 geo-circle pointer-events-none absolute bg-[#D10000]/25 z-0"
          style={{ right: "30%", top: "36%", width: "10px", height: "10px" }}
        />

        {/* 顶部装饰 */}
        <div
          className="anim-line-x d-1 pointer-events-none absolute bg-[#D10000]/30 z-0"
          style={{ left: "5%", top: "10%", width: "clamp(60px,8cqw,120px)", height: "3px" }}
        />
        <div
          className="anim-scale d-2 pointer-events-none absolute bg-[#D10000]/10 z-0"
          style={{
            right: "20%", top: "14%",
            width: "clamp(50px,6cqw,90px)", height: "clamp(8px,1cqh,14px)",
            transform: "skewX(-25deg)",
          }}
        />
        <div
          className="anim-scale d-3 geo-circle pointer-events-none absolute border-[2px] border-[#D10000]/20 z-0"
          style={{ left: "22%", top: "8%", width: "clamp(16px,2cqw,28px)", height: "clamp(16px,2cqw,28px)" }}
        />

        {/* 右下角构成主义西里尔文 */}
        <span
          className="anim-scale d-3 type-cyrillic pointer-events-none absolute z-0 text-[#8B0000]/12"
          style={{
            right: "2%", bottom: "8%",
            fontSize: "clamp(2rem,4vw,5rem)",
            letterSpacing: "0.15em",
            transform: "skewX(-8deg)",
            lineHeight: 1.1,
            textAlign: "right",
          }}
        >
          МЕТОД<br />—<br />ЭКСПЕРИМЕНТ
        </span>

        <div className="scroll-arrow z-30" />
      </div>

      {/* ====== 移动端 ====== */}
      <div className="lg:hidden relative z-10 flex w-full flex-col px-4 pt-24 pb-16 sm:px-8 sm:pt-28">
        {/* 档案编号 — 模块标签样式 */}
        <div className="anim-y-60 font-mono text-xs tracking-widest uppercase mb-6">
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 3cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>02</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ B</span>
        </div>
        <div className="anim-y-60 d-1 flex flex-col">
          <span
            className="type-cyrillic text-[#D10000]"
            style={{ fontSize: "clamp(1.2rem,3vw,1.5rem)", letterSpacing: "0.3em" }}
          >
            АРХИВ СБОРКИ
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <h2
              className="type-display text-[var(--fg)]"
              style={{
                fontSize: "clamp(2.5rem,8.5vw,5rem)", lineHeight: 0.9, fontWeight: 900,
                transform: "skewX(-4deg)",
              }}
            >
              构建日志
            </h2>
            <span
              className="type-label text-[var(--fg)]/30"
              style={{ fontSize: "clamp(1rem,3vw,1.3rem)", letterSpacing: "0.15em" }}
            >
              BUILD LOG
            </span>
          </div>
        </div>


        <p
          className="anim-y-60 d-2 text-[var(--fg)]/55 mt-5 max-w-md leading-relaxed"
          style={{ fontSize: "clamp(0.9rem,2.5vw,1rem)" }}
        >
          计算机科学课程项目档案。每个项目都是一个从零构建的系统，从底层硬件到上层应用。
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {buildLogProjects.map((project, i) => (
            <Link
              key={project.id}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`anim-y-60 group no-underline d-${i + 2} card-hover`}
            >
              <div
                className="border-l-[3px] border-[#D10000]/30 pl-4 py-2
                  hover:border-[#D10000] hover:bg-[#D10000]/8 transition-all duration-200"
              >
                {/* LED 运行指示灯 */}
                <div
                  className="pointer-events-none led-indicator -mt-[6px] mb-1 group-hover:!bg-[#D49800] group-hover:!shadow-[0_0_4px_rgba(212,152,0,0.6)] group-hover:!animate-none"
                  style={{ width: "8px", height: "8px" }}
                />
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="type-cyrillic text-[#D10000]"
                    style={{ fontSize: "clamp(0.95rem,2.3vw,1.15rem)" }}
                  >
                    {project.id}
                  </span>
                  <span
                    className="type-label text-[var(--fg)]/25"
                    style={{ fontSize: "clamp(0.78rem,1.8vw,0.88rem)" }}
                  >
                    {project.discipline}
                  </span>
                </div>
                <h3
                  className="type-display text-[var(--fg)]"
                  style={{ fontSize: "clamp(1.45rem,3.2vw,1.8rem)", lineHeight: 1.25 }}
                >
                  {project.title}
                </h3>
                <span
                  className="type-label text-[var(--fg)]/40 mt-1 block"
                  style={{ fontSize: "clamp(0.85rem,2vw,0.95rem)" }}
                >
                  {project.tech}
                </span>
                <p
                  className="mt-2 text-[var(--fg)]/70 leading-relaxed"
                  style={{ fontSize: "clamp(1rem,2.4vw,1.15rem)" }}
                >
                  {project.desc}
                </p>              </div>
            </Link>
          ))}
        </div>

        <div className="scroll-arrow z-30" />
      </div>
    </section>
  );
}
