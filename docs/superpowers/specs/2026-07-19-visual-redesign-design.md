# Visual Redesign — 「檢測單」設計系統

**Date:** 2026-07-19
**Goal:** Replace the templated SaaS look (blue/purple gradients, glassmorphism, pill badges, floating orbs) with an identity grounded in the shop's actual world: refurbished hardware, inspection sheets, warranty seals.

## Diagnosis of the old style

- Hero: white text over a glass overlay over a stock photo — washed out, near-unreadable.
- Generic Tailwind-blue/violet/cyan palette, glass cards, pulse-dot pill badges on every section: reads as an AI/SaaS template, wrong register for a 二手電腦 shop.
- All content gated behind JS animations (`.reveal` starts at `opacity: 0` in static CSS) — no JS or slow JS means a blank page.
- Hydration mismatch: `Input`/`TextArea` generated ids with `Math.random()`.
- Fake form success (setTimeout), dead social links, filter buttons for 3 items, stats duplicated in two sections, broken English tagline.
- No CJK typography plan: Geist loaded but overridden by Inter; Chinese rendered in system fallback.

## Concept

**檢測單 (the inspection sheet).** A refurbished machine earns trust through its test record. The page speaks the workshop's language — spec tables, test checklists, part labels, warranty seals — precise, honest, unglamorous confidence.

## Tokens

Palette (light):
- 工作紙 paper `#F2F4F0` — cool gray-green workshop paper (anti-static mat)
- 墨 ink `#1A211C`, 次要 soft `#5E6963`, 隔線 line `#D8DED8`, card `#FFFFFF`
- PCB 綠 accent `#0B6E4F` (hover `#085A40`) — solder-mask green, the only interactive color
- 保固黃 seal `#FFC53D` — warranty-sticker yellow, used exactly twice (hero tag chip, nothing else load-bearing)

Dark: paper `#111713`, card `#171E19`, ink `#E8EDE8`, line `#2A322C`, accent `#46B98C` with dark on-accent text.

Type:
- Headings/body: **Noto Sans TC** (variable; 900 for display) — CJK-first identity
- Data voice: **IBM Plex Mono** — every number, price, phone, label, eyebrow; the spec-sheet register (and IBM = PC heritage)

Layout: max-w-6xl, left-aligned, solid 1px lines, 6–8px radius, faint perfboard dot-grid texture on hero. No glass, no gradients, no scale-on-hover.

## Signature

The hero's 整備檢測紀錄 tag card: a physical-feeling inspection tag (punched hole, dashed perforations, spec table, PASS checklist, barcode strip, warranty-yellow chip, 「價格・來電報價」), slightly tilted, straightens on hover. Caption: 每台出貨機,都有一張這樣的紀錄.

## Structure & UX changes

1. Hero — locality eyebrow, thesis headline 「好電腦,不必是新電腦。」, phone number as first-class CTA next to 取得報價, 3-fact strip. No stock photo.
2. About — value copy + 4-step refurb process (real sequence → numbered) + single stats band (deduped).
3. Services — 4 real offers (銷售/租賃/維修/企業 IT), `+`-marker feature lists, warranty claims taken from the old static site (購買與租賃均含免費保固).
4. Cases — existing 3 case texts restyled as 建置紀錄 (mono CASE ids, chips); category filter removed (noise at n=3).
5. Contact — honest channels first: tel:, **LINE (real lin.ee/6GugdVj link from the old site)**, mailto, address/hours. Form composes a mailto URL instead of faking success.
6. Footer — compact, dead social links removed.

Fixes bundled: `useId` for form ids (hydration), JS-gated reveal (`html.js` class) so no-JS users see everything, `scroll-margin-top` for anchors, remaining framer-motion removed (finishes the 2026-04-24 migration), focus-visible outlines, reduced-motion respected.
