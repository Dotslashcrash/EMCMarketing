# Lead Spam Protection Handoff

## Purpose

Google Chat received repeated junk website lead notifications from the contact form endpoint. The first pass protection is dependency-free and does not add paid services or CAPTCHA.

## What Changed

- Added honeypot fields to the contact form and floating chat form.
- Added a `submittedAt` timestamp to form payloads.
- Clarified that the floating widget is a message form, not a live chat bot.
- Added a Google Chat reply note so Elizabeth knows replies in Google Chat do not reach the site visitor.
- Upgraded the floating widget to an interactive chat flow with two-way rep replies when a rep is available.
- Added live chat storage and polling through the existing Azure Table Storage-backed API.
- Added a live chat reply panel to `/admin/` behind the existing admin password.
- Added server-side checks in `api/chat-lead/index.js` before Google Chat notification delivery:
  - Honeypot field detection.
  - Minimum and maximum submit timing.
  - In-memory duplicate lead suppression.
  - In-memory IP rate limiting.
  - Simple random-text and malformed-contact scoring.
- Suspected spam returns `{ "ok": true }` without sending to Google Chat. This avoids giving bots a useful failure signal.

## Files

- `components/site-widgets.tsx`
- `components/brand-portals.tsx`
- `api/chat-lead/index.js`
- `api/chat-shared.js`
- `api/chat-session/index.js`
- `api/chat-messages/index.js`
- `api/admin-chat-sessions/index.js`
- `api/admin-chat-message/index.js`
- `lib/site-data.ts`
- `docs/lead-spam-protection-handoff.md`

## Tuning

The main thresholds are near the top of `api/chat-lead/index.js`:

- `DUPLICATE_WINDOW_MS`
- `RATE_WINDOW_MS`
- `MIN_SUBMIT_MS`
- `MAX_SUBMIT_MS`
- `MAX_IP_SUBMISSIONS`

If real leads report that the site says a message was sent but Elizabeth does not see it in Google Chat, check Azure Web App logs for `Dropped suspected EMC lead spam:` and loosen the matching rule.

## Notes

The duplicate and rate-limit stores are in process memory. That is enough to stop repeated bursts like the July 2026 spam screenshot, but it resets when the Azure Web App restarts and is not shared across multiple scaled instances. If spam volume grows, move the same checks to Azure Table Storage or add Cloudflare Turnstile.
