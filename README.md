# session-link

Static landing page for `https://bgurmendi.github.io/add#<accountId>`.
Pages (no server-side logic; the account ID lives in the URL fragment):
- `/add/` — release app (`network.loki.messenger`), with store install buttons.
- `/add-debug/` — debug app (`network.loki.messenger.debug`), no install buttons.
Both share `link.js`; the package is set via `data-package` on the script tag.

It detects Android / iOS / in-app webview / desktop and shows the matching buttons
(Android uses an `intent://` link that opens the `session://add#<id>` deeplink handled by the app,
falling back to Google Play).

## Android App Links
`.well-known/assetlinks.json` must be served at `https://bgurmendi.github.io/.well-known/assetlinks.json`
(HTTP 200, `Content-Type: application/json`, no redirects). It lists the SHA-256 signing fingerprints
of `network.loki.messenger` (GitHub, Huawei and Google Play releases, from the app's README), plus
`network.loki.messenger.debug` with the repo's `etc/debug.keystore` fingerprint.
F-Droid builds are signed by F-Droid, so they are not included.
