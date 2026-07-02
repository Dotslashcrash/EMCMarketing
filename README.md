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
## Secrets & Configuration

Azure Key Vault is the source of truth for secrets and sensitive configuration. This repository uses the shared Griffin Technology Partners Umbrella secret framework for local setup.

Local development uses a generated .env file that is ignored by Git. Run ./scripts/setup-secrets.ps1 on Windows or PowerShell, or ./scripts/setup-secrets.sh on macOS/Linux. The setup flow validates Azure access, pulls secrets through Umbrella, and prompts for missing secrets without printing values.

Production Azure workloads should use Managed Identity and Azure Key Vault directly. Real secret values must never be committed, logged, documented, captured in screenshots, or stored in sample files.
