"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import MenuOverlay from "@/components/MenuOverlay";
import CursorChip from "@/components/CursorChip";
import GridOverlay from "@/components/GridOverlay";
import Clock from "@/components/Clock";
import DogEasterEgg from "@/components/DogEasterEgg";
import SkillsNetwork from "@/components/SkillsNetwork";
import SeniorDesign from "@/components/SeniorDesign";
import Accordion from "@/components/Accordion";
import DocChips from "@/components/DocChips";
import { useRevealAll } from "@/hooks/useRevealAll";
import { projects, experience, contactLinks, photos, photoPool, careerObjective } from "@/lib/content";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headedOpen, setHeadedOpen] = useState(false);
  const [scenePhotos, setScenePhotos] = useState<{ hero: string; about: string }>({
    hero: photos.ridgelines,
    about: photos.overcast,
  });

  useRevealAll();

  useEffect(() => {
    // Client-only randomization: the SSR/first-paint values above must stay
    // fixed so hydration matches, then we reshuffle once mounted.
    const [hero, about] = shuffle(photoPool);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScenePhotos({ hero, about });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div data-root="1">
      <Nav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      <CursorChip />

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <Image
            className="bgPhoto"
            src={scenePhotos.hero}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
          />
          <div className="bgGradient" aria-hidden="true" />
          <GridOverlay tone="ink" alpha={0.13} />

          <div className="heroMeta reveal">
            <div>
              <p className="heroMetaLabel mono">Based in</p>
              <p className="heroMetaValue mono">Ames, Iowa</p>
            </div>
            <div>
              <p className="heroMetaLabel mono">Focus</p>
              <p className="heroMetaValue mono">Infrastructure / Security</p>
            </div>
            <div>
              <p className="heroMetaLabel mono">Status</p>
              <p className="heroMetaValue mono">Building</p>
            </div>
          </div>

          <div className="heroStatement reveal">
            <h1 className="heroH1">
              Engineering systems
              <br />
              &amp; security
            </h1>
            <a href="#work" className="heroCta mono">
              Selected work ↓
            </a>
          </div>

          <div className="wordmarkWrap">
            <p className="wordmark">Cooper Hoy</p>
          </div>
        </section>

        {/* About + where I'm headed */}
        <section id="about" className="about">
          {/* eslint-disable-next-line @next/next/no-img-element -- custom 78%-height mask can't use next/image's fill sizing */}
          <img className="bandPhoto" src={scenePhotos.about} alt="" aria-hidden="true" loading="lazy" />
          <GridOverlay tone="paper" alpha={0.09} />
          <div className="aboutGrid">
            <div className="reveal">
              <p className="aboutLabel mono">(About)</p>
              <h2 className="aboutHeading">I like creating things that make an impact</h2>
            </div>
            <div className="aboutBodyCol reveal">
              <p>
                I work across software engineering, infrastructure, cybersecurity, networking,
                and computer architecture. My projects range from encryption tools and trading
                platforms to network security tooling, custom processors, and hardware built
                for the field.
              </p>
              <p>
                By day, that&rsquo;s infrastructure engineering at QCI and leading a
                fifteen-person technical team at Iowa State. By night, it&rsquo;s usually a
                half-finished processor or whatever currently has its case open on my desk.
              </p>
              <div className={`headed${headedOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="aboutLink mono headedToggle"
                  aria-expanded={headedOpen}
                  aria-controls="headed-body"
                  onClick={() => setHeadedOpen((v) => !v)}
                >
                  Where I&rsquo;m headed <span className="headedPlus" aria-hidden="true">+</span>
                </button>
                <div id="headed-body" className="headedBody" inert={!headedOpen}>
                  <div className="accInner">
                    <div className="headedText">
                      {careerObjective.map((para, i) => (
                        <p key={para} style={{ transitionDelay: `${headedOpen ? 120 + i * 90 : 0}ms` }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="aboutCloser reveal">
            <p>Delivering change</p>
          </div>
        </section>

        {/* Senior Design */}
        <section id="senior-design" className="work seniorDesign">
          <GridOverlay tone="ink" alpha={0.07} />
          <p className="sectionLabel on-ink mono reveal">(01) — Senior Design</p>
          <div className="reveal">
            <SeniorDesign />
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="work">
          <GridOverlay tone="ink" alpha={0.07} />
          <div className="sectionHeader workHeader reveal">
            <div>
              <p className="sectionLabel on-ink mono">(02) — Work</p>
              <h2 className="sectionHeading">Selected work</h2>
            </div>
            <p className="support">Hover for the gist. Click for the whole story.</p>
          </div>
          <div className="reveal">
            <Accordion
              tone="ink"
              items={projects.map((p) => ({
                id: p.num,
                head: (
                  <>
                    <span className="pnum mono">{p.num}</span>
                    <span className="ptitle">{p.title}</span>
                    <span className="pcategory mono">{p.category}</span>
                    <span className="pmeta mono">
                      <span className="year">{p.year}</span>
                      <span className="status">{p.status}</span>
                    </span>
                  </>
                ),
                peek: <p className="accPeekText">{p.description}</p>,
                body: (
                  <div className="caseGrid">
                    <div className="caseBlock caseBlockWide">
                      <p className="caseLead">{p.overview}</p>
                    </div>
                    <div className="caseBlock">
                      <p className="caseLabel mono">My role</p>
                      <p>{p.role}</p>
                    </div>
                    <div className="caseBlock">
                      <p className="caseLabel mono">What I learned</p>
                      <ul className="chipList">
                        {p.skills.map((sk) => (
                          <li key={sk}>{sk}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="caseBlock">
                      <p className="caseLabel mono">Resources</p>
                      <ul className="dotList">
                        {p.resources.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                      <p className="caseStack mono">{p.stack}</p>
                    </div>
                  </div>
                ),
              }))}
            />
          </div>
        </section>

        {/* Currently Building */}
        <section className="building">
          <div className="buildingHeader reveal">
            <p className="label">Currently</p>
            <p className="status">At QCI — Live</p>
          </div>
          <div className="buildingPanel reveal">
            <div className="dotMask" aria-hidden="true" />
            <div className="tickerViewport">
              <div className="tickerTrack">
                <span>
                  Infrastructure Engineering Intern — QCI — West Des Moines, IA ✦&nbsp;
                </span>
                <span aria-hidden="true">
                  Infrastructure Engineering Intern — QCI — West Des Moines, IA ✦&nbsp;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="experience">
          <GridOverlay tone="paper" alpha={0.07} />
          <div className="sectionHeader experienceHeader reveal">
            <div>
              <p className="sectionLabel on-paper mono">(03) — Experience</p>
              <h2 className="sectionHeading">Where I have worked</h2>
            </div>
            <p className="support">
              Open a role for duties and the technical and soft skills it built.
            </p>
          </div>
          <div className="reveal">
            <Accordion
              tone="paper"
              items={experience.map((row) => ({
                id: row.org,
                head: (
                  <>
                    <span className="expYear mono">{row.year}</span>
                    <span className="expOrg">{row.org}</span>
                    <span className="expRole">{row.role}</span>
                  </>
                ),
                peek: <p className="accPeekText">{row.body}</p>,
                body: row.duties ? (
                  <div className="caseGrid">
                    <div className="caseBlock caseBlockWide">
                      <p className="caseLabel mono">Duties &amp; projects</p>
                      <ul className="dotList">
                        {row.duties.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="caseBlock">
                      <p className="caseLabel mono">Technical</p>
                      <ul className="chipList">
                        {row.technical?.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="caseBlock">
                      <p className="caseLabel mono">Soft skills</p>
                      <ul className="chipList">
                        {row.soft?.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="caseLead">{row.body}</p>
                ),
              }))}
            />
          </div>
        </section>

        {/* Capabilities / Skills network */}
        <section id="skills" className="capabilities">
          <div className="sectionHeader capHeader reveal">
            <div>
              <p className="sectionLabel on-paper mono">(04) — Capabilities</p>
              <h2 className="sectionHeading">Systems I work with</h2>
            </div>
            <p className="support">
              No proficiency bars — hover or tap a node for what&rsquo;s actually behind it.
            </p>
          </div>
          <div className="reveal">
            <SkillsNetwork />
          </div>
        </section>

        {/* Contact + documents */}
        <section id="contact" className="contact">
          <GridOverlay tone="ink" alpha={0.07} />
          <div className="contactInner">
            <p className="contactLabel mono reveal">(05) — Contact</p>
            <h2 className="contactHeading reveal">Let&rsquo;s build something interesting</h2>
            <div className="contactLinks reveal">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} className="contactLink">
                  <span className="contactLinkLabel mono">{link.label}</span>
                  <span className="contactLinkValue">{link.value}</span>
                </a>
              ))}
            </div>
            <div id="documents" className="docsStrip reveal">
              <p className="docsLabel mono">Résumé &amp; papers</p>
              <DocChips />
            </div>
            <div className="contactCloser wordmarkWrap reveal">
              <p className="wordmark">Cooper Hoy</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footerGrid">
          <p className="footerCopy mono">
            Cooper Hoy © 2026 <DogEasterEgg />
          </p>
          <p className="footerTag">Engineered with curiosity and too many Linux terminals.</p>
          <div className="footerLinks mono">
            <a href="https://github.com/34coopatroopa">GitHub</a>
            <a href="mailto:cjhoy@iastate.edu">Email</a>
          </div>
          <Clock />
        </div>
      </footer>
    </div>
  );
}
