"use client";

type Props = {
  open: boolean;
  onClose: () => void;
};

const items = [
  { num: "01", label: "HOME", href: "#top" },
  { num: "02", label: "WORK", href: "#work" },
  { num: "03", label: "ABOUT", href: "#about" },
  { num: "04", label: "SKILLS", href: "#skills" },
  { num: "05", label: "CONTACT", href: "#contact" },
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
        <a href="#contact" onClick={onClose}>
          LinkedIn ↗
        </a>
        <a href="mailto:cjhoy@iastate.edu">Email ↗</a>
        <a href="#contact" onClick={onClose}>
          Résumé ↗
        </a>
      </div>
    </div>
  );
}
