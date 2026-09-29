"use client";

import { useEffect, useState } from "react";

export default function CursorChip() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setPos({ x: e.clientX + 18, y: e.clientY - 10 });
    };
    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest("[data-project]")) setVisible(true);
    };
    const onLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!(target instanceof HTMLElement)) return;
      if (target.closest("[data-project]")) setVisible(false);
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerenter", onEnter, true);
    document.addEventListener("pointerleave", onLeave, true);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerenter", onEnter, true);
      document.removeEventListener("pointerleave", onLeave, true);
    };
  }, []);

  return (
    <div
      className={`cursorChip mono${visible ? " is-visible" : ""}`}
      aria-hidden="true"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      View case study
    </div>
  );
}
