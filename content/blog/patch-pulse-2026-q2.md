---
title: 'Why I Built Patch Pulse'
date: '2026-04-12'
description: 'The problem that led me to build Patch Pulse, from Slack notifications to a monorepo-aware CLI and an in-progress VS Code extension.'
---

# Why I Built Patch Pulse

One of the more frustrating parts of working with open source is the gap between "the fix is coming in the next release" and the moment that release actually lands on npm.

You report a bug. The maintainer replies quickly. A fix gets merged. Then the waiting starts.

At that point, most of us fall back to the same bad workflow: checking npm repeatedly, refreshing release pages, or trying to remember to come back later. It is a small bit of friction, but it adds up quickly, especially when the package in question sits in a critical path.

I keep running into this problem.

Recently, my team hit exactly this kind of situation with [`bignumber.js`](https://www.npmjs.com/package/bignumber.js). We were interested in a newer release because of some promising performance work, but one behavior change made the upgrade risky for us: initializing `BigNumber` with an empty string could now crash instead of behaving the way our older code expected. In a large, long-lived codebase, that kind of edge case is not always trivial to audit safely. The maintainer mentioned that a follow-up release was in progress, which was useful, but it still left us in the same place: waiting and manually checking for updates.

I had the same feeling earlier on while experimenting with [TanStack Start](https://tanstack.com/start) back when it was still in beta. When you are evaluating fast-moving tooling, you often do not want to keep rechecking whether a fix has shipped. You just want a signal when it has.

That was the seed for Patch Pulse.

## Starting with Slack

The first version of Patch Pulse was a personal Slack bot.

The idea was simple: if I care about a package release, I would rather be notified in Slack than keep polling npm myself. So I built a small service with a database and a scheduled job that checked npm for version changes on packages I was tracking. When something changed, the bot posted an update for me.

That solved the original problem well enough that I kept using it.

Over time, I started pushing it beyond a personal tool. I wanted it to work for other teams too, not just for my own workspace and habits. The Slack app is now much more flexible:

- You can track packages privately for yourself in DMs.
- You can track packages in shared channels for the whole team.
- You can track multiple packages at once.
- You can reduce noise by only notifying on `minor` or `major` releases.
- Notifications include links to the relevant GitHub release pages where possible.

There is also now a small Slack app UI so the bot feels more like a product and less like a collection of slash commands.

Here is the direct ask: if you use Slack and this sounds even remotely useful, please install Patch Pulse in your workspace and give it a try. Slack requires at least five active workspace installs before I can submit the app to the Marketplace, so every early install makes a real difference.

[![Add to Slack](https://platform.slack-edge.com/img/add_to_slack.png)](https://grand-yak-92.convex.site/slack/install)

## Expanding into a CLI

While the Slack bot was solving the "tell me when a package ships a new release" problem, I kept running into a second, related one in my side projects: "show me what is already outdated in this repo right now."

That led to the Patch Pulse CLI.

The CLI scans your project for `package.json` files, checks dependencies against the npm registry, and reports available updates grouped by severity: `patch`, `minor`, and `major`. It is also monorepo-aware, so it can scan multiple workspaces from the repo root instead of treating a large repository like a single app.

I also added an interactive mode so you can choose whether to apply patch-only updates, minor updates, or everything in one go.

More recently, I gave the CLI a substantial rewrite with a few goals:

- proper monorepo support
- zero runtime dependencies
- better performance
- tighter security and reliability
- a cleaner user experience

If you want to try it, the quickest path is:

```bash
npx patch-pulse
```

The package is available on [npm](https://www.npmjs.com/package/patch-pulse).

## It is now a small ecosystem

What started as one personal Slack bot has gradually turned into a small family of tools.

I recently moved the work into a [monorepo on GitHub](https://github.com/barrymichaeldoyle/patch-pulse) so it is easier to evolve the tools together.

There is also a [docs site](https://barrymichaeldoyle.github.io/patch-pulse/).

At the moment, Patch Pulse includes:

- a Slack bot for release notifications
- a CLI for checking and updating outdated dependencies
- an early-stage VS Code extension for inline dependency version information

The VS Code extension is still in development, but I am excited about where it could go. The direction I care about most is making dependency updates easier to evaluate inside the editor, not just easier to detect. Inline version status is useful, but release context, summaries, and links are what really help you decide whether an update is worth your time.

## What I want to build next

There are a few directions I am considering from here.

One is richer release intelligence in the notifier flow, especially summaries that help answer the real question behind every version bump: "Should I care about this update right now?"

Another is expanding beyond Slack into other platforms such as Discord.

The broader theme is consistent: I do not just want Patch Pulse to tell me that something changed. I want it to reduce the effort required to decide what to do next.

## If this is useful to you

What I need most now is real usage and honest feedback.

If Patch Pulse sounds relevant to your workflow, try it out, leave a comment on the `dev.to` version of this post, or [open an issue on GitHub](https://github.com/barrymichaeldoyle/patch-pulse/issues) with bugs, feature requests, or product ideas.

That feedback will shape what gets built next far better than my own guesswork will.
