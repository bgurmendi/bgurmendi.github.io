# session-link

Static landing page for `https://bgurmendi.github.io/add#<accountId>`.
Serve `add/index.html` at the path `/add` (no server-side logic; the account ID lives in the URL fragment).

It detects Android / iOS / in-app webview / desktop and shows the matching buttons
(Android uses an `intent://` link that opens the `session://add#<id>` deeplink handled by the app,
falling back to Google Play).

## Android App Links
`.well-known/assetlinks.json` must be served at `https://bgurmendi.github.io/.well-known/assetlinks.json`
(HTTP 200, `Content-Type: application/json`, no redirects). It lists the SHA-256 signing fingerprints
of `network.loki.messenger` (GitHub, Huawei and Google Play releases, from the app's README).
F-Droid builds are signed by F-Droid and debug builds use a different package, so neither is included.
