# Prete-à-Porter website

Sito vetrina di [Prete-à-Porter](https://prete-a-porter.dev), realizzato con **Astro 7**.
Il sito è prerenderizzato (HTML statico) ed è distribuito tramite Cloudflare Workers Static Assets.

## Requisiti

- Node.js **22.23.4 o superiore** (vedi `.nvmrc`)
- npm

## Sviluppo

```sh
npm ci
npm run dev
```

Apri `http://localhost:4321`.

## Verifica e build

```sh
npm ci
npm run build
npm run preview
```

La build statica viene generata in `dist/`. La CI esegue `npm ci` e `npm run build` sulle pull request e su `main`.

## Struttura

- `src/pages/`: homepage e privacy policy
- `src/components/`: sezioni della landing page
- `src/layouts/`: layout, metadati e stili globali
- `public/`: immagini, icone e manifest
- `astro.config.mjs`: configurazione Astro
- `wrangler.json`: impostazioni di deploy Cloudflare con asset statici da `dist/`

## Aggiornamento dipendenze

```sh
npm install astro@latest
npm run build
```

Committa insieme `package.json` e `package-lock.json`. Per la migrazione a Astro 7, `compressHTML: true` mantiene la gestione degli spazi HTML della versione 6: prima di rimuoverlo, verifica visivamente i testi con elementi inline.

Documentazione: [Astro](https://docs.astro.build/) · [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
