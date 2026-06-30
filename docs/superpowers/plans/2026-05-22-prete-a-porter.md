# Prete-à-porter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert existing HTML designs into an organized Astro project with reusable components and a shared layout.

**Architecture:** Static Astro site with component-per-section pattern. `BaseLayout.astro` for shared structure, individual section components for each home page block, and `privacy.astro` as a standalone page using the same layout.

**Tech Stack:** Astro 6, static build for nginx.

---

### Task 1: Prepare assets and clean scaffold

**Files:**
- Create: `public/logo.png` (copy from `../logo.png`)
- Create: `public/hero.webp` (copy from `../Immagine WebP.webp`)
- Remove: `src/pages/index.astro` (default placeholder)

- [ ] **Step 1: Copy assets and clean scaffold**

```bash
cp /Users/gbartoloni/projects/learning/astro-pap/logo.png /Users/gbartoloni/projects/learning/astro-pap/astro-pap/public/logo.png
cp "/Users/gbartoloni/projects/learning/astro-pap/Immagine WebP.webp" /Users/gbartoloni/projects/learning/astro-pap/astro-pap/public/hero.webp
rm /Users/gbartoloni/projects/learning/astro-pap/astro-pap/src/pages/index.astro
mkdir -p /Users/gbartoloni/projects/learning/astro-pap/astro-pap/src/layouts /Users/gbartoloni/projects/learning/astro-pap/astro-pap/src/components
```

---

### Task 2: Create BaseLayout.astro

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write BaseLayout.astro**

```astro
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description = "Prete-à-porter — Ghostwriter per Sacerdoti" } = Astro.props;
---

<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="generator" content={Astro.generator} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;700;900&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" href="/favicon.ico" />
</head>
<body>
  <div class="page-border"></div>
  <slot />
  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>
</body>
</html>

<style is:global>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:     #f5ede0;
    --parchment-dark:#e8d9c4;
    --ink:           #1a1208;
    --ink-mid:       #3d2b10;
    --gold:          #8b6914;
    --gold-light:    #c49a2e;
    --red:           #8b1a1a;
    --terminal-bg:   #0d0d0d;
    --terminal-green:#39ff14;
    --terminal-dim:  #2a8a0a;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--parchment);
    color: var(--ink);
    font-family: 'IM Fell English', Georgia, serif;
    overflow-x: hidden;
    cursor: default;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.6;
  }

  .page-border {
    position: fixed;
    inset: 12px;
    border: 1.5px solid var(--gold);
    pointer-events: none;
    z-index: 100;
    opacity: 0.4;
  }
  .page-border::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 0.5px solid var(--gold);
    opacity: 0.5;
  }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
```

---

### Task 3: Create HeaderHero.astro

**Files:**
- Create: `src/components/HeaderHero.astro`

- [ ] **Step 1: Write HeaderHero.astro**

