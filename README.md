# EMC Marketing

Static mirror of [emcmarketing.co](https://emcmarketing.co/#home), packaged for Azure Static Web Apps.

## Structure

- `index.html` - static shell
- `css/styles.css` - site styles
- `js/app.jsx` - React app loaded through Babel Standalone
- `js/inline-images.js` - embedded image data used by the app
- `images/emc-logo.svg` - logo asset

## Local Preview

Run a simple static server from the repo root:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080/#home`.
