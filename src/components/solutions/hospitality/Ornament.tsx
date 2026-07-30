interface OrnamentProps {
  centered?: boolean;
}

export default function Ornament({ centered = false }: OrnamentProps) {
  return (
    <div className={`flex items-center gap-2 ${centered ? "justify-center" : "justify-start"}`} aria-hidden="true">
      <span className="h-px w-7 bg-[#C9A050]" />
      <span className="size-1.5 rotate-45 bg-[#C9A050]" />
      <span className="h-px w-7 bg-[#C9A050]" />
    </div>
  );
}
