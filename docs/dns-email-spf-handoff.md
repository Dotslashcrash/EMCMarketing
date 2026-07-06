# EMC Marketing DNS Email SPF Handoff

Use this corrected SPF setup for `emcmarketing.co`.

## Delete These Existing SPF Records

Remove both current root TXT SPF records:

```txt
v=spf1 include:dc-aa8e722993._spfm.emcmarketing.co ~all
```

```txt
v=spf1 include:_spf.google.com include:aweber.com ~all
```

## Add This Single Combined SPF Record

Create one root TXT record for `@`:

```txt
v=spf1 include:_spf.google.com include:aweber.com ~all
```

## Why

`emcmarketing.co` currently has two SPF records. A domain should only publish one SPF record, and the `dc-aa8e722993._spfm.emcmarketing.co` include does not resolve. That can cause SPF failures and increase the chance that sent mail lands in spam.

## Keep These Email Records

Keep the Google Workspace MX records, Google DKIM record, AWeber DKIM CNAME records, and the existing DMARC record.

After SPF is fixed and mail is passing cleanly, DMARC can later be tightened from `p=none` to `p=quarantine`.
