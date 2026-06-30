interface AboutArchiveButtonProps {
  onClick?: () => void;
}

export function AboutArchiveButton({ onClick }: AboutArchiveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2 sm:gap-3 border-[3px] sm:border-4 border-[#0D0D0D] bg-[#0D0D0D] px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs sm:text-sm tracking-widest text-[#F5EDE0] uppercase shadow-[3px_3px_0_0_#D10000] sm:shadow-[4px_4px_0_0_#D10000] transition-all duration-200 hover:border-[#D10000] hover:bg-[#D10000] hover:shadow-[5px_5px_0_0_#0D0D0D] sm:hover:shadow-[6px_6px_0_0_#0D0D0D] hover:text-[#F5EDE0] cursor-pointer"
    >
      翻阅档案
      <span
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden
      >
        →
      </span>
    </button>
  );
}
