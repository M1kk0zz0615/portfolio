const TITLE_CHARS = ["关", "于", "我", "的", "一", "切"] as const;

export function AboutPosterTitle() {
  return (
    <h1
      className="type-display title-depth flex text-[var(--fg)] select-none whitespace-nowrap"
      data-text="关于我的一切"
      style={{
        fontSize: "clamp(3rem, 6.5cqw, 6rem)",
        gap: "0.04em 0.18em",
        lineHeight: 1.0,
      }}
    >
      {TITLE_CHARS.map((char) => (
        <span key={char} className="leading-none">{char}</span>
      ))}
    </h1>
  );
}
