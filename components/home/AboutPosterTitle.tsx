const TITLE_CHARS = ["关", "于", "迷", "蔻", "紫", "的", "一", "切"] as const;

export function AboutPosterTitle() {
  return (
    <h1
      className="type-display title-depth flex text-[var(--fg)] select-none whitespace-nowrap"
      data-text="关于迷蔻紫的一切"
      style={{
        fontSize: "clamp(2.2rem, calc(var(--pw) * 0.12 * 1px), 5rem)",
        gap: "0.04em 0.16em",
        lineHeight: 1.0,
      }}
    >
      {TITLE_CHARS.map((char) => (
        <span key={char} className="leading-none">{char}</span>
      ))}
    </h1>
  );
}
