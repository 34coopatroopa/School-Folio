"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function DogEasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="eggTrigger"
        onClick={() => setOpen(true)}
        aria-label="A secret"
      >
        ·
      </button>
      {open &&
        createPortal(
          <div className="eggOverlay" onClick={() => setOpen(false)}>
            <div className="eggModal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="eggClose mono"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
              <p className="eggLabel mono">Not infrastructure. Just the dogs.</p>
              <div className="eggImages">
                {/* eslint-disable-next-line @next/next/no-img-element -- small fixed-size modal images, next/image sizing not worth it here */}
                <img src="/photos/dog-1.jpg" alt="Cooper's first dog" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photos/dog-2.jpg" alt="Cooper's second dog" loading="lazy" />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
