
output link : 



What to download & install (once)

Node.js 20 LTS (or newer 18.18+)
Next.js 15 needs a modern Node runtime.

VS Code
Recommended extensions:

ESLint

Prettier – Code formatter

Tailwind CSS IntelliSense

TypeScript ESLint (optional)

GitLens (optional)

Git (optional but handy)

Genkit CLI (global)

npm i -g genkit


Genkit will read your Gemini API key from env vars like GEMINI_API_KEY or GOOGLE_API_KEY. 
Firebase
+2
Google AI for Developers
+2

(Optional) Firebase CLI — only if you plan to deploy to Firebase App Hosting later

npm i -g firebase-tools

🧩 What you need to add to the project

Create a .env.local file in the project root for your API key(s):

# Required for the Google AI (Gemini) model used by Genkit
# Use ONE of these; GEMINI_API_KEY is the current standard.
GEMINI_API_KEY=your_api_key_here
# or
# GOOGLE_API_KEY=your_api_key_here


Genkit/Google AI clients auto-detect GEMINI_API_KEY or GOOGLE_API_KEY. Pick one; if both exist, Google libraries usually prioritize GOOGLE_API_KEY. 
Firebase
+1

No other env vars are required by the code you shared.

📦 Commands you’ll use

The project’s package.json contains these scripts:

Dev server: npm run dev (runs Next.js on http://localhost:9002
)

Build: npm run build

Start (prod): npm start

Lint: npm run lint

Type-check: npm run typecheck

Genkit dev server (optional):

npm run genkit:dev

npm run genkit:watch

🧠 README content you can copy-paste

Paste the following into your README.md to make the project runnable for anyone:

# Firebase Studio – Next.js + Genkit Starter

This is a Next.js 15 (TypeScript) app styled with Tailwind and shadcn/ui. It includes a minimal Genkit setup that uses Google AI (Gemini).

## Prerequisites

- Node.js 20 LTS (or >= 18.18)
- VS Code (recommended)
  - Extensions: ESLint, Prettier, Tailwind CSS IntelliSense
- (Optional) Git
- Genkit CLI (global): `npm i -g genkit`
- (Optional) Firebase CLI for deployment: `npm i -g firebase-tools`

## Setup

1. Clone or unzip the project and open it in VS Code.
2. Install dependencies:
   ```bash
   npm install


Create a .env.local in the project root:

# Use ONE of these
GEMINI_API_KEY=your_api_key_here
# or
# GOOGLE_API_KEY=your_api_key_here


Start the dev server:

npm run dev


The app runs at http://localhost:9002
.

Scripts

npm run dev – Start Next.js dev server (port 9002)

npm run build – Production build

npm start – Start the built app

npm run lint – Lint with ESLint

npm run typecheck – TypeScript type check

npm run genkit:dev – Start Genkit dev process

npm run genkit:watch – Start Genkit dev with file watch

Project Structure (high level)
src/
  app/            # Next.js App Router (pages, layout, styles)
  components/     # UI components (includes shadcn/ui)
  hooks/          # React hooks
  ai/             # Genkit config (model selection, dev entry)
  lib/            # Utilities and types

Tech Notes

Next.js 15 with the App Router.

Tailwind CSS configured via tailwind.config.ts and postcss.config.mjs.

shadcn/ui components in src/components/ui.

Genkit configured in src/ai/genkit.ts:

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

VS Code Tips

Install ESLint and Prettier extensions.

Enable "Format on Save" for consistent code style.

Type checking: npm run typecheck.

Troubleshooting

ERR: Missing API key – Ensure .env.local has GEMINI_API_KEY or GOOGLE_API_KEY, then restart dev server.

Node version errors – Use Node 20 LTS (recommended).

Port in use – The dev server runs on port 9002; free the port or change the script.

(Optional) Deploying to Firebase App Hosting

This repo includes apphosting.yaml. To deploy:

firebase login
firebase init hosting  # if not initialized
npm run build
firebase deploy


Docs: Set GEMINI_API_KEY/GOOGLE_API_KEY in your deployment environment/secrets as needed.


---

# 🧭 How the process works (explained simply)

1. **Install tools** (Node, VS Code, Genkit CLI) so your machine can run the app.  
2. **Get a Gemini API key** from Google AI Studio and put it in `.env.local`. Genkit/Google AI libraries auto-read `GEMINI_API_KEY` or `GOOGLE_API_KEY`. :contentReference[oaicite:2]{index=2}  
3. **Install npm packages** (`npm install`) — this pulls Next.js, Tailwind, shadcn/ui, Genkit, etc.  
4. **Run dev** (`npm run dev`) — Next.js serves the app at `http://localhost:9002`.  
5. **(Optional) Run Genkit helpers** (`npm run genkit:dev`/`genkit:watch`) if you add flows or background AI logic. :contentReference[oaicite:3]{index=3}  
6. **Build & deploy** when ready (`npm run build`, then deploy — e.g., Firebase Hosting).







                    or










                    Next.js + Genkit Starter

