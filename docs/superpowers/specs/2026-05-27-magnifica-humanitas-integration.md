# Modifiche *Magnifica Humanitas* — Specifica

**Data:** 2026-05-27
**Progetto:** Prete-à-porter
**Riferimento:** Enciclica *Magnifica Humanitas* di Papa Leone XIV (15 maggio 2026)

## Premessa

Tre interventi puntuali per agganciare il progetto al Magistero senza stravolgerne il tono. Il progetto è nato prima dell'enciclica come provocazione; l'enciclica fornisce una cornice dottrinale alla domanda che il progetto solleva.

---

## 1. HeaderHero — Epigrafe

**File:** `src/components/HeaderHero.astro`

**Testo** (identico alla fonte §15):

> *"In the era of artificial intelligence, when human dignity is threatened by new forms of dehumanization, ours is the pressing duty to remain profoundly human."*
> — Leone XIV, *Magnifica Humanitas* §15

**Posizione:** dopo il badge `v0.1 · progetto in divenire`, prima dello scroll-hint.

**Stile:**
- Font: `'IM Fell English', serif` (o `'Cinzel', serif`), italic
- Colore: `var(--gold)` o `var(--ink-mid)`
- Dimensione: `clamp(0.8rem, 2vw, 1rem)`
- Allineamento: center
- Margine sopra: 32px (stessa spaziatura del badge)
- Attribuzione in riga separata, dimensione ridotta, colore più tenue
- Animazione: `fadeDown` con delay 0.5s (continua la cascata del badge)

---

## 2. TerminalSection — Riga cronologica

**File:** `src/components/TerminalSection.astro`

**Testo:** aggiungere dopo il disclaimer `NESSUN PRETE È STATO LICENZIATO`:

```
<div class="terminal-line">&nbsp;</div>
<div class="terminal-line"><span class="comment"># tempistica</span></div>
<div class="terminal-line"><span class="prompt">$</span> <span class="cmd">echo "pre-dating Magnifica Humanitas (2026)"</span></div>
<div class="terminal-line"><span class="out">→ il progetto è nato come provocazione prima dell'enciclica</span></div>
<div class="terminal-line"><span class="out">→ la domanda ha trovato una cornice nel Magistero</span></div>
```

**Posizione:** subito dopo `LA REALIZZAZIONE DI QUESTO PROGETTO.` e la relativa chiusura `</div>`, prima della chiusura di `.terminal`.

---

## 3. CtaBlock — Notazione

**File:** `src/components/CtaBlock.astro`

**Testo:** dopo il paragrafo esistente:

```html
<p class="footnote">
  A maggio 2026 Papa Leone XIV ha dedicato a questa domanda<br />
  l'enciclica <em>Magnifica Humanitas</em>.
</p>
```

**Stile:**
- Font: `'Source Code Pro', monospace`
- Dimensione: `0.72rem`
- Colore: `rgba(245,237,224,0.4)` (più tenue del paragrafo sopra)
- Margine sopra: 36px (stessa spaziatura del bottone CTA)
- Allineamento: center
- Interlinea: 1.8

---

## Nessuna modifica a

- ProvocationSection
- GridSection
- StepsSection
- FooterSection
- privacy.astro
