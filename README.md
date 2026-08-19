![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/barrymichaeldoyle/barrymichaeldoyle-web?utm_source=oss&utm_medium=github&utm_campaign=barrymichaeldoyle%2Fbarrymichaeldoyle-web&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

# barrymichaeldoyle.com

## Deployment

The site runs on Cloudflare Workers through the official Cloudflare Vite plugin.

```bash
pnpm build
pnpm preview
pnpm deploy
```

`pnpm deploy` requires an authenticated Wrangler session. Configure the
production custom domains and the `www` to apex redirect in Cloudflare after
the Worker has been verified on its `workers.dev` URL.
