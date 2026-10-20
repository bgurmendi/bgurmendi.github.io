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

## iOS Universal Links
`apple-app-site-association` (served at `/apple-app-site-association` and `/.well-known/apple-app-site-association`)
associates `/add/*` and `/add-debug/*` with the app ID `<TeamID>.com.loki-project.loki-messenger`.
The team ID in the file (`SUQ8J2PCT7`) is the one in the iOS project; replace it when testing with your own signing team.
The iOS page button opens `sessionmessenger://add#<id>`.

## Desktop
On desktop browsers the page offers "Open in Session Desktop" (`sessionmessenger://add#<id>`, the protocol registered
by Session Desktop on macOS, Windows and Linux), plus copy-ID and download buttons.
