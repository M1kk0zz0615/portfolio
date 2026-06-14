/* ============================================
   BUILD LOG 项目数据

   修改 GitHub URL: 搜索 YOUR_USERNAME 替换为 M1kk0zz0615
   或在 GitHub 创建仓库后更新对应链接。
   ============================================ */

export interface BuildLogProject {
  id: string; // 编号 "01" - "04"
  title: string; // 项目名称
  tech: string; // 技术栈 / 课程领域
  desc: string; // 简介
  highlights: string[]; // 亮点（2-3 条）
  githubUrl: string; // GitHub 仓库链接
  discipline: string; // 学科分类标签（计组 / 操作系统 / Web开发）
}

export const buildLogProjects: BuildLogProject[] = [
  {
    id: "01",
    title: "个人作品集网站",
    tech: "Next.js / TypeScript / TailwindCSS / Vercel",
    desc: "独立设计并开发构成主义风格个人作品集网站，展示摄影、影像与项目经历。",
    highlights: [
      "Next.js 16 App Router + React 19",
      "苏联构成主义视觉设计系统",
      "Vercel 自动部署 + 自定义域名",
    ],
    githubUrl: "https://github.com/M1kk0zz0615/portfolio",
    discipline: "Web开发",
  },
  {
    id: "02",
    title: "8位CPU设计与实现",
    tech: "计算机组成原理 / 硬布线+微程序",
    desc: "完成8位硬布线CPU与微程序CPU设计，实现指令取值、译码与执行全流程。",
    highlights: [
      "运算器与控制器模块设计",
      "硬布线 + 微程序双方案实现",
      "CPU 指令执行过程模拟",
    ],
    githubUrl:
      "https://github.com/M1kk0zz0615/8bit-cpu",
    discipline: "计组",
  },
  {
    id: "03",
    title: "银行家算法资源管理系统",
    tech: "C语言 / 操作系统",
    desc: "实现银行家算法资源分配系统，模拟多进程资源申请与安全状态检测。",
    highlights: [
      "资源分配矩阵维护与安全状态检测",
      "资源请求合法性验证",
      "深入理解死锁避免机制",
    ],
    githubUrl:
      "https://github.com/M1kk0zz0615/bankers-algorithm",
    discipline: "操作系统",
  },
  {
    id: "04",
    title: "实时任务调度模拟系统",
    tech: "C语言 / LLF调度算法",
    desc: "基于最低松弛度优先（LLF）调度算法，实现实时任务调度模拟系统。",
    highlights: [
      "LLF 动态优先级调整与调度模拟",
      "不同任务负载下调度结果分析",
      "实时操作系统调度机制",
    ],
    githubUrl:
      "https://github.com/M1kk0zz0615/llf-scheduler",
    discipline: "操作系统",
  },
];
