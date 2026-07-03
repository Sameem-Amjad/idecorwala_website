import React from "react";
import { BlogContent, BlogBlock } from "@/lib/supabaseClient";
import styles from "./ThoughtLeadership.module.css";

interface BlogRendererProps {
  content: BlogContent | null;
}

export default function BlogRenderer({ content }: BlogRendererProps) {
  if (!content || !Array.isArray(content.blocks)) {
    return null;
  }

  const renderBlock = (block: BlogBlock, index: number) => {
    switch (block.type) {
      case "heading": {
        const level = Math.max(1, Math.min(6, block.level));
        const headingClasses = {
          1: "font-serif text-[32px] sm:text-[40px] font-bold text-[#761416] mb-6 mt-10 leading-tight",
          2: "font-serif text-[28px] sm:text-[34px] font-semibold text-[#761416] mb-5 mt-8 leading-snug",
          3: "font-serif text-[22px] sm:text-[26px] font-semibold text-[#761416] mb-4 mt-6 leading-snug",
          4: "font-sans text-[18px] sm:text-[20px] font-bold text-[#2E2C28] mb-3 mt-5",
          5: "font-sans text-[16px] sm:text-[18px] font-bold text-[#2E2C28] mb-2 mt-4 uppercase tracking-wider",
          6: "font-sans text-[14px] sm:text-[15px] font-bold text-[#6E6B64] mb-2 mt-4 uppercase tracking-widest",
        }[level as 1 | 2 | 3 | 4 | 5 | 6] || "font-serif text-[24px] font-semibold text-[#761416] mb-4 mt-6";

        const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        return (
          <Tag key={index} className={headingClasses}>
            {block.text}
          </Tag>
        );
      }

      case "paragraph":
        return (
          <p key={index} className="font-sans text-[15px] sm:text-[16px] leading-[1.75] text-[#4D4740] mb-6">
            {block.text}
          </p>
        );

      case "bullet_list":
        return (
          <ul key={index} className="list-disc pl-8 mb-7 space-y-3 font-sans text-[15px] sm:text-[16px] leading-[1.7] text-[#4D4740]">
            {block.items.map((item, i) => (
              <li key={i} className="pl-1">{item}</li>
            ))}
          </ul>
        );

      case "numbered_list":
        return (
          <ol key={index} className="list-decimal pl-8 mb-7 space-y-3 font-sans text-[15px] sm:text-[16px] leading-[1.7] text-[#4D4740]">
            {block.items.map((item, i) => (
              <li key={i} className="pl-1">{item}</li>
            ))}
          </ol>
        );

      case "quote":
        return (
          <blockquote key={index} className="border-l-4 border-[#8B1A1A] pl-6 my-9 py-1 italic font-serif text-[18px] sm:text-[22px] text-[#2B231D] leading-[1.65]">
            “{block.text}”
          </blockquote>
        );

      case "divider":
        return (
          <hr key={index} className="my-10 border-t border-[rgba(201,168,76,0.25)]" />
        );

      case "callout":
        return (
          <div key={index} className={styles.blogCallout}>
            {block.title && (
              <h5 className="font-bold text-[#761416] text-[14px] sm:text-[15px] tracking-wide uppercase">
                {block.title}
              </h5>
            )}
            <p className="text-[14px] sm:text-[15px] text-[#5C564F] leading-[1.6]">
              {block.text}
            </p>
          </div>
        );

      case "image":
        return (
          <figure key={index} className={`${styles.blogImage} flex flex-col items-center w-full`}>
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[16px] border border-[rgba(201,168,76,0.15)] bg-[#FAF6EE]">
              <img
                src={block.src}
                alt={block.alt || ""}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              />
            </div>
            {block.caption && (
              <figcaption className="mt-3 text-[12px] sm:text-[13px] text-[#8C8880] italic text-center font-sans">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      default:
        // Safely ignore unsupported block types as per specifications
        return null;
    }
  };

  return <div className="blog-body w-full">{content.blocks.map(renderBlock)}</div>;
}
