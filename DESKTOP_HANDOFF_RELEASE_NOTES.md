# Desktop Handoff Release Notes

## Release

Reimagined EMC Marketing site promoted as the main ground truth.

## Ground Truth

- Correct site: `https://yellow-plant-05a58a310.7.azurestaticapps.net`
- Correct source branch after this release: `main`
- Correct deployment workflow: `Azure Static Web Apps CI/CD - EMC Marketing Reimagined`

## What Changed

- Promoted the reimagined Next.js site structure as the repo source of truth.
- Removed the legacy scraped site component so it cannot be accidentally edited or deployed again.
- Removed stale public `robots.txt` and `sitemap.xml` files that pointed to the old yellow-glacier site.
- Disabled the old yellow-glacier Azure workflow by removing it from the repo.
- Updated the reimagined Azure workflow to deploy from `main`.
- Cleaned the Static Web Apps config by removing the old `.jsx` MIME rule from the scraped site.

## Safeguards Added

- Disabled right-click context menus.
- Blocked copy, cut, print, save-page, view-source, and common developer-tool shortcuts.
- Disabled drag-save behavior for images, videos, and embedded media.
- Disabled sitewide text selection while keeping form fields usable.
- Added print blocking for protected site content.
- Tightened embedded YouTube playback settings by removing clipboard and picture-in-picture permissions from the iframe allow list.

## Verification

- `npm ci` completed against the reimagined package lock.
- `npm run build` passed.
- Static output includes the reimagined routes:
  - `/`
  - `/about`
  - `/services`
  - `/results-reviews`
  - `/videos`
  - `/contact`
  - `/robots.txt`
  - `/sitemap.xml`

## Important Limitation

The safeguards keep review materials inside the intended browser workflow, but a public website cannot fully control screenshots or operating-system-level recording. Sensitive content should still use private access and appropriate delivery controls when needed.

## Brand Portal Addition

- Added owner admin page: `/admin/`
- Added customer brand portal page: `/brand-portal/`
- Added a linked Azure Web App backend for `/api` traffic.
- Added private Azure Storage-backed file storage and one-time login records.
- Admin can upload brand materials and generate one-time customer portal links.
- One-time customer login is consumed on first successful use.
- Customer viewing session expires after two hours.
- Admin area disables the right-click/copy/print safeguards so the owner can work normally.
- Brand portal keeps the right-click/copy/print/drag-save safeguards active.
- Azure storage resource: `emcbrandportal01` in `rg-emcmarketing`.
- Azure API backend resource: `emc-brand-portal-webapi` in `rg-emcmarketing`.
- Azure API backend plan: `emc-brand-portal-web-plan` in `rg-emcmarketing`.
- Azure Web App app settings required:
  - `BRAND_PORTAL_STORAGE_CONNECTION_STRING`
  - `BRAND_PORTAL_ADMIN_PASSWORD`

## Lead Spam Protection Addition

- Added dependency-free spam protection for Google Chat website lead alerts.
- Contact form and floating chat form now send a honeypot field and submit timestamp.
- Clarified the floating widget as a message form, not a live chat bot.
- Google Chat lead alerts now warn that replying in Google Chat does not reply to the visitor; follow up by email or phone.
- Upgraded the floating widget into an interactive chat flow.
- Added two-way visitor/rep chat using the existing Azure Table Storage-backed API.
- Added a `/admin/` live chat panel so an available rep can reply directly to the visitor thread.
- `/api/chat-lead` now drops suspected spam before posting to Google Chat using honeypot, submit timing, duplicate, rate-limit, and simple random-text checks.
- Suspected spam returns success to the browser so bots do not get a useful failure signal.
- Desktop pickup notes: `docs/lead-spam-protection-handoff.md`
