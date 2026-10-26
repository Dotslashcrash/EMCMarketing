# Deployment and Revert Log

## 2026-10-26 Social Starter inline form below the hero

- Update date: October 26, 2026 (America/Chicago).
- Updated from computer: `NULLPOINTER` (Windows computer name).
- Branch: `main`.
- Website: https://www.emcmarketing.co/#social-starter
- Removed the Social Starter popup, automatic timer, session suppression, overlay, and popup-opening CTA behavior at the user's request.
- Embedded the complete Votel form in a dedicated section directly after the homepage hero.
- Added a green-accented offer section highlighting the $222 flat price, 30 days, and no-contract terms already present in the form.
- The hero signup CTA now scrolls to the inline form.
- Uses Votel's official inline widget with automatic content-height resizing, without a fixed height, maximum height, or internal scrolling container. The form retains its own styling and submission handling.
- Includes loading/error feedback and a hosted-form fallback link.
- `npm run build` passed, including TypeScript and static export.
- Browser verified a 1,634px form height, no maximum-height constraint, all fields and Submit rendered, no horizontal page overflow, and no Social Starter popup.
- CRM submission and physical-phone testing remain unverified.
- This commit and its Azure workflow record the source change and deployment status. Revert this commit and push to `main` to restore the previous automatic popup.

## 2026-10-26 Social Starter automatic popup follow-up

- Update date: October 26, 2026 (America/Chicago).
- Updated from computer: `NULLPOINTER` (Windows computer name).
- Branch: `main`.
- Website: https://www.emcmarketing.co/
- Changed the signup popup to appear automatically four seconds after the Votel embed SDK is ready, as requested.
- Shows automatically once per browser session. Closing it keeps it dismissed during that session; the Social Starter Signup CTA can reopen it anytime.
- Uses an in-memory fallback when browser session storage is unavailable.
- `npm run build` passed, including TypeScript and static export.
- Browser verified automatic opening without a click, dismissal, suppression after reload, and manual reopening.
- CRM submission and physical-phone testing remain unverified.
- This commit and its Azure workflow record the source change and deployment status. Revert this commit and push to `main` to restore click-only opening.

## 2026-10-26 Social Starter signup popup

- Update date: October 26, 2026 (America/Chicago).
- Updated from computer: `NULLPOINTER` (Windows computer name).
- Requested by the site owner through Codex on this computer.
- Branch: `main`.
- Website: https://www.emcmarketing.co/
- Form: https://app.votel.ai/f/social_starter

### Change summary

- Added a Social Starter Signup CTA beside the homepage consultation CTA.
- Connected the CTA to Votel's official embed SDK and `createPopup('social_starter', { trigger: 'button' }).open()` API.
- The form opens only on a CTA click. Votel provides the overlay, X, Escape, outside-click dismissal, form content, and submission handling.
- Made the modal container scrollable within the viewport so the full form remains reachable on smaller screens without changing the form's own styling.
- Added an accessible dialog name, a labeled close control, background interaction/scroll locking, and focus restoration.
- Kept the hosted form URL as a fallback if the embed script fails to load.

### Verification

- `npm run build` passed, including TypeScript checks and static export.
- Browser checked at a 614 × 668 viewport: form rendered, modal fit the viewport, vertical scrolling was available, and no page horizontal overflow was present.
- Verified Escape, X, outside-click dismissal, reopening, and focus restoration.
- No test signup was submitted. CRM contact creation and a physical-phone check remain unverified.
- The Git commit containing this entry records the exact change; the Azure workflow linked to that commit records deployment status.

### Revert

Revert the commit containing this entry and push the resulting revert commit to `main` to redeploy the previous behavior.

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
