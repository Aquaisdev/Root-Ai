# ROOT AI — Heritage GPT

> "Discover the stories that built us."

An AI-powered, gamified interactive guide to Indian heritage, built with **Next.js 14 (App Router) + React + TypeScript + Tailwind CSS**. Built for the PS6 hackathon track: AI storytelling, interactive heritage guidance, and gamified learning.

Three experiences sit around a central AI chatbot:

- 🎮 **Mission Mode** — 10 circuits of heritage puzzles guarding a fictional "deep archive," ending in a game-only server-maze terminal
- 📖 **Story / Comic Mode** — Hampi's rise and fall told through illustrated comic panels
- 🗺️ **Heritage Map** — a real OpenStreetMap-based "Heritage Hunt" across real monuments

All three award XP through a shared, persistent XP system.

---

## 1. Project structure

```
heritage-gpt/
├── app/
│   ├── layout.tsx              # Root layout: fonts, providers, Navbar
│   ├── globals.css             # Design tokens, glass/gradient utilities, keyframes
│   ├── page.tsx                # Homepage (hero + experience cards)
│   ├── chat/page.tsx           # /chat — ROOT AI chatbot page
│   ├── mission/page.tsx        # /mission — Mission Mode (10 circuits)
│   ├── story/page.tsx          # /story — Story / Comic Mode (Hampi demo)
│   ├── map/page.tsx            # /map — Heritage Map (Heritage Hunt)
│   └── api/
│       └── chat/route.ts       # Server-side OpenAI proxy (key never sent to client)
├── components/
│   ├── Navbar.tsx
│   ├── XPBadge.tsx
│   ├── LanguageSelector.tsx
│   ├── BackgroundPattern.tsx   # Signature jali-lattice × circuit motif (SVG)
│   ├── ChatWidget.tsx          # Main chatbot UI
│   ├── ChatMessage.tsx
│   ├── SuggestedPrompts.tsx
│   ├── MissionCircuit.tsx      # Quiz card for circuits 1–9
│   ├── MazeTerminal.tsx        # Fictional "server maze" terminal for circuit 10
│   ├── ComicArt.tsx            # Hand-built SVG illustrations per story panel
│   ├── ComicPanelViewer.tsx    # Comic panel navigation/transitions
│   └── HeritageMap.tsx         # Leaflet map + Heritage Hunt game logic
├── context/
│   ├── XPContext.tsx           # Global XP/level state (persisted to localStorage)
│   └── LanguageContext.tsx     # Language selection + translation lookup
├── lib/
│   ├── translations.ts         # en/hi/kn UI string dictionary (scaffold — extend freely)
│   ├── missions.ts             # Mission Mode quiz + maze data
│   ├── story.ts                # Hampi comic story data
│   ├── heritageSites.ts        # Heritage Hunt map site data + distance helper
│   └── speech.ts               # Voice architecture placeholders (see §5)
├── types/
│   └── index.ts                # Shared TypeScript types
├── .env.local.example          # Copy to .env.local and fill in your key
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 2. Required environment variables

Create a file named **`.env.local`** in the project root (copy `.env.local.example`):

```
OPENAI_API_KEY=sk-...your-key-here...
```

- The key is **only** read server-side inside `app/api/chat/route.ts` — it is never bundled into client-side JavaScript.
- Get a key at https://platform.openai.com/api-keys.
- The app will still run and render every page without a key; only chatbot replies will fail (with a clear on-screen error) until it's set.

---

## 3. Installation & running locally

Requires **Node.js 18.18+** (Node 20 LTS recommended).

```bash
# 1. Install dependencies
npm install

# 2. Add your OpenAI key
cp .env.local.example .env.local
# then edit .env.local and paste your real key

# 3. Run the dev server
npm run dev
```

Open **http://localhost:3000**.

For a production build:

```bash
npm run build
npm run start
```

No other API setup is required — the map uses the public OpenStreetMap tile server directly (no key needed), and the language selector is a self-contained scaffold.

---

## 4. Where to add your OpenAI API key

**File:** `.env.local` (create it in the project root, next to `package.json`)

```
OPENAI_API_KEY=sk-...
```

That's it — `app/api/chat/route.ts` reads `process.env.OPENAI_API_KEY` and restart the dev server after adding/changing it (env files are only loaded at server start).

---

## 5. Voice architecture (speech-to-text / text-to-speech)

The chatbot's mic button and the comic viewer's "Listen to story" button are both wired to `lib/speech.ts`, which currently throws a clear "not implemented" error that the UI catches gracefully (showing a "coming soon" note instead of breaking).

To plug in real voice:

1. **Speech → Text**: capture audio in the browser with the `MediaRecorder` API, POST the resulting blob to a new `app/api/speech-to-text/route.ts`, and call your STT provider (e.g. OpenAI's transcription endpoint) server-side — same pattern as `app/api/chat/route.ts`. Then implement `transcribeSpeech()` in `lib/speech.ts` to call that route.
2. **Text → Speech**: add `app/api/text-to-speech/route.ts` that streams audio back from a TTS provider, then implement `speakText()` in `lib/speech.ts` to fetch and play it via the `Audio` element.

No other component needs to change — `ChatWidget.tsx` and `ComicPanelViewer.tsx` already call these two functions.

---

## 6. Notes on scope (MVP priorities)

Built in the requested priority order: homepage → chatbot → story mode → mission mode → XP system → map → language selector → voice hooks.

- **XP** is stored in React Context and persisted to `localStorage` so progress survives a refresh (no backend/database in this MVP).
- **Mission Mode circuit 10** is an entirely fictional, game-flavored terminal puzzle — no real systems, networks, or techniques are referenced or implemented.
- **Story Mode** ships one demo location (Hampi) with 6 illustrated panels; `lib/story.ts` is structured so more locations can be added as additional entries in `heritageStories`.
- **Heritage Map** ships 6 real, geolocated monuments in `lib/heritageSites.ts` — add more by appending to that array.
- **Language selector** currently translates the homepage hero and nav labels as a working proof of the pattern; `lib/translations.ts` is the single place to extend coverage to more strings and more languages.
