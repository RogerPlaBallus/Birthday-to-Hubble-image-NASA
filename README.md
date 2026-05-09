# Hubble Birthday Viewer <br> https://rogerplaballus.github.io/Birthday-to-Hubble-image-NASA/

A React web app that recreates NASA's "What Did Hubble See on Your Birthday?" experience.

Users select a month and day, submit, and see a fullscreen Hubble image with contextual details and links.

## How It Works

- Loads official data from NASA's public CSV: `https://imagine.gsfc.nasa.gov/hst_bday/data.csv`
- Parses each row into image metadata (date, title, caption, links, year)
- Maps selected month/day to the matching CSV entry
- Builds image URLs using NASA's image path pattern:
  `https://imagine.gsfc.nasa.gov/hst_bday/images/{filename}`
- Displays the result in a fullscreen viewer with:
  - Hide/Show Info
  - See Full Image
  - More info
  - Close button to return to the date picker

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
