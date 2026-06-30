# Prete-à-porter — Design Doc

**Data:** 2026-05-22
**Progetto:** Prete-à-porter
**Autore:** Giacomo Bartoloni
**Deploy:** Build statica → nginx

## Obiettivo
Convertire il design statico in `home.html` e `privacy.html` in un progetto Astro organizzato, con componenti riutilizzabili e layout condiviso.

## Struttura file
```
astro-pap/src/
├── layouts/
│   └── BaseLayout.astro
├── components/
│   ├── HeaderHero.astro
│   ├── ProvocationSection.astro
│   ├── TerminalSection.astro
│   ├── GridSection.astro
│   ├── StepsSection.astro
│   ├── CtaBlock.astro
│   ├── NavBar.astro
│   └── FooterSection.astro
├── pages/
│   ├── index.astro
│   └── privacy.astro
public/
├── logo.png
├── hero.webp
├── favicon.ico
└── favicon.svg
```

## Asset
- **Hero sfondo:** `hero.webp` (da `Immagine WebP.webp`)
- **Brand:** `logo.png` (nella NavBar della privacy)
- **Footer:** "Giacomo Bartoloni"

## Layout (`BaseLayout.astro`)
- Head: charset, viewport, Google Fonts (IM Fell English, Cinzel, Source Code Pro), title/description per pagina
- Grain overlay (SVG turbulence filter su `body::before`)
- Page-border dorato con doppio bordo
- `<slot />` per contenuto pagina
- `FooterSection` finale (condiviso tra home e privacy)
- Script IntersectionObserver per scroll reveal

## Componenti Home
Ogni componente è autosufficiente con CSS scoped. Testi inline nei componenti. L'ordine in `index.astro`:
1. `HeaderHero` — hero full-screen con immagine sfondo
2. `ProvocationSection` — "01 — La Provocazione" con blockquote
3. (divider) + `TerminalSection` — "02 — Sotto il Cofano" con terminal block
4. (divider) + `GridSection` — "03 — Perché Proprio le Omelie?" griglia 2x2
5. (divider) + `StepsSection` — "04 — Come Funziona" 3 passi
6. `CtaBlock` — call to action scuro
7. `FooterSection` — footer condiviso

## Pagina Privacy
- Usa `BaseLayout` con `NavBar` (logo + "← Torna alla home")
- Contenuto inline in `privacy.astro` con tutti gli articoli GDPR
- Stili specifici scoped nel componente

## Scroll Reveal
IntersectionObserver globale in `BaseLayout` applicato agli elementi con classe `reveal`.
