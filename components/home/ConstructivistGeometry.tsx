"use client";

type ConstructivistGeometryProps = {
  className?: string;
};

export function ConstructivistGeometry({
  className = "",
}: ConstructivistGeometryProps) {
  return (
    <div
      className={`group/geo relative aspect-square w-full max-w-md select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 border-4 border-[var(--paper-cream)]/90 transition-colors duration-200 group-hover/geo:border-[#FF2200]"
      />

      <div
        className="absolute left-0 top-0 h-full w-1/2 bg-[var(--paper-cream)]/15 transition-transform duration-300 group-hover/geo:-translate-x-2"
      />

      <div
        className="absolute right-[12%] top-[18%] size-20 rounded-full bg-[#FF2200] transition-all duration-300 group-hover/geo:scale-110 md:size-28"
      />

      <div
        className="absolute bottom-[22%] left-[8%] h-3 w-32 -rotate-12 bg-[var(--fg)] transition-all duration-300 group-hover/geo:translate-x-3 group-hover/geo:rotate-0 md:w-40"
      />

      <div
        className="absolute bottom-[30%] right-[20%] size-16 border-4 border-[var(--paper-cream)] bg-[var(--paper-cream)] transition-all duration-300 group-hover/geo:translate-y-2 group-hover/geo:border-[#FF2200]"
      />

      <div className="absolute inset-4 border border-[var(--paper-cream)]/25 transition-opacity duration-300 group-hover/geo:opacity-0" />
      <div
        className="absolute left-1/2 top-4 bottom-4 w-px bg-[var(--paper-cream)]/20 transition-opacity duration-300 group-hover/geo:opacity-0"
      />
    </div>
  );
}
