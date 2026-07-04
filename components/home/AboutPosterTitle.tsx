export function AboutPosterTitle() {
  return (
    <h1
      className="type-display flex flex-col gap-[0.15em] text-[var(--fg)] select-none whitespace-nowrap"
      style={{
        fontSize: "clamp(2.6rem, calc(var(--pw) * 0.12 * 1px), 5.8rem)",
        lineHeight: 0.9,
      }}
    >
      <span className="leading-none" style={{ letterSpacing: "0.02em" }}>
        关于
      </span>
      <span className="leading-none" style={{ letterSpacing: "0.02em", marginTop: "0.08em" }}>
        迷蔻紫的一切
      </span>
    </h1>
  );
}
