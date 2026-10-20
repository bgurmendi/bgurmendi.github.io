(function () {
  var script = document.currentScript;
  var PACKAGE = script.dataset.package;
  var IS_DEBUG = script.dataset.debug === 'true';
  var PLAY_URL = 'https://play.google.com/store/apps/details?id=' + PACKAGE;
  var IOS_URL = 'https://apps.apple.com/app/session-private-messenger/id1470168868';
  var DOWNLOAD_URL = 'https://getsession.org/download';
  var ID_RE = /^[0-9a-f]{66}$/i;

  var ua = navigator.userAgent;
  var isIos = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/.test(ua);
  // Android WebViews carry "; wv)"; iOS WebViews omit "Safari/"; plus common in-app browsers.
  var isWebview = /; wv\)|FBAN|FBAV|Instagram|Line\/|Twitter|MicroMessenger|Snapchat|GSA\//.test(ua) ||
                  (isIos && !/Safari\//.test(ua));

  function el(tag, props) {
    var e = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) { e[k] = props[k]; });
    return e;
  }
  function button(parent, text, href, secondary) {
    parent.appendChild(el('a', { className: 'btn' + (secondary ? ' secondary' : ''), textContent: text, href: href }));
  }

  function render() {
    var id = decodeURIComponent(location.hash.slice(1)).trim();
    var content = document.getElementById('content');
    var error = document.getElementById('error');
    var buttons = document.getElementById('buttons');
    buttons.textContent = '';

    if (!ID_RE.test(id)) { content.hidden = true; error.hidden = false; return; }
    error.hidden = true; content.hidden = false;
    document.getElementById('accountId').textContent = id;

    var deepLink = 'sessionmessenger://add#' + id;
    var hint = document.getElementById('hint');

    if (isWebview) {
      hint.textContent = 'This in-app browser may not be able to open Session. Open this page in your regular browser, or copy the link.';
      var copyLink = el('button', { className: 'btn', textContent: 'Copy link' });
      copyLink.onclick = function () {
        navigator.clipboard.writeText(location.href).then(function () { copyLink.textContent = 'Copied!'; });
      };
      buttons.appendChild(copyLink);
    }

    if (isAndroid) {
      if (!isWebview) hint.textContent = 'Open Session to add this contact.';
      var intent = 'intent://add#' + id + '#Intent;scheme=session;package=' + PACKAGE +
                   (IS_DEBUG ? '' : ';S.browser_fallback_url=' + encodeURIComponent(PLAY_URL)) + ';end';
      button(buttons, 'Open in Session', intent);
      if (!IS_DEBUG) {
        button(buttons, 'Install Session', PLAY_URL, true);
        button(buttons, 'Other download options', DOWNLOAD_URL, true);
      }
    } else if (isIos) {
      if (!isWebview) hint.textContent = 'Open Session to add this contact.';
      button(buttons, 'Open in Session', deepLink);
      if (!IS_DEBUG) button(buttons, 'Install Session', IOS_URL, true);
    } else {
      hint.textContent = 'Open Session on your computer to add this contact, or copy the Account ID above and paste it in Session > New Message.';
      // Session Desktop registers the sessionmessenger:// protocol (macOS, Windows and Linux)
      button(buttons, 'Open in Session Desktop', deepLink);
      var copyId = el('button', { className: 'btn', textContent: 'Copy Account ID' });
      copyId.onclick = function () {
        navigator.clipboard.writeText(id).then(function () { copyId.textContent = 'Copied!'; });
      };
      buttons.appendChild(copyId);
      button(buttons, 'Download Session', DOWNLOAD_URL, true);
    }
  }

  if (IS_DEBUG) document.querySelector('h1').textContent += ' (debug build)';
  window.addEventListener('hashchange', render);
  render();
})();