```astro
---
---

<header>
  <img class="hero-img" src="/hero.webp" alt="Prete-à-porter" />
  <div class="hero-content">
    <div class="cross-ornament">✝ ✝ ✝</div>
    <h1 class="main-title">Prete-à-<span>Porter</span></h1>
    <div class="accent-line"></div>
    <p class="subtitle">Il ghostwriter delle domeniche.<br />Omelie generate dall'intelligenza artificiale — per chi di umano ha già abbastanza.</p>
    <span class="badge">v0.1 — side project in fieri</span>
  </div>
  <div class="scroll-hint">
    <span>Scorri</span>
    <div class="scroll-arrow"></div>
  </div>
</header>

<style>
  header {
    position: relative;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    overflow: hidden;
    border-bottom: 1px solid var(--gold);
  }

  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: brightness(0.55) sepia(0.15);
  }

  header::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(10,8,4,0.25) 0%,
      rgba(10,8,4,0.1) 30%,
      rgba(10,8,4,0.55) 65%,
      rgba(10,8,4,0.92) 100%
    );
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    padding: 0 24px 72px;
    max-width: 720px;
  }

  .cross-ornament {
    font-size: 1.2rem;
    color: var(--gold-light);
    letter-spacing: 20px;
    margin-bottom: 28px;
    animation: fadeDown 1s ease both;
  }

  .main-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(3rem, 9vw, 8rem);
    font-weight: 900;
    line-height: 0.88;
    letter-spacing: -0.02em;
    color: var(--parchment);
    animation: fadeDown 1s ease 0.1s both;
    text-shadow: 0 4px 32px rgba(0,0,0,0.6);
  }

  .main-title span {
    color: var(--gold-light);
  }

  .accent-line {
    width: 80px;
    height: 1.5px;
    background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
    margin: 28px auto;
    animation: fadeDown 1s ease 0.2s both;
  }

  .subtitle {
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    font-style: italic;
    color: rgba(245,237,224,0.8);
    max-width: 480px;
    margin: 0 auto 32px;
    line-height: 1.75;
    animation: fadeDown 1s ease 0.3s both;
    text-shadow: 0 2px 12px rgba(0,0,0,0.5);
  }

  .badge {
    display: inline-block;
    background: rgba(13,13,13,0.85);
    color: var(--terminal-green);
    font-family: 'Source Code Pro', monospace;
    font-size: 0.72rem;
    padding: 7px 16px;
    border-radius: 2px;
    letter-spacing: 0.08em;
    animation: fadeDown 1s ease 0.4s both;
    border: 1px solid rgba(57,255,20,0.2);
  }

  .scroll-hint {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    animation: fadeDown 1.5s ease 1s both;
  }
  .scroll-hint span {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: rgba(245,237,224,0.4);
    text-transform: uppercase;
  }
  .scroll-arrow {
    width: 1px;
    height: 32px;
    background: linear-gradient(to bottom, rgba(245,237,224,0.4), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(1); }
    50%       { opacity: 0.9; transform: scaleY(1.15); }
  }

  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
```

---

### Task 4: Create ProvocationSection.astro

**Files:**
- Create: `src/components/ProvocationSection.astro`

- [ ] **Step 1: Write ProvocationSection.astro**

```astro
---
---

<section class="reveal">
  <div class="section-label">// 01 — La Provocazione</div>
  <h2>L'AI non può predicare.<br />E questo è il punto.</h2>

  <p>
    Prete-à-porter è un generatore di omelie cattoliche. Inserisci il Vangelo della domenica, scegli il tono, e ottieni un testo da pulpito in pochi secondi.
  </p>

  <p>
    <strong>Non è una proposta seria.</strong> È una domanda seria vestita da strumento: cosa succede quando deleghiamo all'AI anche ciò che per definizione richiede un essere umano — la testimonianza, la presenza, la vulnerabilità?
  </p>

  <blockquote>
    <p>Un'omelia scritta da un algoritmo è come un confessionale con chatbot.<br />Tecnicamente possibile. Profondamente sbagliato. Illuminante proprio per questo.</p>
    <cite>— manifesto del progetto</cite>
  </blockquote>
</section>

<style>
  section {
    max-width: 780px;
    margin: 0 auto;
    padding: 72px 32px;
  }

  .section-label {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--ink);
    margin-bottom: 24px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.85;
    color: var(--ink-mid);
    margin-bottom: 1.4em;
  }

  p strong {
    color: var(--ink);
    font-style: italic;
  }

  blockquote {
    border-left: 3px solid var(--red);
    padding: 8px 0 8px 28px;
    margin: 40px 0;
  }

  blockquote p {
    font-size: 1.25rem;
    font-style: italic;
    line-height: 1.7;
    color: var(--ink);
  }

  blockquote cite {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.7rem;
    color: var(--gold);
    letter-spacing: 0.1em;
    font-style: normal;
  }
</style>
```

---

### Task 5: Create TerminalSection.astro

**Files:**
- Create: `src/components/TerminalSection.astro`

