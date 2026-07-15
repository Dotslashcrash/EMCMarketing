# Home Pickup: EMC Live Chat

## Current Repo State

- Branch: `main`
- Last fully deployed live-chat commit: `775cd9f` - `Add two-way live chat`
- Live site: `https://www.emcmarketing.co/`
- Azure tenant confirmed for deploys: Griffin Technology Partners
- Azure tenant ID: `7d4ee758-9d8d-4d6d-9543-b1595a1217e0`
- Backend app: `emc-brand-portal-webapi`
- Static Web App: `emcmarketing-reimagined`

## What Is Working

- Floating website chat starts an interactive visitor thread.
- Visitor messages are stored through the existing Azure Table Storage-backed API.
- `/admin/` has a live chat panel behind the existing admin password.
- Reps can reply from `/admin/`, and visitor chat polls for replies.
- Google Chat webhook still sends lead/chat alerts.

## Important Finding

Elizabeth replied inside Google Chat. That does not reach the visitor because the current Google Chat integration is an incoming webhook only.

Current path:

```text
Website/API -> Google Chat alert
```

Missing path:

```text
Google Chat reply -> Website/API -> visitor chat
```

To get that missing path, replace or augment the webhook with a real Google Chat app/bot.

## Latest Breadcrumb Changes

These local repo changes add a safer operational bridge:

- Google Chat alerts include a `Rep reply link`.
- The link points to `https://www.emcmarketing.co/admin/?chat=SESSION_ID`.
- `/admin/?chat=...` opens the matching visitor thread automatically after login.
- Google Chat alert copy now says replies typed in Google Chat do not reach the visitor.

Files touched:

- `api/chat-lead/index.js`
- `components/brand-portals.tsx`
- `docs/lead-spam-protection-handoff.md`
- `docs/home-pickup-live-chat-2026-07-15.md`

## If Picking Up From Home

1. Pull latest `main`.
2. Check whether the breadcrumb commit is already pushed.
3. Run:

```powershell
npm run build
node --check api\chat-lead\index.js
```

4. If deploying the rep reply link change:
   - Push `main` for Static Web Apps.
   - Deploy `api/` to `emc-brand-portal-webapi`.
   - Confirm Azure account is the Griffin Technology Partners tenant before deploying.

## Full Google Chat App Path

For replies directly inside Google Chat to appear in the website chat, build a Google Chat app:

- Create or use a Google Cloud project with billing enabled.
- Enable Google Chat API.
- Configure a Google Chat app with an HTTP endpoint on the EMC backend.
- Add an endpoint that receives Google Chat interaction events.
- Map Google Chat thread IDs to EMC website chat session IDs.
- When Elizabeth replies in the Google Chat thread, write that reply into the EMC chat session.
- Keep the website chat polling endpoint as the visitor delivery path.

Expected cost:

- Google Chat app/API: no obvious separate monthly fee.
- Google Workspace: required; cost depends on her existing plan.
- Extra Azure: likely negligible.
- Real cost is implementation time, roughly 4-8 hours for a careful first version.
