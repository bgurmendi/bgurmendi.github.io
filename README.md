# session-link

Static landing page for `https://getsession.org/add#<accountId>`.
Serve `add/index.html` at the path `/add` (no server-side logic; the account ID lives in the URL fragment).

It detects Android / iOS / in-app webview / desktop and shows the matching buttons
(Android uses an `intent://` link that opens the `session://add#<id>` deeplink handled by the app,
falling back to Google Play).

## Optional: Android App Links
To open the app directly from `https://getsession.org/add` (without the page), host
`/.well-known/assetlinks.json` on the domain with the app's package and signing SHA-256 fingerprint.
