# Deployment and Revert Log

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
