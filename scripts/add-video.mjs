/**
 * 添加 B 站视频 — 自动提取封面转 webp，输出 data/videos.ts 条目
 *
 * 用法:
 *   node scripts/add-video.mjs "https://www.bilibili.com/video/BVxxxxxx" <work|personal>
 *
 * 示例:
 *   node scripts/add-video.mjs "https://www.bilibili.com/video/BV1NYwYzoEtD" personal
 *
 * 流程:
 *   1. 调 B站 API 获取标题 & 封面原图
 *   2. 下载封面 → public/videocover/
 *   3. 转 webp (quality 80)
 *   4. 打印 videos.ts 条目代码，复制粘贴即可
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { basename, join } from "path";
import sharp from "sharp";

const VIDEOCOVER_DIR = "public/videocover";
const VIDEOS_TS = "data/videos.ts";

// ── 工具 ──────────────────────────────────
async function fetchJson(url, opts = {}) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Referer: "https://www.bilibili.com/",
      ...opts.headers,
    },
    ...opts,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

function extractBvid(url) {
  const m = url.match(/BV[a-zA-Z0-9]{10}/);
  if (!m) throw new Error(`无法从 URL 提取 BV 号: ${url}`);
  return m[0];
}

// ── 主流程 ────────────────────────────────
const [,, inputUrl, category] = process.argv;

if (!inputUrl || !category) {
  console.log("用法: node scripts/add-video.mjs <B站链接> <work|personal>");
  console.log("示例: node scripts/add-video.mjs https://www.bilibili.com/video/BVxxxxxx work");
  process.exit(1);
}

if (!["work", "personal"].includes(category)) {
  console.error("category 必须是 work 或 personal");
  process.exit(1);
}

// 1. 提取 BV 号
const bvid = extractBvid(inputUrl);
console.log(`BV号: ${bvid}`);

// 2. 调 B站 API 获取视频信息
console.log("正在获取视频信息...");
const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
const json = await fetchJson(apiUrl);

if (json.code !== 0) {
  console.error(`B站 API 返回错误: code=${json.code}, message=${json.message}`);
  process.exit(1);
}

const { title, pic, desc } = json.data;
console.log(`标题: ${title}`);
console.log(`封面: ${pic}`);

// 3. 下载封面
console.log("正在下载封面...");
const imgRes = await fetch(pic, {
  headers: { Referer: "https://www.bilibili.com/" },
});
if (!imgRes.ok) throw new Error(`下载封面失败: HTTP ${imgRes.status}`);
const imgBuffer = Buffer.from(await imgRes.arrayBuffer());

// 4. 生成文件名 & 保存
if (!existsSync(VIDEOCOVER_DIR)) mkdirSync(VIDEOCOVER_DIR, { recursive: true });
const ext = pic.split(".").pop().split("?")[0]; // jpg or png
const rawName = `${category}-${bvid}.${ext}`;
const rawPath = join(VIDEOCOVER_DIR, rawName);
writeFileSync(rawPath, imgBuffer);
console.log(`封面已保存: ${rawPath}`);

// 5. 转 webp
const webpName = `${category}-${bvid}.webp`;
const webpPath = join(VIDEOCOVER_DIR, webpName);
const webpBuffer = await sharp(imgBuffer)
  .resize({ width: 1280, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toBuffer();
writeFileSync(webpPath, webpBuffer);

const rawSize = (imgBuffer.length / 1024).toFixed(0);
const webpSize = (webpBuffer.length / 1024).toFixed(0);
console.log(`WebP 已生成: ${webpPath} (${rawSize}KB → ${webpSize}KB)`);

// 6. 输出 videos.ts 代码
const snippet = `
  {
    title: "${title.replace(/"/g, '\\"')}",
    cover: "/videocover/${webpName}",
    href: "https://www.bilibili.com/video/${bvid}",
    category: "${category}",
    description: "${(desc || "简介待补充").replace(/"/g, '\\"').replace(/\n/g, " ").slice(0, 100)}",
  },
`;

console.log("\n══════════════════════════════════════");
console.log("复制以下代码到 data/videos.ts:");
console.log("══════════════════════════════════════");
console.log(snippet);
console.log("══════════════════════════════════════");
