"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { usePosterWidth } from "@/app/hooks/usePosterWidth";
import { Lightbox } from "@/components/Lightbox";

export function PosterOther() {
  const ref = useScrollReveal<HTMLDivElement>(0.3);
  usePosterWidth(ref); // 修复 iPadOS Safari cqw 不更新
  const wechatRef = useRef<HTMLAnchorElement>(null);
  const [wechatLightbox, setWechatLightbox] = useState<{ src: string; rect: DOMRect } | null>(null);

  const openWechat = useCallback(() => {
    if (wechatRef.current) {
      const linkRect = wechatRef.current.getBoundingClientRect();
      const cx = linkRect.left + linkRect.width / 2;
      const cy = linkRect.top + linkRect.height / 2;
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.2;
      const virtualRect: DOMRect = {
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size * (1338 / 912),
        right: cx + size / 2,
        bottom: cy + size * (1338 / 912) / 2,
        x: cx - size / 2,
        y: cy - size / 2,
        toJSON: () => ({}),
      };
      setWechatLightbox({
        src: "/photos/wechat/mmqrcode1781334663008.png",
        rect: virtualRect,
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="poster flex items-center bg-paper text-[var(--fg)]"
      aria-label="其他"
    >
      {/* ====== 桌面端 (>1024px) — 绝对定位海报布局 ====== */}
      <div className="hidden lg:contents">
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
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>05</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ E</span>
        </div>

        {/* 左上角空心正方形 */}
        <div className="anim-scale d-1 absolute border-[4px] border-[var(--fg)] z-0"
          style={{ left: "12%", top: "18%", width: "clamp(40px, 6cqw, 70px)", height: "clamp(40px, 6cqw, 70px)" }} />
        {/* 红色小圆 */}
        <div className="anim-scale d-2 geo-circle absolute bg-[#D10000] z-0"
          style={{ left: "28%", top: "22%", width: "clamp(14px, 2cqw, 22px)", height: "clamp(14px, 2cqw, 22px)" }} />
        {/* 空心黑圆 */}
        <div className="anim-scale d-3 geo-circle absolute border-[3px] border-[var(--fg)] z-0"
          style={{ right: "16%", top: "20%", width: "clamp(30px, 4cqw, 50px)", height: "clamp(30px, 4cqw, 50px)" }} />
        {/* 细水平线 */}
        <div className="anim-line-x d-3 absolute right-0 h-[2px] bg-[var(--fg)]/15 z-0"
          style={{ top: "42%", width: "18%" }} />
        {/* 红色粗短横线 */}
        <div className="anim-line-x d-2 absolute right-[12%] h-[4px] bg-[#D10000] z-0"
          style={{ top: "46%", width: "clamp(40px, 6cqw, 80px)" }} />
        {/* 黑色小方块 */}
        <div className="anim-scale d-4 absolute bg-[var(--fg)] z-0"
          style={{ right: "18%", top: "55%", width: "clamp(10px, 1.5cqw, 18px)", height: "clamp(10px, 1.5cqw, 18px)" }} />
        {/* 红色圆点 */}
        <div className="anim-scale d-5 geo-circle absolute bg-[#D10000] z-0"
          style={{ right: "10%", bottom: "24%", width: "clamp(8px, 1.2cqw, 14px)", height: "clamp(8px, 1.2cqw, 14px)" }} />
        {/* 竖向细线 */}
        <div className="anim-line-x d-1 absolute w-[2px] bg-[var(--fg)]/20 z-0"
          style={{ right: "26%", top: "26%", height: "16%" }} />

        {/* 两个链接 — 居中 */}
        <div className="anim-y-60 d-2 absolute flex flex-col gap-8 select-none z-10"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <Link href="/browse" className="group flex items-center no-underline">
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(2.5rem, calc(var(--pw) * 0.05 * 1px), 5rem)" }}>索引</span>
            <span className="type-cyrillic ml-4 text-[#B0B0B0]" style={{ fontSize: "clamp(0.6rem, calc(var(--pw) * 0.009 * 1px), 0.8rem)" }}>INDEX</span>
          </Link>
          <Link href="/about" className="group flex items-center no-underline">
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(2.5rem, calc(var(--pw) * 0.05 * 1px), 5rem)" }}>关于</span>
            <span className="type-cyrillic ml-4 text-[#B0B0B0]" style={{ fontSize: "clamp(0.6rem, calc(var(--pw) * 0.009 * 1px), 0.8rem)" }}>ABOUT</span>
          </Link>
        </div>

        {/* 社交媒体 */}
        <div className="anim-y-60 d-4 absolute flex flex-col items-start gap-3 select-none z-10"
          style={{ left: "12%", bottom: "14%" }}>
          <div className="flex items-center gap-2">
            <span className="type-label text-[var(--fg)] font-bold"
              style={{ fontSize: "clamp(0.65rem, 0.85cqw, 0.8rem)", letterSpacing: "0.2em" }}>找到我</span>
            <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid var(--red)" }} />
          </div>
          <div className="flex items-center gap-3 type-label">
            <a href="https://space.bilibili.com/39276639?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer"
              className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
              style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.7rem)" }}>Bilibili</a>
            <a ref={wechatRef} href="#" onClick={(e) => { e.preventDefault(); openWechat(); }}
              className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
              style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.7rem)" }}>WeChat</a>
            <a href="https://www.xiaohongshu.com/user/profile/5d63437f000000000100a557" target="_blank" rel="noopener noreferrer"
              className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
              style={{ fontSize: "clamp(0.6rem, 0.8cqw, 0.7rem)" }}>rednote</a>
          </div>
        </div>

        {/* 底部黑色粗线 */}
        {/* ── 四角裁切线 ── */}
        {[
          { l: "2%", t: "3%" },
          { r: "2%", t: "3%" },
          { l: "2%", b: "4.5%" },
          { r: "2%", b: "4.5%" },
        ].map((pos, i) => (
          <div key={i} className={`anim-scale d-${i + 1} absolute z-0`}
            style={{ ...pos, width: "clamp(14px, 2cqw, 22px)", height: "clamp(14px, 2cqw, 22px)" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", transform: "translateY(-50%)" }} />
          </div>
        ))}

        {/* ── Registration Mark · 四角套准标记 ── */}
        {[
          { left: "1.2%", top: "2.5%" },
          { right: "1.2%", top: "2.5%" },
          { left: "1.2%", bottom: "4%" },
          { right: "1.2%", bottom: "4%" },
        ].map((pos, i) => (
          <div key={`reg-${i}`} className={`anim-scale d-${i + 1} absolute z-0`}
            style={{ ...pos, width: "clamp(16px, 2.2cqw, 24px)", height: "clamp(16px, 2.2cqw, 24px)" }}
            aria-hidden="true">
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--fg)", opacity: 1 }} />
            <div style={{ position: "absolute", left: "50%", top: 0, width: "1px", height: "100%", background: "var(--fg)", opacity: 1, transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, height: "1px", width: "100%", background: "var(--fg)", opacity: 1, transform: "translateY(-50%)" }} />
          </div>
        ))}

        {/* ── 左侧竖排西里尔文 ── */}
        <div
          className="anim-y-60 d-3 absolute z-[2] select-none"
          style={{
            left: "2.8%", top: "18%",
            fontSize: "clamp(0.85rem, 1cqw, 1.1rem)",
            fontFamily: "var(--font-geist-mono)",
            color: "var(--fg)",
            letterSpacing: "0.3em",
            transform: "rotate(90deg)",
            transformOrigin: "left top",
            whiteSpace: "nowrap",
          }}
          aria-hidden="true">
          АРХИВ 05
        </div>

        {/* 右下角大水印数字 */}
        <div
          className="absolute z-[1] select-none"
          style={{
            right: "4%", bottom: "4%",
            fontSize: "clamp(10rem, 22cqw, 26rem)",
            fontWeight: 900,
            color: "var(--fg)",
            opacity: 0.035,
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            fontFamily: "var(--font-geist-mono)",
          }}
          aria-hidden="true">
          05
        </div>

        <div className="footer-bar z-0" />
      </div>

      {/* ====== 移动端+平板 (<1024px) — flex-col 纵向布局 ====== */}
      <div className="lg:hidden relative z-10 flex w-full flex-col items-center px-4 pt-16 sm:px-8 sm:pt-20" style={{gap:"clamp(0.5rem, 2vh, 1.5rem)"}}>
        {/* 档案编号 — 模块标签样式 */}
        <div className="anim-y-60 self-start font-mono text-xs tracking-widest uppercase mb-8">
          <span style={{
            display: "inline-block",
            width: "clamp(14px, 3cqw, 22px)",
            height: "3px",
            background: "#D10000",
            verticalAlign: "middle",
            marginRight: "0.5em",
          }} />
          <span style={{ color: "var(--fg)", opacity: 0.55 }}>№</span>
          <span style={{ color: "#D10000", margin: "0 0.35em", fontWeight: 700 }}>05</span>
          <span style={{ color: "var(--fg)", fontWeight: 700 }}>— СЕКЦИЯ E</span>
        </div>

        {/* 两个链接 — 居中竖排 */}
        <div className="anim-y-60 d-2 flex flex-col gap-8 select-none mb-12 items-center">
          <Link href="/browse" className="group flex items-center no-underline">
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}>索引</span>
            <span className="type-cyrillic ml-3 text-[#B0B0B0]" style={{ fontSize: "clamp(0.55rem, 2vw, 0.7rem)" }}>INDEX</span>
          </Link>
          <Link href="/about" className="group flex items-center no-underline">
            <span className="geo-marker" />
            <span className="type-display hover-red" style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}>关于</span>
            <span className="type-cyrillic ml-3 text-[#B0B0B0]" style={{ fontSize: "clamp(0.55rem, 2vw, 0.7rem)" }}>ABOUT</span>
          </Link>
        </div>

        {/* 社交媒体 — 居中 */}
        <div className="anim-y-60 d-4 flex flex-col items-center gap-4 select-none pb-8">
          <div className="flex items-center gap-2">
            <span className="type-label text-[var(--fg)] font-bold"
              style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.8rem)", letterSpacing: "0.15em" }}>找到我</span>
            <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "7px solid var(--red)" }} />
          </div>
          <div className="flex items-center gap-2 type-label flex-wrap justify-center">
            <a href="https://space.bilibili.com/39276639?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer"
              className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
              style={{ fontSize: "clamp(0.6rem, 2.5vw, 0.75rem)" }}>Bilibili</a>
            <a ref={wechatRef} href="#" onClick={(e) => { e.preventDefault(); openWechat(); }}
              className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
              style={{ fontSize: "clamp(0.6rem, 2.5vw, 0.75rem)" }}>WeChat</a>
            <a href="#"
              className="border border-[var(--fg)]/20 px-3 py-1.5 text-[var(--fg)] no-underline transition-all duration-200 hover:border-[#D10000] hover:text-[#D10000] hover:bg-[#D10000]/5"
              style={{ fontSize: "clamp(0.6rem, 2.5vw, 0.75rem)" }}>Instagram</a>
          </div>
        </div>

        {/* 底部黑线 */}
        <div className="w-full h-[3px] bg-[var(--fg)] mt-2 mb-4" />

        {/* ═══════════ 移动端制图标识 ═══════════ */}

        {/* 四角套准标记 (圆+十字) */}
        {[{left:"1.5%",top:"2.5%"},{right:"1.5%",top:"2.5%"},{left:"1.5%",bottom:"4%"},{right:"1.5%",bottom:"4%"}].map((p,i)=>
          <div key={`reg-${i}`} className="absolute z-0" style={{...p,width:"clamp(14px,3.5vw,20px)",height:"clamp(14px,3.5vw,20px)"}} aria-hidden="true">
            <div style={{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid var(--fg)",opacity:.5}} />
            <div style={{position:"absolute",left:"50%",top:0,width:"1px",height:"100%",background:"var(--fg)",opacity:.5,transform:"translateX(-50%)"}} />
            <div style={{position:"absolute",top:"50%",left:0,height:"1px",width:"100%",background:"var(--fg)",opacity:.5,transform:"translateY(-50%)"}} />
          </div>
        )}

        {/* 超大编号水印 */}
        <div className="absolute z-[1] select-none pointer-events-none" style={{right:"4%",bottom:"4%",fontSize:"clamp(8rem,40vw,20rem)",fontWeight:900,color:"var(--fg)",opacity:.04,lineHeight:.85,letterSpacing:"-0.05em",fontFamily:"var(--font-geist-mono)"}} aria-hidden="true">05</div>

        {/* ── 至上主义填充装饰 ── */}
        {/* 空心大圆 — Lissitzky 式悬浮几何 */}
        <div className="absolute z-0 select-none pointer-events-none"
          style={{
            left: "50%", top: "55%",
            width: "clamp(80px, 25vw, 180px)", height: "clamp(80px, 25vw, 180px)",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "3px solid var(--fg)",
            opacity: 0.08,
          }} aria-hidden="true" />

        {/* 红色小方块 — 至上主义锚点 */}
        <div className="absolute z-0 select-none pointer-events-none"
          style={{
            left: "62%", top: "48%",
            width: "clamp(8px, 2vw, 14px)", height: "clamp(8px, 2vw, 14px)",
            background: "#D10000",
            opacity: 0.25,
          }} aria-hidden="true" />

        {/* 终章标注 */}
        <span className="type-cyrillic absolute z-[2] select-none pointer-events-none text-[var(--fg)]"
          style={{
            left: "50%", bottom: "12%",
            transform: "translateX(-50%)",
            fontSize: "clamp(0.9rem, 3vw, 1.3rem)",
            letterSpacing: "0.5em",
            opacity: 0.15,
          }} aria-hidden="true">
          КОНЕЦ
        </span>
      </div>

      {/* 微信二维码灯箱 */}
      {wechatLightbox && (
        <Lightbox src={wechatLightbox.src} originRect={wechatLightbox.rect} onClose={() => setWechatLightbox(null)} />
      )}
    </section>
  );
}
