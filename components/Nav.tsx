"use client";

import { useEffect, useState } from "react";

type Props = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export default function Nav({ menuOpen, onToggleMenu }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <a href="#top" className="navWordmark mono">
        Cooper
      </a>
      <nav className="navLinks">
        <a href="#senior-design" className="navMuted mono">
          Sr Design
        </a>
        <a href="#work" className="navMuted mono">
          Work
        </a>
        <a href="#experience" className="navMuted mono">
          Experience
        </a>
        <a href="#documents" className="navMuted mono">
          Docs
        </a>
        <a href="#contact" className="navMuted mono">
          Contact
        </a>
      </nav>
      <button
        type="button"
        className="navMenuBtn mono"
        onClick={onToggleMenu}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <span className="navRule" aria-hidden="true" />
        Menu
      </button>
    </header>
  );
}