- [ ] **Step 1: Write TerminalSection.astro**

```astro
---
---

<section class="reveal">
  <div class="section-label">// 02 — Sotto il Cofano</div>
  <h2>Un progetto di apprendimento,<br />non di sostituzione.</h2>

  <p>
    La verità è semplice: sto imparando a costruire con queste tecnologie. Ho scelto un tema volutamente <strong>scomodo</strong> — l'omelia, uno dei formati più umani che esistano — per testare i limiti, non per abbatterli.
  </p>

  <div class="terminal">
    <div class="terminal-line"><span class="comment"># stack tecnico</span></div>
    <div class="terminal-line"><span class="prompt">$</span> <span class="cmd">cat motivation.txt</span></div>
    <div class="terminal-line"><span class="out">→ imparare le API dei modelli linguistici</span></div>
    <div class="terminal-line"><span class="out">→ esplorare prompt engineering su testi liturgici</span></div>
    <div class="terminal-line"><span class="out">→ provocare il catastrofismo sull'AI</span></div>
    <div class="terminal-line"><span class="out">→ divertirmi nel farlo</span></div>
    <div class="terminal-line">&nbsp;</div>
    <div class="terminal-line"><span class="prompt">$</span> <span class="cmd">cat disclaimer.txt</span></div>
    <div class="terminal-line"><span class="out">NESSUN PRETE È STATO LICENZIATO DURANTE</span></div>
    <div class="terminal-line"><span class="out">LA REALIZZAZIONE DI QUESTO PROGETTO.</span></div>
  </div>
</section>

<style>
  section {
    max-width: 780px;
    margin: 0 auto;
    padding: 72px 32px;
  }

  .section-label {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--ink);
    margin-bottom: 24px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.85;
    color: var(--ink-mid);
    margin-bottom: 1.4em;
  }

  p strong {
    color: var(--ink);
    font-style: italic;
  }

  .terminal {
    background: var(--terminal-bg);
    border-radius: 4px;
    padding: 28px 32px;
    margin: 40px 0;
    position: relative;
    overflow: hidden;
  }

  .terminal::before {
    content: '● ● ●';
    position: absolute;
    top: 12px;
    left: 16px;
    font-size: 0.55rem;
    letter-spacing: 6px;
    color: #444;
  }

  .terminal-line {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.85rem;
    line-height: 1.9;
    color: var(--terminal-dim);
  }

  .terminal-line .prompt { color: var(--gold-light); }
  .terminal-line .cmd    { color: #fff; }
  .terminal-line .out    { color: var(--terminal-green); }
  .terminal-line .comment{ color: #555; font-style: italic; }
</style>
```

---

### Task 6: Create GridSection.astro

**Files:**
- Create: `src/components/GridSection.astro`

- [ ] **Step 1: Write GridSection.astro**

