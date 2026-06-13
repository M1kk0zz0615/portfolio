"use client";

import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollArrow } from "@/components/ScrollArrow";

function SectionMark({ label }: { label: string }) {
  return (
    <div className="anim-y-60 flex items-center gap-3 mb-6">
      <span
        className="bg-[#D10000]"
        style={{ width: "clamp(24px, 3vw, 40px)", height: "4px" }}
      />
      <span
        className="type-cyrillic text-[#D10000]"
        style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
      >
        {label}
      </span>
    </div>
  );
}

function ProjectCard({
  title,
  tech,
  desc,
  highlights,
  delay,
}: {
  title: string;
  tech: string;
  desc: string;
  highlights: string[];
  delay: string;
}) {
  return (
    <div className={`anim-y-60 ${delay} relative border-l-[3px] border-[#D10000]/30 pl-5 py-2 hover:border-[#D10000] transition-colors duration-200`}>
      <h3
        className="type-display text-[#9B1B1B]"
        style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)", lineHeight: 1.2 }}
      >
        {title}
      </h3>
      <span
        className="type-label text-[#5C5044] mt-1 block"
        style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
      >
        {tech}
      </span>
      <p
        className="mt-3 text-[var(--fg)] leading-relaxed font-bold"
        style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
      >
        {desc}
      </p>
      <ul className="mt-2 space-y-1">
        {highlights.map((h, i) => (
          <li
            key={i}
            className="type-label text-[var(--fg)] flex items-start gap-2 font-bold"
            style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
          >
            <span className="text-[#D10000] mt-[0.3em] block shrink-0" style={{ width: "6px", height: "6px" }} />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  const ref = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <main className="bg-paper text-[var(--fg)] min-h-screen" ref={ref}>
      {/* ====== 顶部导航 ====== */}
      <div className="anim-y-60 fixed left-6 top-6 z-50">
        <Link
          href="/"
          className="type-label text-[var(--paper-cream)] hover:bg-[#D10000] no-underline inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--fg)] transition-colors duration-200"
          style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}
        >
          <span className="inline-block bg-[var(--paper-cream)]" style={{ width: "12px", height: "1.5px" }} />
          ← 返回
        </Link>
      </div>

      {/* ====== 标题区 ====== */}
      <div className="relative px-6 pt-16 pb-4 md:px-12 md:pt-20 md:pb-6">
        {/* 装饰 — 红色对角线 */}
        <div
          className="anim-line-x d-1 absolute h-[4px] bg-[#D10000] origin-left z-0"
          style={{ left: "0%", top: "55%", width: "35%", transform: "rotate(12deg)" }}
        />

        {/* 装饰 — 空心大圆 */}
        <div
          className="anim-scale d-2 geo-circle absolute border-[3px] border-[var(--fg)]/15 z-0"
          style={{ right: "12%", top: "20%", width: "clamp(50px, 8vw, 90px)", height: "clamp(50px, 8vw, 90px)" }}
        />

        {/* 装饰 — 红圆点 */}
        <div
          className="anim-scale d-2 geo-circle absolute bg-[#D10000] z-0"
          style={{ left: "42%", top: "58%", width: "8px", height: "8px" }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-16">
          {/* 左侧：名字 */}
          <div>
            <h1
              className="anim-y-60 d-2 type-display inline-block"
              style={{ fontSize: "clamp(3rem, 6vw, 7rem)" }}
            >
              刘俊宁
            </h1>

            <p
              className="anim-y-60 d-3 type-label text-[#5C5044] mt-3"
              style={{ fontSize: "clamp(0.85rem, 1.05vw, 0.95rem)" }}
            >
              计算机学生 / 摄影师 / 影像创作者
            </p>
          </div>

          {/* 右侧：头像 — 构成主义裁切 + 红色块（与 about 页不同角度） */}
          <div
            className="anim-scale d-3 relative shrink-0 cursor-pointer"
            style={{
              width: "clamp(120px, 22vw, 200px)",
              transform: "rotate(-2deg)",
              transition: "transform 0.3s cubic-bezier(0.2,0,0,1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(-2deg)")}
          >
            {/* 红色不规则底块 — 右下偏移 */}
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
            {/* 照片 */}
            <img
              src="/avatar/1.jpg"
              alt="刘俊宁"
              className="relative z-10 w-full h-auto"
              style={{
                clipPath: "polygon(5% 0, 100% 4%, 100% 96%, 0 100%)",
                filter: "grayscale(0) contrast(1) brightness(1)",
              }}
            />
          </div>
        </div>

        {/* 底部红线 — 右侧 */}
        <div
          className="anim-line-x d-4 absolute right-0 h-[3px] bg-[#D10000] z-0"
          style={{ bottom: "0%", width: "clamp(120px, 25vw, 320px)" }}
        />
      </div>

      {/* ====== 基本信息 + 求职意向 ====== */}
      <div className="px-6 py-6 md:px-12 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-start">
          {/* 基本信息 */}
          <div className="anim-y-60 d-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[var(--fg)]" style={{ width: "16px", height: "3px" }} />
              <span className="type-cyrillic text-[#5C5044]" style={{ fontSize: "clamp(0.8rem, 1vw, 0.9rem)" }}>
                INFO
              </span>
            </div>
            <div className="space-y-2 type-label" style={{ fontSize: "clamp(1rem, 1.2vw, 1.05rem)" }}>
              <p className="text-[var(--fg)]">广东工业大学 · 计算机科学与技术</p>
              <p className="text-[#5C5044]">本科大二 · 2024—至今</p>
              <p className="text-[#5C5044]">籍贯：广东</p>
              <p className="text-[#5C5044]">电话：13790025736</p>
            </div>
          </div>

          {/* 竖线分隔 */}
          <div className="hidden md:block bg-[#D10000]/30" style={{ width: "2px", height: "100%", minHeight: "120px" }} />

          {/* 求职意向 */}
          <div className="anim-y-60 d-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#D10000]" style={{ width: "16px", height: "3px" }} />
              <span className="type-cyrillic text-[#5C5044]" style={{ fontSize: "clamp(0.8rem, 1vw, 0.9rem)" }}>
                POSITION
              </span>
            </div>
            <div className="space-y-1">
              {["软件开发实习生", "前端开发实习生", "Java开发实习生", "技术支持实习生"].map((role) => (
                <p
                  key={role}
                  className="type-display hover-red"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.9rem)", lineHeight: 1.3 }}
                >
                  {role}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ====== 教育背景 ====== */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        {/* 右侧装饰 */}
        <div className="anim-scale d-3 geo-circle absolute bg-[#D10000] z-0" style={{ right: "8%", top: "20%", width: "10px", height: "10px" }} />
        <div className="anim-line-x d-2 absolute h-[3px] bg-[var(--fg)]/12 origin-right z-0" style={{ right: "0%", top: "35%", width: "12%", transform: "rotate(-8deg)" }} />

        <SectionMark label="EDUCATION" />
        <h2
          className="anim-y-60 d-1 type-display mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          教育背景
        </h2>
        <div className="anim-y-60 d-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-6">
          {[
            "数据结构与算法", "Java程序设计", "C语言程序设计",
            "操作系统", "计算机组成原理", "数据库系统", "计算机网络",
          ].map((course) => (
            <span
              key={course}
              className="type-label border border-[var(--fg)]/10 px-3 py-2 text-center hover:border-[#D10000]/40 hover:text-[#D10000] transition-colors duration-200"
              style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
            >
              {course}
            </span>
          ))}
        </div>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ====== 项目经历 ====== */}
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
        <h2
          className="anim-y-60 d-1 type-display mb-8"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          项目经历
        </h2>

        <div className="space-y-8">
          <ProjectCard
            title="个人摄影与视频作品集网站"
            tech="Next.js · TypeScript · TailwindCSS · Vercel"
            desc="独立设计并开发个人作品集网站，用于展示摄影作品、视频作品及个人经历。"
            highlights={[
              "基于 Next.js 构建响应式网站",
              "实现摄影作品分类展示与视频作品归档",
              "采用构成主义风格视觉设计",
              "使用 Cursor、Claude Code 等 AI 工具辅助开发",
            ]}
            delay="d-2"
          />
          <ProjectCard
            title="8位CPU设计与实现"
            tech="计算机组成原理"
            desc="完成8位硬布线CPU与8位微程序CPU设计，实现指令取值、译码与执行流程。"
            highlights={[
              "完成运算器和控制器设计",
              "实现CPU指令执行过程模拟",
              "理解硬布线控制与微程序控制原理",
            ]}
            delay="d-3"
          />
          <ProjectCard
            title="银行家算法资源管理系统"
            tech="C语言 · 操作系统"
            desc="实现银行家算法资源分配系统，模拟多进程资源申请与分配过程。"
            highlights={[
              "实现资源分配矩阵维护与安全状态检测",
              "实现资源请求合法性验证",
              "深入理解死锁避免机制",
            ]}
            delay="d-3"
          />
          <ProjectCard
            title="实时任务调度模拟系统"
            tech="C语言 · 操作系统"
            desc="基于最低松弛度优先（LLF）调度算法，实现实时任务调度模拟系统。"
            highlights={[
              "实现任务动态优先级调整与调度模拟",
              "分析不同任务负载下的调度结果",
              "理解实时操作系统调度机制",
            ]}
            delay="d-4"
          />
        </div>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ====== 校园经历 ====== */}
      <section className="relative px-6 py-8 md:px-12 md:py-10">
        {/* 右侧装饰 */}
        <div className="anim-scale d-2 geo-circle absolute border-[2px] border-[#D10000]/30 z-0" style={{ right: "10%", top: "12%", width: "28px", height: "28px" }} />
        <div className="anim-line-x d-3 absolute h-[3px] bg-[#D10000]/50 z-0" style={{ right: "6%", top: "30%", width: "50px" }} />

        <SectionMark label="CAMPUS" />
        <h2
          className="anim-y-60 d-1 type-display mb-6"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          校园经历
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="anim-y-60 d-2 relative border-l-[3px] border-[#D10000]/30 pl-5 hover:border-[#D10000] transition-colors duration-200">
            <h3
              className="type-display text-[#9B1B1B]"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.5rem)" }}
            >
              计算机学院融媒体工作室部长
            </h3>
            <ul className="mt-3 space-y-1">
              {[
                "负责学院公众号视频及图片内容制作",
                "参与学院宣传片、活动纪录片、年度总结视频制作",
                "负责团队成员协调与项目管理",
              ].map((item, i) => (
                <li
                  key={i}
                  className="type-label text-[var(--fg)] flex items-start gap-2 font-bold"
                  style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
                >
                  <span className="text-[#D10000] mt-[0.3em] shrink-0" style={{ width: "5px", height: "5px" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="anim-y-60 d-3 relative border-l-[3px] border-[var(--fg)]/20 pl-5 hover:border-[var(--fg)]/50 transition-colors duration-200">
            <h3
              className="type-display text-[#9B1B1B]"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.5rem)" }}
            >
              高中电视台组长
            </h3>
            <ul className="mt-3 space-y-1">
              {[
                "负责校园活动拍摄与视频制作",
                "组织团队完成节目策划与后期制作",
              ].map((item, i) => (
                <li
                  key={i}
                  className="type-label text-[var(--fg)] flex items-start gap-2 font-bold"
                  style={{ fontSize: "clamp(1.05rem, 1.25vw, 1.15rem)" }}
                >
                  <span className="text-[var(--fg)]/30 mt-[0.3em] shrink-0" style={{ width: "5px", height: "5px" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12">
        <div className="h-[2px] bg-[var(--fg)]/8 w-full" />
      </div>

      {/* ====== 技能清单 ====== */}
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
          技能清单
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { cat: "编程语言", items: ["C", "Java"] },
            { cat: "开发工具", items: ["Git", "VS Code", "Cursor", "Claude Code"] },
            { cat: "Web开发", items: ["HTML", "CSS", "JavaScript", "Next.js"] },
            { cat: "其他能力", items: ["摄影摄像", "视频剪辑与后期", "Photoshop", "新媒体内容创作"] },
          ].map(({ cat, items }, i) => (
            <div key={cat} className={`anim-y-60 d-${i + 2}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#D10000]" style={{ width: "10px", height: "3px" }} />
                <span
                  className="type-label text-[var(--fg)]"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.05rem)" }}
                >
                  {cat}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="type-label text-[#5C5044] border border-[var(--fg)]/08 px-2 py-1"
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

      {/* ====== 自我评价 ====== */}
      <section className="relative px-6 py-8 md:px-12 md:py-10 pb-20">
        {/* 至上主义 — 孤独的黑方块，零度形式 */}
        <div
          className="anim-scale d-2 absolute bg-[var(--fg)] z-0"
          style={{ right: "28%", top: "18%", width: "24px", height: "24px" }}
        />
        <div
          className="anim-scale d-4 geo-circle absolute border-[1.5px] border-[var(--fg)]/15 z-0"
          style={{ right: "18%", top: "32%", width: "38px", height: "38px" }}
        />

        <SectionMark label="ABOUT" />
        <h2
          className="anim-y-60 d-1 type-display mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
        >
          自我评价
        </h2>
        <p
          className="anim-y-60 d-2 text-[var(--fg)] leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.05rem)" }}
        >
          具备扎实的计算机基础知识和较强的学习能力，对软件开发、操作系统及计算机底层原理具有浓厚兴趣。
          拥有丰富的校园媒体实践经历，兼具技术能力与审美素养，具备良好的沟通协作能力和责任心。
          希望通过暑期实习进一步提升工程实践能力，积累真实项目开发经验。
        </p>

        {/* 底部几何装饰 */}
        <div className="anim-scale d-4 absolute right-[6%] flex gap-3" style={{ marginTop: "3rem" }}>
          <div className="bg-[var(--fg)]" style={{ width: "40px", height: "4px" }} />
          <div className="geo-circle bg-[#D10000]" style={{ width: "8px", height: "8px" }} />
          <div className="border-[2px] border-[var(--fg)]/15" style={{ width: "16px", height: "16px" }} />
        </div>
      </section>
      <ScrollArrow />
    </main>
  );
}