A modern, minimal Next.js 15 app using TypeScript, Tailwind CSS, shadcn/ui, and **Genkit (Google AI)** for Gemini integration.  
Built for rapid development and clean design — now styled with **Geist Sans**, the same sleek developer-font aesthetic used in queuectl.

---

## 🧰 Prerequisites

Make sure you have these installed before running the project:

| Tool | Description |
|------|--------------|
| [Node.js 20 LTS](https://nodejs.org/) | Required runtime for Next.js 15 |
| [VS Code](https://code.visualstudio.com/) | Recommended editor |
| [Genkit CLI](https://www.npmjs.com/package/genkit) | AI integration via Google Gemini |
| (Optional) [Firebase CLI](https://firebase.google.com/docs/cli) | For deployment to Firebase Hosting |

Install globally:
```bash
npm i -g genkit
npm i -g firebase-tools   # optional
⚙️ Project Setup
1️⃣ Clone or unzip the project

bash
Copy code
git clone <repo-url> firebase-studio
cd firebase-studio
2️⃣ Install dependencies

bash
Copy code
npm install
3️⃣ Create environment file

Create a .env.local in the project root:

dotenv
Copy code
# Required for Google AI (Gemini) integration
GEMINI_API_KEY=your_api_key_here
# or
# GOOGLE_API_KEY=your_api_key_here
4️⃣ Run the development server

bash
Copy code
npm run dev
App runs at 👉 http://localhost:9002

🧩 Available Scripts
Command	Description
npm run dev	Start Next.js dev server (port 9002)
npm run build	Build for production
npm start	Serve the production build
npm run lint	Run ESLint
npm run typecheck	Run TypeScript type checking
npm run genkit:dev	Start Genkit development server
npm run genkit:watch	Run Genkit with file watch

🖋️ Typography Setup – Geist Sans (Variable)
We use Geist Sans Variable for a clean developer-friendly look.

1️⃣ Install the font
bash
Copy code
npm i @fontsource-variable/geist-sans
2️⃣ Update tailwind.config.ts
ts
Copy code
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "ui-sans-serif",
          "Segoe UI",
          "Roboto",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "Noto Sans"
        ]
      }
    }
  },
  plugins: []
};
export default config;
3️⃣ Add to global CSS
src/app/globals.css

css
Copy code
@import "@fontsource-variable/geist-sans";

:root {
  --font-sans: "Geist Sans Variable";
}

/* Tailwind layers */
@tailwind base;
@tailwind components;
@tailwind utilities;
4️⃣ Enable in layout
src/app/layout.tsx

tsx
Copy code
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans antialiased">
      <body>{children}</body>
    </html>
  );
}
✅ All shadcn/ui and Tailwind text now uses Geist Sans.

📂 Project Structure
csharp
Copy code
src/
  app/           # Next.js App Router (routes, layout, styles)
  components/    # UI components (shadcn/ui)
  ai/            # Genkit AI setup and configuration
  hooks/         # React hooks
  lib/           # Utilities and helpers
  public/        # Static assets
🧠 Tech Stack
Next.js 15 (App Router)

TypeScript

Tailwind CSS + shadcn/ui

Genkit + Google Gemini

Geist Sans Variable font

🧩 Troubleshooting
Issue	Fix
Missing API key	Check .env.local for GEMINI_API_KEY or GOOGLE_API_KEY.
Node version error	Use Node 20 LTS or newer.
Port 9002 in use	Change the port in package.json or stop the running process.

🚀 Deployment (Optional)
To deploy on Firebase Hosting:

bash
Copy code
firebase login
firebase init hosting
npm run build
firebase deploy
Be sure to add your GEMINI_API_KEY or GOOGLE_API_KEY as environment secrets in Firebase.

🪶 Font Inspiration
The Geist Sans font mirrors the clean, technical aesthetic of your queuectl CLI docs — optimized for readability and developer-centric design.

🧾 License
MIT © 2025

yaml
Copy code

---

✅ **How to apply**

1. Copy everything above into your `README.md`.  
2. Run `npm i @fontsource-variable/geist-sans`.  
3. Update `globals.css`, `layout.tsx`, and `tailwind.config.ts` exactly as shown.  
4. Start your dev server — your UI will now use **Geist Sans**, identical in tone to your queuectl project.

---
