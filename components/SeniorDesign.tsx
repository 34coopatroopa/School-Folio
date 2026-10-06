"use client";

import { useState, type ComponentType } from "react";
import { seniorDesign } from "@/lib/content";
import { HowItWorks, TeamPlan, ThreatModel, Race, Roadmap } from "@/components/CicadaDiagrams";

type TabId = "overview" | "role" | "skills" | "impact" | "docs";

const tabs: { id: TabId; label: string; Diagram: ComponentType }[] = [
  { id: "overview", label: "How it works", Diagram: HowItWorks },
  { id: "role", label: "My role", Diagram: TeamPlan },
  { id: "skills", label: "What I learned", Diagram: ThreatModel },
  { id: "impact", label: "Why it matters", Diagram: Race },
  { id: "docs", label: "Roadmap & docs", Diagram: Roadmap },
];

export default function SeniorDesign() {
  const [active, setActive] = useState<TabId>("overview");
  const index = tabs.findIndex((t) => t.id === active);
  const current = tabs[index];

  return (
    <div className="sd">
      <div className="sdRail">
        <div className="sdTitleRow">
          <span className="sdPing" aria-hidden="true">
            <span />
          </span>
          <h2 className="sdTitle">{seniorDesign.title}</h2>
        </div>
        <p className="sdSub mono">
          {seniorDesign.subtitle} · {seniorDesign.year}
        </p>
        <a className="miniChip mono sdTeamLink" href={seniorDesign.teamSite} target="_blank" rel="noreferrer">
          Team site · sdmay27-34 ↗
        </a>

        <div className="sdTabs" role="tablist" aria-label="Cicada senior design">
          <span
            className="sdTabIndicator"
            aria-hidden="true"
            style={{ transform: `translateY(${index * 100}%)` }}
          />
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`sd-tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls="sd-panel"
              className={`sdTab${active === t.id ? " is-active" : ""}`}
              onMouseEnter={() => setActive(t.id)}
              onFocus={() => setActive(t.id)}
              onClick={() => setActive(t.id)}
            >
              <span className="sdTabNum mono">0{i + 1}</span>
              <span className="sdTabLabel">{t.label}</span>
              <span className="sdTabArrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="sdStage">
        <div key={`canvas-${active}`} className="sdCanvas">
          <current.Diagram />
        </div>

        <div
          key={active}
          id="sd-panel"
          role="tabpanel"
          aria-labelledby={`sd-tab-${current.id}`}
          className="sdPanel"
        >
          {active === "overview" && <p>{seniorDesign.description}</p>}
          {active === "role" && <p>{seniorDesign.role}</p>}
          {active === "skills" && (
            <ul className="chipList">
              {seniorDesign.skills.map((s, i) => (
                <li key={s} style={{ animationDelay: `${i * 60}ms` }}>
                  {s}
                </li>
              ))}
            </ul>
          )}
          {active === "impact" && <p>{seniorDesign.bigPicture}</p>}
          {active === "docs" && (
            <div className="docRow">
              {seniorDesign.docs.map((d, i) => (
                <a
                  key={d.href}
                  href={d.href}
                  target="_blank"
                  rel="noreferrer"
                  className="miniChip mono"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {d.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