```astro
---
---

<section class="reveal">
  <div class="section-label">// 03 — Perché Proprio le Omelie?</div>
  <h2>Il formato più umano<br />come banco di prova.</h2>

  <p>Ho scelto le omelie perché condensano tutto quello che l'AI <em>non</em> può essere:</p>

  <div class="provocation-grid">
    <div class="prov-cell">
      <span class="icon">📖</span>
      <h3>Interpretazione Viva</h3>
      <p>Un testo sacro va incarnato, non parafrasato. L'omelia parla da una vita, non da un dataset.</p>
    </div>
    <div class="prov-cell">
      <span class="icon">🕊️</span>
      <h3>Presenza Fisica</h3>
      <p>Il pulpito implica un corpo, una voce, uno sguardo sulla comunità che hai davanti. Token non ne hanno.</p>
    </div>
    <div class="prov-cell">
      <span class="icon">⚖️</span>
      <h3>Responsabilità Etica</h3>
      <p>Chi predica risponde di ciò che dice. Un modello non porta peso morale. E quella differenza è enorme.</p>
    </div>
    <div class="prov-cell">
      <span class="icon">💬</span>
      <h3>Comunità Reale</h3>
      <p>L'omelia migliore nasce da chi conosce i suoi ascoltatori per nome. L'AI li conosce come distribuzione statistica.</p>
    </div>
  </div>
</section>

<style>
  section {
    max-width: 780px;
    margin: 0 auto;
    padding: 72px 32px;
  }

  .section-label {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--ink);
    margin-bottom: 24px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.85;
    color: var(--ink-mid);
    margin-bottom: 1.4em;
  }

  .provocation-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin: 40px 0;
    border: 1px solid var(--parchment-dark);
  }

  @media (max-width: 600px) {
    .provocation-grid { grid-template-columns: 1fr; }
  }

  .prov-cell {
    padding: 28px 24px;
    background: var(--parchment);
    transition: background 0.2s;
  }

  .prov-cell:hover { background: var(--parchment-dark); }

  .prov-cell .icon {
    font-size: 1.5rem;
    margin-bottom: 12px;
    display: block;
  }

  .prov-cell h3 {
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
    color: var(--ink);
  }

  .prov-cell p {
    font-size: 0.92rem;
    line-height: 1.65;
    margin-bottom: 0;
  }
</style>
```

---

### Task 7: Create StepsSection.astro

**Files:**
- Create: `src/components/StepsSection.astro`

- [ ] **Step 1: Write StepsSection.astro**

```astro
---
---

<section class="reveal">
  <div class="section-label">// 04 — Come Funziona</div>
  <h2>Tre passi verso<br />l'omelia artificiale.</h2>

  <div class="steps">
    <div class="step">
      <div class="step-number">I</div>
      <div class="step-content">
        <h3>Scegli il Vangelo</h3>
        <p>Inserisci la domenica del calendario liturgico o incolla direttamente il brano evangelico. Il modello conosce il rito romano.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">II</div>
      <div class="step-content">
        <h3>Configura il Tono</h3>
        <p>Pastorale, accademico, narrativo, provocatorio. Scegli lunghezza e pubblico. Fin qui, è solo prompt engineering.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">III</div>
      <div class="step-content">
        <h3>Leggi. Rifletti. Riscrivi.</h3>
        <p>L'output non è la fine — è l'inizio di una riflessione. Usa il testo generato come specchio, non come scrittura. Questo è il vero punto del progetto.</p>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    max-width: 780px;
    margin: 0 auto;
    padding: 72px 32px;
  }

  .section-label {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    font-weight: 700;
    line-height: 1.15;
    color: var(--ink);
    margin-bottom: 24px;
  }

  .steps {
    counter-reset: steps;
    margin: 40px 0;
  }

  .step {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 20px;
    margin-bottom: 32px;
    align-items: start;
  }

  .step-number {
    font-family: 'Cinzel', serif;
    font-size: 2rem;
    font-weight: 900;
    color: var(--parchment-dark);
    line-height: 1;
    text-align: right;
  }

  .step-content h3 {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: var(--ink);
    margin-bottom: 6px;
  }

  .step-content p {
    font-size: 0.95rem;
    margin-bottom: 0;
  }
</style>
```

---

### Task 8: Create CtaBlock.astro

**Files:**
- Create: `src/components/CtaBlock.astro`

- [ ] **Step 1: Write CtaBlock.astro**

```astro
---
---

<div class="cta-block reveal">
  <h2>Curioso? Scettico? Entrambe le cose?</h2>
  <p>Seguimi mentre costruisco questo progetto e prova tu stesso dove finisce la macchina e inizia l'umano.</p>
  <a href="#" class="cta-button">Prova la Demo</a>
</div>

<style>
  .cta-block {
    text-align: center;
    padding: 64px 32px;
    background: var(--ink);
    position: relative;
    overflow: hidden;
  }

  .cta-block::before {
    content: '✝';
    position: absolute;
    font-size: 20rem;
    color: rgba(255,255,255,0.02);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .cta-block h2 {
    font-family: 'Cinzel', serif;
    color: var(--parchment);
    font-size: clamp(1.5rem, 4vw, 2.4rem);
    margin-bottom: 16px;
  }

  .cta-block p {
    color: rgba(245,237,224,0.6);
    max-width: 480px;
    margin: 0 auto 36px;
    font-size: 1.1rem;
    line-height: 1.85;
  }

  .cta-button {
    display: inline-block;
    background: var(--gold);
    color: var(--ink);
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 16px 40px;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    border-radius: 2px;
  }

  .cta-button:hover {
    background: var(--gold-light);
    transform: translateY(-2px);
  }
</style>
```

