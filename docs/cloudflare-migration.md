# Moving barrymichaeldoyle.com to Cloudflare

This site is hosted on Netlify, and DNS for the zone is hosted on Netlify
too. The plan is to move both to Cloudflare, so that hosting, DNS and
Workers live in one account and each new subdomain project is one Workers
custom domain rather than a record in someone else's DNS.

The work is split into four stages. Each one is reversible on its own, and
none of them depends on the next having gone well. Do not collapse them
into a single cutover. The whole point of the split is that a nameserver
change and a hosting change never fail at the same time.

Written 19 August 2026. The state snapshot below was true on that date.
Re-check it before you start, because DNS drifts.

## State as of 19 August 2026

Registrar is Squarespace Domains II. Nameserver changes happen there, and
`clientTransferProhibited` on the domain does not block them.

DNS is hosted by Netlify, on NS1 nameservers `dns1` to `dns4.p06.nsone.net`.
The SOA contact is `domains+netlify.netlify.com`, which confirms it.

Hosting is Netlify, serving a TanStack Start build. `netlify.toml` publishes
`dist/client` and carries headers and redirects, nothing else.

Convex, Clerk and the Mealy app are unrelated to this zone today. Mealy is
covered in stage 4.

## Collect these before you start

Four things are not in this repo and have to come off a dashboard.

The site's `.netlify.app` hostname, from Netlify under Site configuration,
Domain management. Every DNS record in stage 2 depends on it, and once the
zone is removed from Netlify DNS it is more annoying to find.

Any environment variables set in the Netlify dashboard rather than in the
repo. The build reads none from `netlify.toml`, so if the site needs any
they are invisible to a `grep` and will only show up as a broken build.

Any redirects, domain aliases or branch subdomains configured in the Netlify
UI instead of `netlify.toml`.

The current DKIM record, captured before anything changes:

```bash
dig +short TXT google._domainkey.barrymichaeldoyle.com
```

The value as of writing is in the record table below, but capture it fresh
rather than trusting a document. Getting DKIM wrong means mail that silently
lands in spam, and it will not be obvious for days.

## Stage 1: build for Workers, verify on workers.dev

No DNS changes. The live site stays on Netlify throughout. This stage only
answers the question "does this build and run on Workers at all".

Swap the adapter in `vite.config.ts`. Today line 1 imports
`@netlify/vite-plugin-tanstack-start` and line 46 calls `netlify()`. Replace
both with Nitro's Cloudflare preset. The `mealy` repo already runs this
exact configuration, so use it as the reference:

```ts
nitro({
  preset: 'cloudflare_module',
  compatibilityDate: '2024-09-19',
  cloudflare: { deployConfig: true, nodeCompat: true },
})
```

Leave the `tanstackStart()` prerender block alone. It is doing the heavy
lifting and is host-agnostic.

Translate the cache headers from `netlify.toml` into `public/_headers`.
Cloudflare's static-asset `_headers` file uses the same syntax Netlify does,
so the `/assets/*`, `/*.png`, `/*.webp`, `/*.svg`, `/blog/*`, `/rss.xml`,
`/sitemap.xml`, `/robots.txt` and `/app-ads.txt` blocks carry across close
to verbatim. Confirm the extension wildcards such as `/*.png` actually match
once deployed, rather than assuming they do.

Do not put the security headers in `_headers`. On Workers, `_headers`
applies to static asset responses only, so anything the SSR fallback renders
would come back without them. Those move to the zone in stage 3 instead,
where they apply to every response.

Deploy to the free hostname and check it:

```bash
pnpm build
npx wrangler deploy
```

Then walk the prerendered surface on the `workers.dev` URL: `/`, `/blog`,
one blog post, `/sudoku`, `/rss.xml`, `/sitemap.xml`, `/robots.txt` and
`/app-ads.txt`. Confirm `app-ads.txt` still comes back as
`text/plain; charset=utf-8`, since `netlify.toml` sets that explicitly and
it is easy to lose. Check the WebGL background (`ogl`) and the Framer Motion
transitions, because those are the parts most likely to behave differently
under a different build target.

Rollback: none needed. Nothing live has moved. If the build fights you,
stop here and the site carries on as it is.

## Stage 2: move DNS to Cloudflare, still pointing at Netlify

The live site does not move in this stage. You are only changing who answers
DNS queries. Hosting stays exactly where it is.

The trap: do not let Cloudflare's zone scan build the records for you.
`dig` currently returns `A 54.232.119.62` and
`AAAA 2600:1f1e:7c1:c300::258` for the apex, but those are not real records.
Netlify DNS stores the apex as a proprietary `NETLIFY` alias and synthesises
a geo-selected edge address per query. Copy today's answer as a literal A
record and it will work now and break later, possibly weeks later, with no
obvious cause. Translate it to a CNAME instead. Cloudflare flattens CNAMEs
at the apex automatically, which covers the same ground the alias did.

Enter this set by hand:

Two hostname records, both DNS only:

| Name  | Type  | Value                |
| ----- | ----- | -------------------- |
| `@`   | CNAME | `<site>.netlify.app` |
| `www` | CNAME | `<site>.netlify.app` |

Five MX records on `@`, all Google Workspace:

| Priority | Value                     |
| -------- | ------------------------- |
| 1        | `aspmx.l.google.com`      |
| 5        | `alt1.aspmx.l.google.com` |
| 5        | `alt2.aspmx.l.google.com` |
| 10       | `alt3.aspmx.l.google.com` |
| 10       | `alt4.aspmx.l.google.com` |

Four TXT records:

| Name                | Value                                   |
| ------------------- | --------------------------------------- |
| `@`                 | `v=spf1 include:_spf.google.com ~all`   |
| `@`                 | the OpenAI verification value below     |
| `_dmarc`            | `v=DMARC1; p=none;`                     |
| `google._domainkey` | the DKIM value you captured             |

The OpenAI domain verification value, which is one line:

```
openai-domain-verification=dv-aS2xP6a5jWLYM5V8V8TT4HRd
```

Both Netlify records must be DNS only, not proxied. Proxying them puts
Cloudflare's CDN in front of Netlify's and interferes with Netlify's
certificate renewal, which uses HTTP validation and needs to see the
request. Stage 3 is where the orange cloud comes on, and by then Netlify is
out of the picture.

There are no CAA records on the zone today, so there is nothing to migrate.
Do not add one casually later. A CAA record that omits the issuer Cloudflare
uses will block certificate issuance.

The DKIM value at time of writing, for cross-checking what you captured:

```
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjEh9W34JcRoF
GPQKFvNdGtPoQsVUlpv94TcUaW4aU7aOOgj4Mci2wS+kq2/nk/JgC/4oaOV6drvvIxhEknaI6B
LtUaCgzDACCpK+Mk5QCUs1awMBGlEVHC86VjGNonZ2U2YmKcpbAAqpLJecDyuFBv9+e6bUTgM4
L0pT1+TZ7b8jyOkDw4KSAgiSKIap92F3X1jpYJvGyCVkGCtPYuovtnolcXIRxodWI50pd60siF
YkhAtVkjzonP80rK8Z2XelHtOyQK/iiSCL50Gw4SM1oEEWqd3JKY0GjO1KbRsbTHwv4zUWrYiW
PdonvS6ulk9OmT2lsJ1RhT2JP0kkUf5kZwIDAQAB
```

That is one value on one line. The line breaks above are for this document
only. Strip them before pasting.

Verify against Cloudflare's nameservers before you switch anything, using
the two nameservers Cloudflare assigns you:

```bash
dig @<assigned-ns> barrymichaeldoyle.com MX +short
dig @<assigned-ns> barrymichaeldoyle.com TXT +short
dig @<assigned-ns> google._domainkey.barrymichaeldoyle.com TXT +short
dig @<assigned-ns> www.barrymichaeldoyle.com +short
```

Only once that matches, change the nameservers at Squarespace. Then wait for
propagation and run the same checks without the `@` override. Send yourself
an email from an outside address and reply to it, so you have tested mail in
both directions rather than assuming the MX records are enough.

Do not remove the domain from Netlify DNS yet. Leaving that zone in place is
what makes this stage reversible.

Rollback: set the nameservers back to the four `p06.nsone.net` entries at
Squarespace. Because the Netlify zone still exists, that is the entire
rollback.

## Stage 3: point the apex at the Worker

Only now does hosting actually move.

Attach `barrymichaeldoyle.com` and `www.barrymichaeldoyle.com` to the Worker
as custom domains. Cloudflare replaces the DNS-only CNAMEs from stage 2 with
proxied records it manages itself, so you do not create these by hand.

Move the pieces that `netlify.toml` was handling to the zone, where they
cover SSR responses as well as static assets:

Turn on Always Use HTTPS, which replaces both `http://` redirect blocks.

Turn on HSTS under SSL/TLS, Edge Certificates, matching the existing
`max-age=31536000; includeSubDomains; preload`. Read the warning on that
screen first. HSTS with `preload` and `includeSubDomains` is hard to undo,
and it applies to every future subdomain, Mealy included.

Add a Single Redirect for `www` to the apex, replacing the third redirect
block. The `www` record has to be proxied for this to fire, which attaching
it as a custom domain takes care of.

Add a Response Header Transform Rule for the remaining security headers:
`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`,
`Referrer-Policy` and `Content-Security-Policy: upgrade-insecure-requests`.
A Transform Rule applies to everything the zone serves, which is why these
did not go in `_headers` back in stage 1.

Then re-run the stage 1 checks against the real domain, and confirm the
security headers are present on both a prerendered page and something the
SSR fallback renders.

Set up git-connected deploys through Workers Builds, which replaces
Netlify's build hook. This repo has no `.github/` directory, so there is no
GitHub Actions workflow to update. If you would rather deploy from CI, that
is the point to add one.

Rollback: detach the custom domains and put back the two DNS-only CNAMEs to
`<site>.netlify.app`. Traffic returns to Netlify without touching
nameservers. Keep the Netlify site alive and building for a couple of weeks
so this stays available.

## Stage 4: Mealy and future subdomains

With the zone on Cloudflare, `mealy.barrymichaeldoyle.com` is a Workers
custom domain on the Mealy Worker and nothing more. Every later subdomain
project is the same one step.

Mealy needs a Clerk production instance before it is genuinely live. That is
tracked separately and is not part of this migration. One thing to know when
you get there: free-plan Universal SSL covers `mealy.barrymichaeldoyle.com`
but not a second level such as `clerk.mealy.barrymichaeldoyle.com`. That
does not block anything, because Clerk terminates TLS itself on DNS-only
records, but it is worth knowing before it looks like a problem.

## Cleanup, once you are confident

Give it two weeks of real traffic first. Then remove the domain from Netlify
DNS, unlink it from the Netlify site, delete `netlify.toml`, and drop
`@netlify/vite-plugin-tanstack-start` from `devDependencies`. `.netlify/` is
already gitignored and is local CLI state, so it needs nothing.

Do the dependency removal last. While it is still installed, reverting to
Netlify is a one-line change to `vite.config.ts`.
