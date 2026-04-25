// PortfolioLight — Editorial, Apple-native inspired, light theme
const { useState, useEffect, useRef } = React;

function AppIcon({ name, accent, size = 88, slotId }) {
  const [failed, setFailed] = React.useState(false);
  return (
    <div
      className="app-icon"
      style={{
        width: size, height: size,
        borderRadius: size * 0.22,
        background: failed ? `linear-gradient(145deg, ${accent}, ${shade(accent, -18)})` : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff",
        fontFamily: "'SF Pro Display', -apple-system, system-ui, sans-serif",
        fontWeight: 700, fontSize: size * 0.42, letterSpacing: "-0.02em",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15)",
        flexShrink: 0, overflow: "hidden", position: "relative",
      }}
    >
      {!failed ? (
        <img
          src={`assets/icons/${slotId}.png`}
          alt={`${name} app icon`}
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : name.slice(0, 1)}
    </div>
  );
}

function AppIconPlaceholder({ name, accent, size = 88 }) {
  const slotId = name.toLowerCase().replace(/\s+/g, "-");
  return <AppIcon name={name} accent={accent} size={size} slotId={slotId} />;
}

function shade(hex, percent) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const adj = (c) => Math.max(0, Math.min(255, Math.round(c + (percent / 100) * 255)));
  return `#${[adj(r), adj(g), adj(b)].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function PhonePlaceholder({ accent, label, slotId }) {
  const [failed, setFailed] = React.useState(false);
  return (
    <div className="phone-ph" data-slot={slotId}>
      <div className="phone-ph-frame">
        <div className="phone-ph-screen" style={{ background: failed ? `linear-gradient(180deg, ${accent}14, ${accent}06 40%, #fff)` : "#000" }}>
          {!failed ? (
            <img
              src={`assets/screens/${slotId}.png`}
              alt=""
              onError={() => setFailed(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <React.Fragment>
              <div className="phone-ph-notch" />
              <div className="phone-ph-stripes" />
              <div className="phone-ph-hint">
                <span className="mono">drop screen →</span>
                <span className="mono-sm">assets/screens/{slotId}.png</span>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button
        className={lang === "en" ? "on" : ""}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <span className="sep">/</span>
      <button
        className={lang === "fr" ? "on" : ""}
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
    </div>
  );
}

function PortfolioLight({ lang, setLang }) {
  const c = window.CONTENT[lang];
  const year = "2026";

  return (
    <div className="pf-light">
      {/* top bar */}
      <header className="pf-top">
        <div className="pf-top-inner">
          <a href="#top" className="pf-mark">
            <span className="mark-dot" />
            <span className="mark-name">Haifa Ben Letaifa</span>
          </a>
          <nav className="pf-nav">
            <a href="#experience">{c.nav.work}</a>
            <a href="#apps">{c.nav.apps}</a>
            <a href="#openbridge">OSS</a>
            <a href="#about">{c.nav.about}</a>
            <a href="#contact">{c.nav.contact}</a>
          </nav>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* hero */}
      <section className="pf-hero" id="top">
        <div className="pf-hero-grid">
          <div className="pf-hero-status">
            <span className="status-dot" />
            <span className="mono">{c.hero.available}</span>
          </div>
          <div className="pf-hero-eyebrow mono">{c.hero.eyebrow}</div>
          <h1 className="pf-hero-name">{c.hero.name}</h1>
          <p className="pf-hero-tagline">{c.hero.tagline}</p>
          <p className="pf-hero-sub">{c.hero.sub}</p>
          <div className="pf-hero-ctas">
            <a className="btn btn-primary" href="assets/cv/haifa-ben-letaifa-cv-en.pdf" download>
              <span>{c.hero.cta}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 2v8m0 0L3.5 6.5M7 10l3.5-3.5M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a className="btn btn-ghost" href="#contact">{c.hero.secondary}</a>
          </div>
        </div>

        <div className="pf-hero-meta">
          <div className="meta-item">
            <div className="meta-num">120M+</div>
            <div className="meta-label mono">{lang === "en" ? "users reached" : "utilisateurs"}</div>
          </div>
          <div className="meta-item">
            <div className="meta-num">40+</div>
            <div className="meta-label mono">{lang === "en" ? "countries" : "pays"}</div>
          </div>
          <div className="meta-item">
            <div className="meta-num">3</div>
            <div className="meta-label mono">{lang === "en" ? "indie apps shipped" : "apps publiées"}</div>
          </div>
          <div className="meta-item">
            <div className="meta-num">8+</div>
            <div className="meta-label mono">{lang === "en" ? "years iOS" : "ans iOS"}</div>
          </div>
        </div>
      </section>

      {/* apps */}
      <section className="pf-section" id="apps">
        <div className="pf-section-head">
          <div className="section-label mono">02 / {c.sections.apps}</div>
          <h2 className="section-title">
            {lang === "en" ? "Three apps. Shipped end-to-end." : "Trois apps. Livrées de bout en bout."}
          </h2>
        </div>
        <div className="pf-apps">
          {c.apps.map((app, i) => (
            <article className="app-card" key={app.name}>
              <div className="app-card-head">
                <AppIconPlaceholder name={app.name} accent={app.accent} />
                <div className="app-card-title">
                  <div className="app-index mono">0{i + 1}</div>
                  <h3>{app.name}</h3>
                  <div className="app-tagline">{app.tagline}</div>
                </div>
              </div>
              <div className="app-card-body">
                <div className="app-block">
                  <div className="app-block-label mono">{lang === "en" ? "Problem" : "Problème"}</div>
                  <p>{app.problem}</p>
                </div>
                <div className="app-block">
                  <div className="app-block-label mono">{lang === "en" ? "Role" : "Rôle"}</div>
                  <p>{app.role}</p>
                </div>
                <div className="app-block">
                  <div className="app-block-label mono">{lang === "en" ? "Stack" : "Stack"}</div>
                  <div className="chip-row">
                    {app.stack.map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="app-card-screens">
                <PhonePlaceholder accent={app.accent} slotId={`${app.name.toLowerCase().replace(/\s+/g, "-")}-1`} />
                <PhonePlaceholder accent={app.accent} slotId={`${app.name.toLowerCase().replace(/\s+/g, "-")}-2`} />
              </div>
              <a href={app.url} className="app-card-cta" style={{ color: app.accent }}>
                {app.storeLabel}
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* open source */}
      <section className="pf-section" id="openbridge">
        <div className="pf-section-head">
          <div className="section-label mono">03 / {c.sections.openSource}</div>
          <h2 className="section-title">
            {lang === "en" ? "Co-built open source." : "Open source co-construit."}
          </h2>
        </div>
        {(() => {
          const os = c.openSource;
          return (
            <article className="os-card">
              <div className="os-head">
                <div className="os-mark">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.5.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.5 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.6 18.4.5 12 .5z"/>
                  </svg>
                </div>
                <div className="os-head-text">
                  <div className="app-index mono">{lang === "en" ? "Collaborative project" : "Projet collaboratif"}</div>
                  <h3>{os.name}</h3>
                  <div className="app-tagline">{os.tagline}</div>
                </div>
                <a href={os.url} target="_blank" rel="noreferrer" className="os-head-cta">
                  {os.urlLabel}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </a>
              </div>
              <div className="os-body">
                <div>
                  <div className="app-block-label mono">{lang === "en" ? "Role" : "Rôle"}</div>
                  <p className="os-role">{os.role}</p>
                  <div className="app-block-label mono" style={{ marginTop: 24 }}>{lang === "en" ? "Problem" : "Problème"}</div>
                  <p>{os.problem}</p>
                  <div className="app-block-label mono" style={{ marginTop: 24 }}>{lang === "en" ? "Highlights" : "Points clés"}</div>
                  <ul className="os-highlights">
                    {os.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                  <div className="chip-row" style={{ marginTop: 20 }}>
                    {os.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                  </div>
                </div>
                <div className="os-terminal" aria-hidden>
                  <div className="os-terminal-bar">
                    <span className="dot r"></span><span className="dot y"></span><span className="dot g"></span>
                    <span className="os-terminal-title mono">openbridge — whatsapp</span>
                  </div>
                  <div className="os-terminal-body">
                    {os.terminal.map((l, i) => (
                      <div key={i} className={`os-line ${l.who}`}>
                        <span className="os-who mono">{l.who === "you" ? "you" : "ai"}</span>
                        <span className="os-text">{l.text}</span>
                      </div>
                    ))}
                    <div className="os-caret mono">▊</div>
                  </div>
                </div>
              </div>
            </article>
          );
        })()}
      </section>
      <section className="pf-section" id="experience">
        <div className="pf-section-head">
          <div className="section-label mono">01 / {c.sections.experience}</div>
          <h2 className="section-title">
            {lang === "en" ? "Eight years of production iOS." : "Huit ans d'iOS en production."}
          </h2>
        </div>
        <div className="pf-timeline">
          {c.experience.map((job, i) => (
            <div className="job" key={i}>
              <div className="job-meta">
                <div className="job-duration mono">{job.duration}</div>
                <div className="job-location mono">{job.location}</div>
              </div>
              <div className="job-body">
                <div className="job-role">{job.role}</div>
                <div className="job-company">{job.company}</div>
                <ul className="job-bullets">
                  {job.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
                {job.impact && <div className="job-impact">→ {job.impact}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      <section className="pf-section pf-about" id="about">
        <div className="pf-section-head">
          <div className="section-label mono">04 / {c.sections.about}</div>
        </div>
        <div className="about-grid">
          <div className="about-portrait" data-slot="portrait">
            <img
              src="assets/portrait.jpg"
              alt="Haifa Ben Letaifa"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div className="about-text">
            {c.about.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* skills */}
      <section className="pf-section" id="skills">
        <div className="pf-section-head">
          <div className="section-label mono">05 / {c.sections.skills}</div>
        </div>
        <div className="skills-grid">
          {c.skillGroups.map((g) => (
            <div className="skill-group" key={g.title}>
              <div className="skill-title mono">{g.title}</div>
              <ul>
                {g.items.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* education */}
      <section className="pf-section pf-edu" id="education">
        <div className="pf-section-head">
          <div className="section-label mono">06 / {c.sections.education}</div>
        </div>
        <div className="edu-card">
          <div className="edu-degree">{c.education.degree}</div>
          <div className="edu-school">{c.education.school}</div>
          <div className="edu-loc mono">{c.education.location}</div>
        </div>
      </section>

      {/* contact */}
      <section className="pf-section pf-contact" id="contact">
        <div className="contact-inner">
          <h2 className="contact-title">{c.contact.title}.</h2>
          <p className="contact-body">{c.contact.body}</p>
          <div className="contact-links">
            <a href={`mailto:${c.contact.email}`} className="contact-link">
              <div className="link-label mono">Email</div>
              <div className="link-value">{c.contact.email}</div>
            </a>
            <a href="https://www.linkedin.com/in/haifa-ben-letaifa/" target="_blank" rel="noreferrer" className="contact-link">
              <div className="link-label mono">{c.contact.linkedin}</div>
              <div className="link-value">{c.contact.linkedinHandle}</div>
            </a>
            <a href="assets/cv/haifa-ben-letaifa-cv-en.pdf" download className="contact-link">
              <div className="link-label mono">CV</div>
              <div className="link-value">PDF · {lang === "en" ? "English" : "Anglais"}</div>
            </a>
          </div>
        </div>
        <div className="pf-footer mono">{c.footer}</div>
      </section>
    </div>
  );
}

window.PortfolioLight = PortfolioLight;
