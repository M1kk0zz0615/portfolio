/**
 * 批量将 public/ 下的 JPG/PNG 转换为 WebP (quality 75)
 * 仅当 WebP 比原图小时才保留 WebP（否则体积变大说明源文件已高度压缩）
 * 原图保留不删
 *
 * 用法: node scripts/convert-to-webp.mjs
 */
import { statSync, unlinkSync } from "fs";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const QUALITY = 75;  // next/image 默认值，肉眼无损

// 递归收集文件
function walk(dir, list = []) {
  const { readdirSync } = await_import("fs");
  const { join } = await_import("path");
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, list);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) list.push(full);
  }
  return list;
}

import { readdirSync } from "fs";
import { join } from "path";

function walkSync(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkSync(full));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

const files = walkSync(PUBLIC_DIR);

console.log(`找到 ${files.length} 个文件，逐个转换…\n`);
console.log(`策略: WebP quality ${QUALITY}，仅保留体积更小的转换结果\n`);

let totalBefore = 0;
let totalAfter = 0;
let kept = 0;
let skipped = 0;

for (const file of files) {
  const beforeSize = statSync(file).size;
  const webpPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
  totalBefore += beforeSize;

  try {
    await sharp(file)
      .webp({ quality: QUALITY, lossless: false })
      .toFile(webpPath);

    const afterSize = statSync(webpPath).size;
    const reduction = ((1 - afterSize / beforeSize) * 100).toFixed(0);
    const kbBefore = (beforeSize / 1024).toFixed(0);
    const kbAfter = (afterSize / 1024).toFixed(0);

    if (afterSize < beforeSize) {
      // WebP 更小 → 保留
      totalAfter += afterSize;
      kept++;
      console.log(`✅ ${reduction}%↓  ${kbBefore}KB → ${kbAfter}KB  ${file}`);
    } else {
      // WebP 更大 → 删除 WebP，保留原 JPG/PNG
      unlinkSync(webpPath);
      totalAfter += beforeSize; // 仍用原文件
      skipped++;
      console.log(`⏭️ 跳过 (+${Math.abs(reduction)}%)  ${kbBefore}KB → ${kbAfter}KB  ${file}  (保留原格式)`);
    }
  } catch (err) {
    console.error(`✗ 失败: ${file} — ${err.message}`);
  }
}

const savedKB = ((totalBefore - totalAfter) / 1024).toFixed(0);
console.log(`\n══════════════════════════════════════`);
console.log(`✅ 保留 WebP: ${kept} 个`);
console.log(`⏭️ 保留原格式: ${skipped} 个 (源文件压缩率已很高)`);
console.log(`总计: ${(totalBefore / 1024).toFixed(0)}KB → ${(totalAfter / 1024).toFixed(0)}KB  (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%↓)`);
console.log(`节省: ${savedKB}KB (${(savedKB / 1024).toFixed(1)}MB)`);
