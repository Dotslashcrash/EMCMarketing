# Deployment and Revert Log

## 2026-07-08 Brand portal upload and PDF protection deployment

- Branch: `main`
- Commits:
  - `ac618cc` - `Fix brand portal API routing`
  - `17bb512` - `Render portal PDFs without download controls`
- Azure workflow runs:
  - `28975091072` - success
  - `28975382245` - success
- Live site: `https://www.emcmarketing.co/`

### Change summary

- Fixed the deployed Static Web Apps navigation fallback so `/api/*` traffic is excluded from static app rewrites and can reach the linked brand portal backend.
- Tightened the brand portal API helper so static HTML fallback responses are shown as backend routing errors instead of being treated like successful JSON.
- Replaced customer-facing PDF iframes with in-portal canvas previews so the native browser PDF toolbar, open button, and download button are not shown.
- Kept direct PDF opening available in `/admin/` for owner review and management.
- Extended content protection to canvas previews so normal right-click, copy, cut, drag-save, print/save shortcuts, and common developer shortcut paths remain blocked in the customer brand portal.

### Verification

- `npm run build` passed locally before both deployments.
- Azure Static Web Apps workflow completed successfully for both commits.

### Security limitation

Browser-side content protection can block normal download and right-click paths, but anything displayed on a screen can still be captured by screenshot, recording, camera, advanced browser tooling, or network inspection. Higher assurance requires watermarking, lower-resolution previews, or withholding full-resolution source files until final delivery.

### Revert commands

```powershell
git revert 17bb512
git revert ac618cc
git push origin main
```

This creates new commits that reverse the brand portal PDF protection and API routing fixes while preserving history.

## 2026-07-03 SEO/AEO indexing deployment

- Branch: `main`
- Commit: `afb9330`
- Commit message: `Strengthen SEO and answer indexing`
- Azure workflow run: `28689496998`
- Azure status: success
- Live site: `https://yellow-plant-05a58a310.7.azurestaticapps.net/`

### Change summary

- Added page-specific SEO metadata, keywords, canonical URLs, crawler directives, Open Graph data, and Twitter card data.
- Added answer-first content blocks to Home, About, Services, Results & Reviews, Videos, and Contact.
- Added structured data for organization, website, public page list, services, FAQs, reviews, videos, and page-level answers.
- Added `public/llms.txt` for AI and answer-engine context.
- Updated sitemap generation to use the public page list.
- Updated `robots.txt` to allow public pages and disallow `/admin/`, `/brand-portal/`, and `/brand-sample/`.
- Kept private/admin-style routes out of search indexing.

### Verification

- `npm run build` passed locally.
- Azure Static Web Apps workflow completed successfully.
- Live checks confirmed `robots.txt`, `llms.txt`, Services structured data, Results & Reviews structured data, and sitemap coverage.

### Revert command

```powershell
git revert afb9330
git push origin main
```

This creates a new commit that reverses the SEO/AEO deployment while preserving history.
