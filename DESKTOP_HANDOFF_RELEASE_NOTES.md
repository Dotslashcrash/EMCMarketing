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

The safeguards reduce casual copying and direct saving, but a public website cannot fully block screenshots or operating-system-level screen recording. Sensitive content should still use private access, watermarking, signed media URLs, or DRM-capable hosting when needed.