---

### Task 9: Create FooterSection.astro

**Files:**
- Create: `src/components/FooterSection.astro`

- [ ] **Step 1: Write FooterSection.astro**

```astro
---
---

<footer class="reveal">
  <span class="cross">✝</span>
  <p>
    Prete-à-Porter — Un side project di <a href="#">Giacomo Bartoloni</a><br />
    Costruito per imparare · Non affiliato con la Santa Sede · Nessun sacramento è stato violato<br /><br />
    <span style="color:#555">Il Nome del Progetto è un gioco di parole. Il progetto, no.</span>
    <br /><br />
    <a href="/privacy">Privacy Policy</a>
  </p>
</footer>

<style>
  footer {
    text-align: center;
    padding: 56px 32px 80px;
    border-top: 1px solid var(--parchment-dark);
  }

  footer .cross {
    font-size: 1.6rem;
    color: var(--gold);
    margin-bottom: 20px;
    display: block;
  }

  footer p {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.72rem;
    color: #999;
    letter-spacing: 0.1em;
    line-height: 2;
    margin-bottom: 0;
  }

  footer a {
    color: var(--gold);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  footer a:hover { border-color: var(--gold); }
</style>
```

---

### Task 10: Create index.astro (home page)

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Write index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HeaderHero from '../components/HeaderHero.astro';
import ProvocationSection from '../components/ProvocationSection.astro';
import TerminalSection from '../components/TerminalSection.astro';
import GridSection from '../components/GridSection.astro';
import StepsSection from '../components/StepsSection.astro';
import CtaBlock from '../components/CtaBlock.astro';
import FooterSection from '../components/FooterSection.astro';
---

<BaseLayout title="Prete-à-Porter — Ghostwriter per Sacerdoti">
  <HeaderHero />
  <ProvocationSection />
  <div class="divider reveal">† · · · †</div>
  <hr class="ornate" />
  <TerminalSection />
  <div class="divider reveal">† · · · †</div>
  <hr class="ornate" />
  <GridSection />
  <div class="divider reveal">† · · · †</div>
  <hr class="ornate" />
  <StepsSection />
  <CtaBlock />
  <FooterSection />
</BaseLayout>

<style is:global>
  .divider {
    text-align: center;
    color: var(--gold);
    font-size: 1.1rem;
    letter-spacing: 16px;
    opacity: 0.7;
    padding: 0 32px;
  }

  hr.ornate {
    border: none;
    border-top: 1px solid var(--parchment-dark);
    margin: 0;
  }
</style>
```

---

### Task 11: Create NavBar.astro

**Files:**
- Create: `src/components/NavBar.astro`

- [ ] **Step 1: Write NavBar.astro**

```astro
---
---

<nav class="top-nav">
  <img src="/logo.png" alt="Prete-à-Porter" class="nav-logo" />
  <span class="nav-title">Prete-à-Porter</span>
  <span class="nav-sep">/</span>
  <a class="back-link" href="/">← Torna alla home</a>
</nav>

