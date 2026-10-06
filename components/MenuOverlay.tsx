"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

const items = [
  { num: "01", label: "HOME", href: "#top" },
  { num: "02", label: "ABOUT", href: "#about" },
  { num: "03", label: "SENIOR DESIGN", href: "#senior-design" },
  { num: "04", label: "WORK", href: "#work" },
  { num: "05", label: "EXPERIENCE", href: "#experience" },
  { num: "06", label: "SKILLS", href: "#skills" },
  { num: "07", label: "DOCUMENTS", href: "#documents" },
  { num: "08", label: "CONTACT", href: "#contact" },
];

export default function MenuOverlay({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="menuOverlay">
      <div className="menuHeader mono">
        <span>Cooper</span>
        <button type="button" onClick={onClose} aria-label="Close navigation menu">
          Close
        </button>
      </div>
      <nav className="menuNav">
        {items.map((item) => (
          <a key={item.num} href={item.href} onClick={onClose} className="menuRow">
            <span className="menuNum mono">{item.num}</span>
            <span className="menuLabel">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="menuFooter mono">
        <a href="https://github.com/34coopatroopa">GitHub ↗</a>
        <a href="mailto:cjhoy@iastate.edu">Email ↗</a>
        <a href="/uploads/Cooper_Hoy_Resume.pdf">Résumé ↗</a>
      </div>
    </div>
  );
}
