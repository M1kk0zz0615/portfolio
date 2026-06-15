/* ============================================
   视频数据 — 封面图请放到 public/videocover/
   每个视频需要：标题、封面路径、B站链接、分类、描述
   ============================================ */

export interface VideoEntry {
  title: string;
  cover: string;         // 封面图路径，如 /videocover/work-01.jpg
  href: string;          // B站视频链接，填 "" 则不可点击
  category: "work" | "personal";
  description: string;
}

export const VIDEOS: VideoEntry[] = [
  // —— 受托 ——

  // —— 闲影 ——
  {
    title: "拉特兰最具观赏性高敏步枪手pov",
    cover: "/videocover/personal-01.webp",
    href: "https://www.bilibili.com/video/BV1NYwYzoEtD",
    category: "personal",
    description: "测试之",
  },
];
