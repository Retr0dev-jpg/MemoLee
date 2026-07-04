# Memolee — Music Portfolio

Sito portfolio one-page per **Memolee** (chitarrista, pianista e content creator).
Mostra gli ultimi contenuti in tempo reale dai feed RSS dei canali YouTube e
permette di guardare i video direttamente in un player integrato, senza uscire
dal sito.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (dev/build)
- [Tailwind CSS 4](https://tailwindcss.com/) + CSS custom properties
- Deploy su [Vercel](https://vercel.com/)

## Sviluppo

```bash
npm install
npm run dev      # server di sviluppo (http://localhost:5173)
npm run build    # type-check + build di produzione in dist/
npm run preview  # anteprima della build
```



## Feed YouTube (proxy same-origin)

I feed RSS di YouTube non espongono header CORS, quindi vengono serviti da un
percorso **same-origin** (niente proxy di terze parti):

- In **produzione**: rewrite definiti in `[vercel.json](./vercel.json)`
(`/yt/piano`, `/yt/guitar` → feed YouTube).
- In **sviluppo**: proxy equivalente in `[vite.config.ts](./vite.config.ts)`.

Il parsing e la cache dei feed sono in `[src/lib/youtube.ts](./src/lib/youtube.ts)`.

## Licenza

Il **codice sorgente** di questo progetto è rilasciato sotto **GNU General
Public License v3.0** — vedi il file `[LICENSE](./LICENSE)`.

Copyright (C) 2026 Marco Simone Cannizzaro — [https://retr0hub.dev/](https://retr0hub.dev/)

### Esclusioni (contenuti e branding NON coperti dalla licenza)

La licenza GPL-3.0 si applica **esclusivamente al codice**. Sono **esclusi** e
rimangono **© Memolee — tutti i diritti riservati**, senza alcun permesso di
riuso, redistribuzione o modifica:

- il marchio, il nome e il logo **Memolee**;
- tutte le immagini, foto e asset grafici (inclusa la cartella `public/` e
qualsiasi export di design, es. `IMG_TEST/`);
- i contenuti dei canali YouTube (video, titoli, thumbnail), di proprietà dei
rispettivi titolari e soggetti ai Termini di YouTube.

Se riutilizzi il codice, sostituisci questi asset con materiale tuo.

---

Sito progettato e sviluppato da [Retr0_](https://retr0hub.dev/) per Memolee.