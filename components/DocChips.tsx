import { documents } from "@/lib/content";

/** Résumé, reflections, and papers: small chips, detail on hover/focus. */
export default function DocChips() {
  return (
    <ul className="docChips">
      {documents.map((d) => {
        const pending = !d.href;
        const chip = (
          <>
            <span className="docChipKind mono">{d.kind}</span>
            <span className="docChipTitle">{d.title}</span>
            <span className="docChipGlyph mono" aria-hidden="true">
              {pending ? "…" : d.kind === "Résumé" ? "↓" : "↗"}
            </span>
          </>
        );
        return (
          <li key={d.title} className={`docChip${pending ? " is-pending" : ""}`}>
            {pending ? (
              <span className="docChipFace" tabIndex={0}>
                {chip}
              </span>
            ) : (
              <a className="docChipFace" href={d.href!} target="_blank" rel="noreferrer">
                {chip}
              </a>
            )}
            <span className="docPop" role="tooltip">
              <span className="docPopSummary">{d.summary}</span>
              {d.meta?.map((m) => (
                <span key={m} className="docPopMeta mono">
                  {m}
                </span>
              ))}
              {pending && <span className="docPopMeta mono">Coming soon</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
