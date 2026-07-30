interface SectionLabelProps {
  children: React.ReactNode;
  centered?: boolean;
}

export default function SectionLabel({ children, centered = false }: SectionLabelProps) {
  return (
    <div className={centered ? "text-center" : "text-left"}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8862E]">{children}</p>
      <div className={`mt-3 flex items-center gap-2 ${centered ? "justify-center" : "justify-start"}`}>
        <span className="h-px w-6 bg-[#C9A050]" />
        <span className="size-1.5 rotate-45 bg-[#C9A050]" />
        <span className="h-px w-6 bg-[#C9A050]" />
      </div>
    </div>
  );
}
