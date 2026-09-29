"use client";

import { useState } from "react";
import SkillIcon from "@/components/SkillIcon";
import { skillCore, skillNodes, type SkillNode } from "@/lib/content";

export default function SkillsNetwork() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const clear = (id: string) => setActiveId((v) => (v === id ? null : v));
  const active: SkillNode | null = skillNodes.find((n) => n.id === activeId) ?? null;

  const ring = skillNodes.map((n, i) => {
    const next = skillNodes[(i + 1) % skillNodes.length];
    return { id: `ring-${n.id}`, a: n, b: next };
  });
  const spokes = skillNodes.map((n) => ({
    id: `spoke-${n.id}`,
    a: skillCore,
    b: n,
    // label sits 78% of the way out from the core, near the device end
    labelX: skillCore.x + (n.x - skillCore.x) * 0.78,
    labelY: skillCore.y + (n.y - skillCore.y) * 0.78,
    port: n.port,
  }));

  return (
    <div className="skillsNetwork">
      <div className="skillsDiagramWrap">
        <div className="skillsDiagram">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="skillsLines"
            aria-hidden="true"
            focusable="false"
          >
            {ring.map((edge) => {
              const isActive = activeId !== null && (edge.a.id === activeId || edge.b.id === activeId);
              return (
                <line
                  key={edge.id}
                  x1={edge.a.x}
                  y1={edge.a.y}
                  x2={edge.b.x}
                  y2={edge.b.y}
                  className={`skillEdge skillEdge--ring${isActive ? " is-active" : ""}`}
                />
              );
            })}
            {spokes.map((edge) => {
              const isActive = activeId === edge.b.id;
              return (
                <line
                  key={edge.id}
                  x1={edge.a.x}
                  y1={edge.a.y}
                  x2={edge.b.x}
                  y2={edge.b.y}
                  className={`skillEdge skillEdge--spoke${isActive ? " is-active" : ""}`}
                />
              );
            })}
          </svg>

          {spokes.map((edge) => (
            <span
              key={edge.id}
              className={`skillPortTag mono${activeId === edge.b.id ? " is-active" : ""}`}
              style={{ left: `${edge.labelX}%`, top: `${edge.labelY}%` }}
              aria-hidden="true"
            >
              {edge.port}
            </span>
          ))}

          <div className="skillCore" style={{ left: `${skillCore.x}%`, top: `${skillCore.y}%` }} aria-hidden="true">
            <span className="mono">{skillCore.label}</span>
          </div>

          {skillNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`skillNode${activeId === node.id ? " is-active" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveId(node.id)}
              onMouseLeave={() => clear(node.id)}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => clear(node.id)}
              onClick={() => setActiveId(node.id)}
            >
              <SkillIcon kind={node.kind} className="skillNodeIcon" />
              <span className="skillNodeLabel mono">{node.label}</span>
            </button>
          ))}
        </div>
        <p className="skillsCaption mono" aria-hidden="true">
          Fig. 01 — Systems topology
        </p>
      </div>

      <div className="skillPanel" aria-live="polite">
        <p className="skillPanelLabel mono">{active ? active.label : "Systems map"}</p>
        {active ? (
          <ul className="skillPanelList">
            {active.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="skillPanelHint">
            Nine systems, one network. Hover or tap a node to see what I&rsquo;ve worked with.
          </p>
        )}
      </div>
    </div>
  );
}
