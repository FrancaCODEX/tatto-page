# Ôrbita Tattoo Studio

Landing page estática (HTML + CSS + JS puros, sem build).

- `index.html`, `assets/styles.css`, `assets/app.js`
- Link de agendamento: constante `BOOKING_URL` em `assets/app.js`.
- Prints em `prints/`; design de referência em `reference.png`.

## Deploy no Cloudflare

**Workers (wrangler):** `npx wrangler deploy` — usa `wrangler.jsonc` e serve a raiz como assets estáticos.

**Pages via Git:** conecte o repositório no painel, framework "None", build command vazio, output directory `/`.
