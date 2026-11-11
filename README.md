# Ôrbita Tattoo Studio

Landing page estática (HTML + CSS + JS puros, sem build).

- `index.html`, `assets/styles.css`, `assets/app.js`
- Link de agendamento: constante `BOOKING_URL` em `assets/app.js`.
- Prints em `prints/`; design de referência em `reference.png`.

## Deploy no Cloudflare

Requer Node.js 24 e npm. Instale as ferramentas com `npm ci` e publique com
`npx wrangler deploy`. No primeiro uso local, execute `npx wrangler login`.
O projeto usa Wrangler 4.160.1 e serve a raiz como assets estáticos, sem build.
Arquivos de desenvolvimento são excluídos por `.assetsignore`.

### Deploy automático

O workflow `.github/workflows/deploy.yml` publica a cada push na `main` e também
pode ser executado manualmente em **Actions → Publicar no Cloudflare → Run workflow**.

Em **Settings → Secrets and variables → Actions → New repository secret**, crie:

- `CLOUDFLARE_ACCOUNT_ID`: `a0719e4ec1645250a43da518e503604a`.
- `CLOUDFLARE_API_TOKEN`: token da conta Cloudflare com permissão de edição do
  Worker `tatto-page`. Crie em **Cloudflare → Account API tokens → Create Token**,
  usando o modelo **Edit Cloudflare Workers** e restringindo o acesso à conta
  deste projeto. Não inclua o valor do token em arquivos ou commits.

Sem esses secrets, a publicação no GitHub Actions falha na autenticação.
Depois de cadastrá-los, execute o workflow manualmente ou faça um novo push.

Referências: [GitHub Actions no Cloudflare](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
e [Wrangler Action](https://github.com/cloudflare/wrangler-action).
