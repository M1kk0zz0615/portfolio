/* ============================================
   视频数据 — 封面图请放到 public/videocover/
   添加视频: node scripts/add-video.mjs "B站链接" <work|personal>
   ============================================ */

export interface VideoEntry {
  title: string;
  cover: string;
  href: string;
  category: "work" | "personal";
  description: string;
}

export const VIDEOS: VideoEntry[] = [
  // —— 闲影 ——
  {
    title: "拉特兰最具观赏性高敏步枪手pov",
    cover: "/videocover/personal-BV1NYwYzoEtD.webp",
    href: "https://www.bilibili.com/video/BV1NYwYzoEtD",
    category: "personal",
    description: "-",
  },
];
