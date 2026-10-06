"use client";

import { useId, type CSSProperties, type ReactNode } from "react";

/*
 * Mermaid-style animated diagrams for the Cicada senior design panel.
 * Nodes pop in and edges draw themselves on mount (CSS, staggered by --i);
 * packets ride the edges with SVG <animateMotion>.
 */

type Tone = "base" | "accent" | "ok" | "danger" | "muted";

const tones: Tone[] = ["base", "accent", "ok", "danger", "muted"];

function Canvas({ viewBox, label, children }: { viewBox: string; label: string; children: (arrow: (t: Tone) => string) => ReactNode }) {
  const uid = useId().replace(/:/g, "");
  const arrow = (t: Tone) => `url(#${uid}-${t})`;
  return (
    <svg className="dg" viewBox={viewBox} role="img" aria-label={label}>
      <defs>
        {tones.map((t) => (
          <marker
            key={t}
            id={`${uid}-${t}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" className={`dgArrow dg-${t}`} />
          </marker>
        ))}
      </defs>
      {children(arrow)}
    </svg>
  );
}

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone?: Tone;
  i?: number;
  badge?: string;
  pulse?: boolean;
  dashed?: boolean;
};

function Box({ x, y, w, h, label, sub, tone = "base", i = 0, badge, pulse, dashed }: BoxProps) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g className={`dgNode dg-${tone}${dashed ? " is-dashed" : ""}`} style={{ "--i": i } as CSSProperties}>
      {pulse && <rect className="dgPulse" x={x} y={y} width={w} height={h} rx={12} />}
      <rect className="dgBox" x={x} y={y} width={w} height={h} rx={12} />
      <text className="dgLabel" x={cx} y={sub ? cy - 3 : cy + 5} textAnchor="middle">
        {label}
      </text>
      {sub && (
        <text className="dgSub" x={cx} y={cy + 16} textAnchor="middle">
          {sub}
        </text>
      )}
      {badge && (
        <g className="dgBadge">
          <rect x={x + w - 58} y={y - 11} width={66} height={22} rx={11} />
          <text x={x + w - 25} y={y + 4} textAnchor="middle">
            {badge}
          </text>
        </g>
      )}
    </g>
  );
}

type EdgeProps = {
  d: string;
  arrow: (t: Tone) => string;
  tone?: Tone;
  i?: number;
  dashed?: boolean;
  packets?: number;
  dur?: number;
  fade?: boolean;
};

function Edge({ d, arrow, tone = "base", i = 0, dashed, packets = 0, dur = 2.4, fade }: EdgeProps) {
  return (
    <g className={`dgEdgeG dg-${tone}`} style={{ "--i": i } as CSSProperties}>
      <path className={`dgEdge${dashed ? " is-dashed" : ""}`} d={d} pathLength={1} markerEnd={arrow(tone)} />
      <g className="dgPackets">
        {Array.from({ length: packets }, (_, k) => (
          <circle key={k} className="dgPacket" r={4.5}>
            <animateMotion dur={`${dur}s`} begin={`-${(k * dur) / packets}s`} repeatCount="indefinite" path={d} />
            {fade && (
              <animate
                attributeName="opacity"
                values="1;1;0"
                keyTimes="0;0.8;1"
                dur={`${dur}s`}
                begin={`-${(k * dur) / packets}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </g>
    </g>
  );
}

function Note({ x, y, children, i = 0, anchor = "middle", tone = "muted" }: { x: number; y: number; children: ReactNode; i?: number; anchor?: "start" | "middle" | "end"; tone?: Tone }) {
  return (
    <text className={`dgNote dg-${tone}`} x={x} y={y} textAnchor={anchor} style={{ "--i": i } as CSSProperties}>
      {children}
    </text>
  );
}

/* 01 — how it works: nodes → LoRa → base station → dashboard + alerts */
export function HowItWorks() {
  return (
    <Canvas viewBox="0 0 800 430" label="Sensor nodes send readings over LoRa to a base station, which feeds a live dashboard and threshold alerts">
      {(arrow) => (
        <>
          <Edge arrow={arrow} d="M200 82 C 265 82, 265 200, 322 200" i={3} packets={2} dur={2.6} tone="accent" />
          <Edge arrow={arrow} d="M200 215 L 322 215" i={3} packets={2} dur={2.2} tone="accent" />
          <Edge arrow={arrow} d="M200 348 C 265 348, 265 230, 322 230" i={3} packets={2} dur={2.8} tone="accent" />
          <Edge arrow={arrow} d="M500 200 C 548 200, 548 120, 592 120" i={5} packets={1} dur={2} />
          <Edge arrow={arrow} d="M500 230 C 548 230, 548 310, 592 310" i={5} packets={1} dur={2} tone="danger" />

          <Box x={30} y={50} w={170} h={64} label="Node 01" sub="temp · humidity" i={0} badge="solar" />
          <Box x={30} y={183} w={170} h={64} label="Node 02" sub="wind · pressure" i={1} badge="solar" />
          <Box x={30} y={316} w={170} h={64} label="Node 03" sub="smoke particulates" i={2} badge="solar" />
          <Note x={262} y={206} i={4} tone="accent">
            LoRa
          </Note>
          <Box x={326} y={175} w={174} h={80} label="Base station" sub="parse · log · forward" tone="accent" i={4} />
          <Box x={596} y={86} w={180} h={68} label="Live dashboard" sub="readings · map · history" i={6} />
          <Box x={596} y={276} w={180} h={68} label="Threshold alert" sub="responders & landowners" tone="danger" i={7} pulse />
        </>
      )}
    </Canvas>
  );
}

/* 02 — my role: packet format first, three sub-teams, I run cyber */
export function TeamPlan() {
  return (
    <Canvas viewBox="0 0 800 470" label="Team plan: a shared packet format, then hardware, software and cyber tracks converging on the semester one deliverable; Cooper leads the cyber track">
      {(arrow) => (
        <>
          <Edge arrow={arrow} d="M400 78 C 400 104, 140 100, 140 122" i={2} packets={1} dur={1.8} tone="accent" />
          <Edge arrow={arrow} d="M400 78 L 400 122" i={2} packets={1} dur={1.8} tone="accent" />
          <Edge arrow={arrow} d="M400 78 C 400 104, 660 100, 660 122" i={2} packets={1} dur={1.8} tone="accent" />
          {[140, 400, 660].map((x) => (
            <g key={x}>
              <Edge arrow={arrow} d={`M${x} 176 L ${x} 208`} i={5} />
              <Edge arrow={arrow} d={`M${x} 262 L ${x} 294`} i={7} />
            </g>
          ))}
          <Edge arrow={arrow} d="M240 149 L 296 149" i={4} dashed tone="muted" />
          <Edge arrow={arrow} d="M560 149 L 504 149" i={4} dashed tone="muted" />
          <Edge arrow={arrow} d="M140 348 C 140 372, 300 368, 300 386" i={9} packets={1} dur={2} />
          <Edge arrow={arrow} d="M400 348 L 400 386" i={9} packets={1} dur={2} />
          <Edge arrow={arrow} d="M660 348 C 660 372, 500 368, 500 386" i={9} packets={1} dur={2} />

          <Box x={270} y={14} w={260} h={64} label="Packet format" sub="agreed by all three teams first" tone="accent" i={0} />
          <Box x={40} y={124} w={200} h={52} label="Hardware" i={3} />
          <Box x={300} y={124} w={200} h={52} label="Software" i={3} />
          <Box x={560} y={124} w={200} h={52} label="Cyber" tone="accent" i={3} badge="me" />
          <Note x={268} y={140} i={4}>MCU</Note>
          <Note x={532} y={140} i={4}>reqs</Note>
          <Box x={40} y={210} w={200} h={52} label="Node design" sub="MCU · sensors · power" i={6} />
          <Box x={300} y={210} w={200} h={52} label="Base receiver" sub="radio loop · parsing" i={6} />
          <Box x={560} y={210} w={200} h={52} label="Threat model" sub="spoofing · jamming" tone="accent" i={6} />
          <Box x={40} y={296} w={200} h={52} label="Assembly & bench test" i={8} />
          <Box x={300} y={296} w={200} h={52} label="Dashboard & alerts" i={8} />
          <Box x={560} y={296} w={200} h={52} label="HMAC auth design" sub="keys on the node" tone="accent" i={8} />
          <Box x={200} y={388} w={400} h={64} label="Semester 1 deliverable" sub="one node → base station → live dashboard" tone="ok" i={10} />
        </>
      )}
    </Canvas>
  );
}

/* 03 — what I learned: authenticated packets pass, spoofed ones are dropped */
export function ThreatModel() {
  return (
    <Canvas viewBox="0 0 800 420" label="Threat model: signed packets pass the HMAC check to the base station; spoofed packets are dropped and jamming is detected">
      {(arrow) => (
        <>
          <Edge arrow={arrow} d="M200 208 L 346 208" i={3} packets={2} dur={2} tone="ok" />
          <Edge arrow={arrow} d="M450 208 L 596 208" i={4} packets={2} dur={2} tone="ok" />
          <Edge arrow={arrow} d="M400 82 L 400 150" i={5} packets={1} dur={1.6} tone="danger" fade />
          <Edge arrow={arrow} d="M400 338 L 400 268" i={5} dashed tone="danger" />

          <Box x={30} y={170} w={170} h={76} label="Sensor node" sub="signs every packet" i={0} />
          <Box x={350} y={156} w={100} h={108} label="HMAC" sub="verify" tone="accent" i={2} pulse />
          <Box x={600} y={170} w={170} h={76} label="Base station" sub="accepts only valid" tone="ok" i={1} />
          <Box x={310} y={20} w={180} h={62} label="Attacker" sub="spoofed “all clear”" tone="danger" i={6} dashed />
          <Box x={310} y={338} w={180} h={62} label="Jammer" sub="floods the channel" tone="danger" i={6} dashed />
          <Note x={524} y={194} i={5} tone="ok">✓ authentic</Note>
          <g className="dgBlink" style={{ "--i": 7 } as CSSProperties}>
            <Note x={414} y={124} anchor="start" tone="danger" i={7}>
              ✕ dropped
            </Note>
          </g>
          <Note x={414} y={308} anchor="start" tone="danger" i={7}>
            detect → alert
          </Note>
        </>
      )}
    </Canvas>
  );
}

/* 04 — why it matters: ground sensors beat a satellite pass */
export function Race() {
  return (
    <Canvas viewBox="0 0 800 320" label="Timeline: from ignition, a satellite pass can take hours or miss a small fire, while Cicada's ground sensors raise an alert within minutes">
      {() => (
        <>
          <g className="dgNode" style={{ "--i": 0 } as CSSProperties}>
            <line className="dgIgnite" x1={160} y1={40} x2={160} y2={276} />
            <circle className="dgFlame" cx={160} cy={32} r={7} />
            <text className="dgNote dg-accent" x={176} y={36}>
              ignition
            </text>
          </g>

          <g className="dgNode" style={{ "--i": 1 } as CSSProperties}>
            <text className="dgLabel" x={20} y={100}>Satellite</text>
            <text className="dgSub" x={20} y={118} textAnchor="start">periodic pass</text>
            <rect className="dgTrack" x={160} y={88} width={610} height={18} rx={9} />
            <rect className="dgBar dgBarSlow" x={160} y={88} width={610} height={18} rx={9} />
            <text className="dgNote dg-base" x={770} y={134} textAnchor="end">
              hours, or a small fire is missed
            </text>
          </g>

          <g className="dgNode" style={{ "--i": 2 } as CSSProperties}>
            <text className="dgLabel" x={20} y={210}>Cicada</text>
            <text className="dgSub" x={20} y={228} textAnchor="start">ground sensors</text>
            <rect className="dgTrack" x={160} y={198} width={610} height={18} rx={9} />
            <rect className="dgBar dgBarFast" x={160} y={198} width={610} height={18} rx={9} />
            <g className="dgPop">
              <rect className="dgPopBox" x={290} y={182} width={150} height={50} rx={12} />
              <text className="dgLabel" x={365} y={204} textAnchor="middle">Alert ✓</text>
              <text className="dgSub" x={365} y={222} textAnchor="middle">within minutes</text>
            </g>
          </g>

          <g className="dgNode" style={{ "--i": 3 } as CSSProperties}>
            <line className="dgAxis" x1={160} y1={276} x2={770} y2={276} />
            <text className="dgSub" x={160} y={298} textAnchor="middle">0</text>
            <text className="dgSub" x={270} y={298} textAnchor="middle">minutes</text>
            <text className="dgSub" x={770} y={298} textAnchor="end">hours</text>
          </g>
        </>
      )}
    </Canvas>
  );
}

/* 05 — roadmap */
export function Roadmap() {
  return (
    <Canvas viewBox="0 40 800 170" label="Roadmap: semester one end-to-end deliverable, semester two authentication and final design, then stretch goals of a map view and NASA FIRMS overlay">
      {(arrow) => (
        <>
          <Edge arrow={arrow} d="M240 130 L 291 130" i={2} packets={1} dur={1.4} tone="accent" />
          <Edge arrow={arrow} d="M505 130 L 556 130" i={4} dashed tone="muted" />
          <Box x={30} y={84} w={210} h={92} label="Semester 1" sub="node → base → dashboard" tone="accent" i={0} badge="now" pulse />
          <Box x={295} y={84} w={210} h={92} label="Semester 2" sub="HMAC auth · final design" i={3} />
          <Box x={560} y={84} w={210} h={92} label="Stretch" sub="map view · NASA FIRMS" tone="muted" dashed i={5} />
        </>
      )}
    </Canvas>
  );
}
