# GEMINI.md — Project Rules & Conventions

This repository hosts the interactive character dossier and build guide for **Vladislak Ulmokina** (Rashemi Human *Thayan Knight*, Arcana Domain Cleric of Azuth) for a **Dungeons & Dragons 5.5 (2024+ rules)** campaign set in Waterdeep.

## 1. Tech Stack & Architecture
- **Strictly Vanilla Web Stack:** Use ONLY plain HTML5, CSS3, and vanilla JavaScript (ES6+). Do **not** introduce any frontend frameworks, CSS frameworks (no Tailwind, Bootstrap, etc.), preprocessors, bundlers, npm packages, or build steps.
- **Static & Offline Friendly:** Every page must work out-of-the-box on **GitHub Pages** and when opened directly via `file://` in a browser (do not rely on runtime `fetch()` of local partials that would fail under `file://` CORS rules).
- **Multi-Page Structure:** Keep content modularized across dedicated HTML pages sharing `css/styles.css` and `js/main.js`:
  - `index.html` — General Information (overview, core stats, skills, stealth armor, iconic weapons)
  - `background.html` — Background (backstory prose, personality traits, Thayan ritual tattoo mechanics, Rashemi ethnicity & roleplay details)
  - `tactics.html` — Tactics & Leveling Guide (combat/social synergies with the Red Wizard + Level 1–12 progression)
  - `lore.html` — Known Lore (expandable, filterable & searchable lore database starting with Thayan deities)
  - `dm.html` — Open Points for DM (5.5 compliance summary, Session 0 alignment questions, DM campaign hooks)
- **Navigation Sync:** Whenever adding, renaming, or reordering pages, update the shared header/drawer navigation and bottom Prev/Next links consistently across all `.html` files.

## 2. Responsive Target Viewports
All layouts, tables, cards, and interactive controls must look and behave cleanly without horizontal overflow across:
1. **iPhone 16 Pro:** `393 × 852` CSS px (animated hamburger drawer navigation, stacked card layout for wide tables, touch-friendly tap targets `≥ 44px`, `env(safe-area-inset-*)` support).
2. **iPad (Landscape):** `1024 × 768` to `1194 × 834` CSS px (horizontal top navigation bar, balanced 2-column & multi-column grids, full readable tables).
3. **MacBook 14-inch:** `1512 × 982` CSS px (constrained max-width container for optimal line length, crisp horizontal navigation, spacious multi-column layouts).

## 3. Theme & Visual System
- **Dark Theme (Default — `data-theme="dark"`):** **Srcery Terminal Color Scheme** (`#1C1B19` background, `#FCE8C3` headings, `#EF2F27`/`#F75341` red, `#FBB829`/`#FED06E` yellow/gold, `#68A8E4` blue, `#98BC37` green, `#2BE4D0` cyan).
- **Light Theme (`data-theme="light"`):** **Ayu Light Terminal Color Scheme** (`#FAFAFA` background, `#FFFFFF` cards, `#5C6166`/`#464C54` foreground, `#F07178`/`#FA6E3F` red-coral accents, `#F2AE49` gold, `#399EE6` blue, `#86B300` green, `#4CB79A` cyan) tuned for WCAG AA contrast.
- **Zero-Flash Persistence:** Persist user theme selection in `localStorage` (`vladislak-theme`) and initialize `data-theme` via a minimal inline `<script>` inside `<head>` on every HTML page to prevent FOUC when navigating between pages.
- **Typography:** Classical serif headings (`Georgia` stack) + clean sans-serif body (`Inter` / system UI stack) + crisp monospace (`ui-monospace`, `SFMono-Regular`, `JetBrains Mono`, `Menlo`) for stat scores, modifiers, AC, level tags, and rule badges.
- **No Print Button:** Do not include a print/PDF button in the UI.

## 4. D&D 5.5 Rules & Character Canon Constraints
- **100% D&D 5.5 (2024+) Compliance:** Use only 2024+ rules (*Player's Handbook 2024*, *Dungeon Master's Guide 2024*, *Forgotten Realms: Heroes of Faerûn*, *Arcana Unleashed*). Zero 2014 legacy mechanics.
- **Stealth-Only Armor:** Do **not** include an armor mode switcher or heavy/noisy medium armor (*Scale Mail* / *Half Plate*). Assume the stealth medium armor setup exclusively: **Breastplate + Shield (`AC 18`, `23` with *Shield*)**, with a brief note for Level 1 starting gold (**Chain Shirt + Shield `AC 17 / 22`** until upgraded for 400 GP).
- **Iconic Weapons (No Melee Attacking):** Because *Divine Order: Thaumaturge* grants proficiency only in **Simple Weapons** (`STR 8`, `DEX 14`), Vladislak carries:
  1. **Iron-Shod Pilgrim's Quarterstaff of Azuth (*Quarterstaff / Arcane Staff*)** — Azuth's canonical favored weapon, *dajemma* pilgrim disguise in Waterdeep, physical doorway blocker for his Red Wizard, and Arcane Focus.
  2. **Concealed Thayan Ritual Kris Dagger (*Dagger*, Finesse `DEX +2`)** — worn under his cloak for *Warding Bond* blood rituals, scraping/testing poisons (*Poisoner's Kit*), and silent utility in the shadows.

## 5. Language, Links & Documentation Sync
- **Language:** Write all character dossier prose, UI navigation, and lore entries in **Czech**, preserving standard English D&D 5.5 mechanical terms (*Shield*, *Warding Bond*, *War Caster*, *Stealth*, *Advantage*, etc.) for rule clarity.
- **Semantic Hyperlinks:** Style external reference links using semantic classes with `target="_blank" rel="noopener noreferrer"`:
  - `a.spell` — Spells and Feats (e.g., AideDD 5.5 cards)
  - `a.lore` — Forgotten Realms lore (Forgotten Realms Wiki)
  - `a.rule` — D&D 5.5 rules and optimization guides (D&D Beyond Free Rules, RPGBOT 2024)
- **Keep Markdown Docs Synced:** Whenever updating character mechanics, gear, or structure in the HTML pages, keep `README.md` and `thayan_knight_cleric.md` aligned.
