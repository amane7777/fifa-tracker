# FIFA 26 Tracker

Your personal betting tracker, built as an installable app (PWA) that syncs
between your phone and laptop through Supabase.

## What's already done

- Supabase database connected (table: `bets`)
- All 212 of your original logged bets ready to seed on first load
- App builds cleanly and is ready to deploy

## Deploy it (GitHub + Vercel)

### 1. Push this folder to GitHub
In a terminal, from inside this folder:
```bash
git init
git add .
git commit -m "FIFA tracker"
```
Then on github.com, click **New repository**, name it `fifa-tracker`, leave it
empty (no README/license), and follow the "push an existing repository"
instructions it shows you — it'll look like:
```bash
git remote add origin https://github.com/YOUR_USERNAME/fifa-tracker.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel
- Go to vercel.com → **Add New** → **Project**
- Import the `fifa-tracker` repo from GitHub
- Leave all settings as default (Vercel auto-detects Vite)
- Click **Deploy**
- Wait ~1 minute, you'll get a live URL like `fifa-tracker-yourname.vercel.app`

### 3. Install it on your phone
- Open that URL in Safari (iPhone) or Chrome (Android)
- iPhone: tap the Share icon → **Add to Home Screen**
- Android: tap the menu (⋮) → **Add to Home screen** / **Install app**
- It now opens full-screen with its own icon, just like any other app

### 4. Same on your laptop
- Open the same URL in Chrome or Edge
- Click the install icon in the address bar (a small monitor/+ icon), or
  menu → **Install FIFA 26 Tracker**
- Both devices now read and write the same Supabase database — log a bet on
  your phone, it shows up on your laptop too.

## If you ever want to update the app
Make changes, then:
```bash
git add .
git commit -m "describe what changed"
git push
```
Vercel redeploys automatically within a minute or two.