<style>
  .top-nav {
    padding: 28px 40px;
    border-bottom: 1px solid var(--parchment-dark);
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .nav-logo {
    height: 32px;
    width: auto;
  }

  .nav-title {
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    color: var(--ink-mid);
    letter-spacing: 0.05em;
  }

  .nav-sep {
    color: var(--parchment-dark);
    font-size: 0.8rem;
  }

  .back-link {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.7rem;
    color: var(--gold);
    text-decoration: none;
    letter-spacing: 0.12em;
    opacity: 0.7;
    transition: opacity 0.2s;
    margin-left: auto;
  }
  .back-link:hover { opacity: 1; }
</style>
```

---

### Task 12: Create privacy.astro

**Files:**
- Create: `src/pages/privacy.astro`

- [ ] **Step 1: Write privacy.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import NavBar from '../components/NavBar.astro';
import FooterSection from '../components/FooterSection.astro';
---

<BaseLayout title="Privacy Policy — Prete-à-Porter">
  <NavBar />

  <header>
    <div class="label">// Documento Legale</div>
    <h1>Informativa sul Trattamento<br />dei Dati Personali</h1>
    <p class="last-updated">ai sensi dell'art. 13 GDPR (Reg. UE 2016/679) · Ultimo aggiornamento: marzo 2025</p>
  </header>

  <div class="content">
    <div class="highlight-box">
      Il progetto <strong>Prete-à-Porter</strong> raccoglie esclusivamente il tuo indirizzo email per tenerti aggiornato sugli sviluppi del progetto. Nessuna vendita di dati. Nessun tracciamento. Puoi cancellarti in qualsiasi momento.
    </div>

    <section>
      <h2><span class="art-num">ART. 1</span>Titolare del Trattamento</h2>
      <p>Il Titolare del trattamento è il developer del progetto Prete-à-Porter, raggiungibile all'indirizzo email indicato nella sezione contatti del sito. Il Titolare agisce come persona fisica in qualità di sviluppatore indipendente (side project non commerciale).</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 2</span>Dati Personali Raccolti</h2>
      <p>Attraverso il modulo di iscrizione alla lista d'attesa, raccogliamo esclusivamente:</p>
      <ul>
        <li>Indirizzo email</li>
      </ul>
      <p>Non raccogliamo dati sensibili, dati relativi a minori, né dati che possano rivelare origini etniche, opinioni politiche, convinzioni religiose o stato di salute.</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 3</span>Finalità e Base Giuridica</h2>
      <p><strong>Finalità:</strong> Invio di aggiornamenti sul progetto Prete-à-Porter (nuove funzionalità, disponibilità della demo, comunicazioni relative al side project).</p>
      <p><strong>Base giuridica:</strong> Consenso dell'interessato (art. 6, par. 1, lett. a GDPR), espresso liberamente al momento dell'iscrizione.</p>
      <p><strong>Natura del conferimento:</strong> Facoltativa. La mancata fornitura dell'indirizzo email non pregiudica in alcun modo l'utilizzo del sito.</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 4</span>Modalità e Periodo di Conservazione</h2>
      <p>I dati sono trattati in formato elettronico e conservati presso il provider del servizio di email marketing utilizzato. I dati vengono conservati fino alla revoca del consenso da parte dell'interessato o fino alla dismissione del progetto, e comunque non oltre 24 mesi dall'ultima interazione.</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 5</span>Comunicazione e Diffusione</h2>
      <p>I dati non sono venduti, ceduti né diffusi a terzi per finalità commerciali. L'indirizzo email potrebbe essere trattato dal provider del servizio di newsletter (responsabile del trattamento ex art. 28 GDPR) con cui è stato stipulato apposito accordo. Non è previsto trasferimento di dati verso Paesi terzi al di fuori dello Spazio Economico Europeo, salvo che il provider adotti le garanzie adeguate previste dal GDPR.</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 6</span>Provider di Email Marketing</h2>
      <p>Per l'invio delle comunicazioni, il progetto si avvale di un servizio esterno di email marketing. Il provider attualmente in uso è indicato nella pagina del progetto. Il trattamento avviene secondo le condizioni contrattuali e l'informativa privacy del provider medesimo.</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 7</span>Diritti dell'Interessato</h2>
      <p>Ai sensi degli artt. 15–22 GDPR, hai il diritto di:</p>
      <ul>
        <li>Accedere ai tuoi dati (art. 15)</li>
        <li>Rettificare i dati inesatti (art. 16)</li>
        <li>Ottenere la cancellazione dei dati — "diritto all'oblio" (art. 17)</li>
        <li>Limitare il trattamento (art. 18)</li>
        <li>Ricevere i dati in formato portabile (art. 20)</li>
        <li>Opporti al trattamento in qualsiasi momento (art. 21)</li>
        <li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente (art. 7, par. 3)</li>
      </ul>
      <p>Per esercitare i tuoi diritti, è sufficiente inviare un'email al Titolare tramite i contatti indicati sul sito. Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank">garanteprivacy.it</a>).</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 8</span>Cookie e Tracciamento</h2>
      <p>Il sito Prete-à-Porter non utilizza cookie di profilazione o di tracciamento di terze parti. Eventuali cookie tecnici necessari al funzionamento del sito non richiedono il consenso dell'utente. In caso di integrazione futura di strumenti di analytics, questa informativa sarà aggiornata.</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 9</span>Modifiche all'Informativa</h2>
      <p>Il Titolare si riserva il diritto di aggiornare la presente informativa. Le modifiche significative saranno comunicate agli iscritti via email. La versione aggiornata è sempre disponibile su questa pagina, con indicazione della data dell'ultimo aggiornamento.</p>
    </section>

    <section>
      <h2><span class="art-num">ART. 10</span>Contatti</h2>
      <p>Per qualsiasi richiesta relativa alla presente informativa o all'esercizio dei tuoi diritti, contatta il Titolare tramite l'indirizzo email indicato sul sito del progetto.</p>
    </section>
  </div>

  <FooterSection />
</BaseLayout>

<style>
  header {
    text-align: center;
    padding: 64px 24px 48px;
    border-bottom: 1px solid var(--parchment-dark);
  }

  .label {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  h1 {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.8rem, 5vw, 3.2rem);
    font-weight: 700;
    color: var(--ink);
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .last-updated {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.68rem;
    color: #aaa;
    letter-spacing: 0.1em;
  }

  .content {
    max-width: 720px;
    margin: 0 auto;
    padding: 64px 32px 80px;
  }

  .content section {
    margin-bottom: 48px;
  }

  h2 {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: 0.04em;
    margin-bottom: 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--parchment-dark);
  }

  .art-num {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.15em;
    margin-right: 8px;
  }

  p {
    font-size: 1rem;
    line-height: 1.9;
    color: var(--ink-mid);
    margin-bottom: 1em;
  }

  p:last-child { margin-bottom: 0; }

  p strong {
    color: var(--ink);
    font-style: italic;
  }

  ul {
    list-style: none;
    margin: 12px 0 16px 0;
    padding: 0;
  }

  ul li {
    font-size: 0.97rem;
    line-height: 1.75;
    color: var(--ink-mid);
    padding: 4px 0 4px 20px;
    position: relative;
  }

  ul li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--gold);
    font-size: 0.75rem;
    top: 6px;
  }

  .highlight-box {
    background: var(--parchment-dark);
    border-left: 3px solid var(--gold);
    padding: 16px 20px;
    margin: 20px 0;
    font-size: 0.95rem;
    line-height: 1.75;
    color: var(--ink-mid);
  }
</style>
```

---

### Task 13: Build and verify

- [ ] **Step 1: Run `astro build`**

```bash
npm run build
```

Expected: clean build, output in `dist/` folder. No errors.

- [ ] **Step 2: Run `astro dev` and manually verify**

```bash
npm run dev
```

Open `http://localhost:4321` — verify:
- Hero section with background image
- All sections visible on scroll
- Divider elements between sections
- Footer with "Giacomo Bartoloni"
- Navigate to `/privacy` — verify nav bar, logo, content

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: convert Prete-à-porter HTML design to Astro components"
```
