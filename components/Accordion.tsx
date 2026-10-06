"use client";

import { useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  /** Always-visible row content. */
  head: ReactNode;
  /** One-line teaser that slides in on hover/focus. */
  peek: ReactNode;
  /** Full detail, shown when the row is clicked open. */
  body: ReactNode;
};

type Props = {
  items: AccordionItem[];
  tone: "ink" | "paper";
};

/**
 * Hover peeks, click opens. Only one row is open at a time; height is
 * animated with the grid-template-rows 0fr → 1fr trick so content of any
 * length transitions smoothly without measuring.
 */
export default function Accordion({ items, tone }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className={`acc acc--${tone}`}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className={`accItem${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="accHead"
              data-project="1"
              aria-expanded={isOpen}
              aria-controls={`acc-${item.id}`}
              onClick={() => setOpen(isOpen ? null : item.id)}
            >
              {item.head}
              <span className="accIcon" aria-hidden="true" />
            </button>
            <div className="accPeek" aria-hidden="true">
              <div className="accInner">{item.peek}</div>
            </div>
            <div id={`acc-${item.id}`} className="accBody" role="region" inert={!isOpen}>
              <div className="accInner">
                <div className="accBodyContent">{item.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
