# EMC Marketing

Next.js + TypeScript source for the EMC Marketing site, deployed as a static export to Azure Static Web Apps.

## Stack

- Next.js app router
- TypeScript project config
- Static export via `output: 'export'`
- Dynamic client-side SEO/AEO metadata per hash section
- Server-rendered field notes for search and answer engines
- Azure Static Web Apps deployment from `out/`

## Local Development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```powershell
npm run build
```

The static export is generated in `out/`.
