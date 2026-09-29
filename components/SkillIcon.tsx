import type { ReactNode } from "react";
import type { SkillKind } from "@/lib/content";

type Props = {
  kind: SkillKind;
  className?: string;
};

const paths: Record<SkillKind, ReactNode> = {
  switch: (
    <>
      <rect x="3" y="8" width="18" height="7" rx="1" />
      <line x1="6" y1="15" x2="6" y2="19" />
      <line x1="10" y1="15" x2="10" y2="19" />
      <line x1="14" y1="15" x2="14" y2="19" />
      <line x1="18" y1="15" x2="18" y2="19" />
    </>
  ),
  firewall: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <line x1="4" y1="9.3" x2="20" y2="9.3" />
      <line x1="4" y1="14.7" x2="20" y2="14.7" />
      <line x1="12" y1="4" x2="12" y2="9.3" />
      <line x1="8" y1="9.3" x2="8" y2="14.7" />
      <line x1="16" y1="9.3" x2="16" y2="14.7" />
      <line x1="12" y1="14.7" x2="12" y2="20" />
    </>
  ),
  server: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
      <circle cx="8" cy="6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8" cy="18" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6 V18 C4 19.7 7.6 21 12 21 C16.4 21 20 19.7 20 18 V6" />
      <path d="M4 12 C4 13.7 7.6 15 12 15 C16.4 15 20 13.7 20 12" />
    </>
  ),
  code: (
    <>
      <path d="M9 6 L4 12 L9 18" />
      <path d="M15 6 L20 12 L15 18" />
    </>
  ),
  pc: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </>
  ),
  security: (
    <>
      <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" />
      <path d="M8.5 12 L11 14.5 L16 9" />
    </>
  ),
  cloud: (
    <>
      <rect x="5" y="13" width="14" height="6" rx="3" />
      <circle cx="9" cy="10" r="3.2" />
      <circle cx="13.5" cy="8.5" r="4" />
      <circle cx="17" cy="11" r="2.6" />
    </>
  ),
  hardware: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <line x1="9" y1="3" x2="9" y2="7" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="15" y1="3" x2="15" y2="7" />
      <line x1="9" y1="17" x2="9" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="15" y1="17" x2="15" y2="21" />
      <line x1="3" y1="9" x2="7" y2="9" />
      <line x1="3" y1="15" x2="7" y2="15" />
      <line x1="17" y1="9" x2="21" y2="9" />
      <line x1="17" y1="15" x2="21" y2="15" />
    </>
  ),
};

export default function SkillIcon({ kind, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}
