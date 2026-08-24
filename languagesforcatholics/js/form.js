/* ===================================
   LANGUAGES FOR CATHOLICS
   Contact form handling
   ===================================

   >>> TO SWITCH THE FORMS ON <<<
   Paste your Web3Forms access key between the quotes on the next line,
   then re-upload THIS FILE ONLY. Both the Contact form and the English
   registration form will start working. Nothing else needs changing.

   Get a key free at https://web3forms.com : enter info@languagesforcatholics.org
   and the key is emailed to you. It looks like this:
   "a1b2c3d4-5678-90ab-cdef-1234567890ab"

   Until a real key is set, the forms hide themselves automatically and
   visitors are shown the email address instead, so no enquiry is ever
   silently lost.
   =================================== */

var WEB3FORMS_KEY = "PASTE_WEB3FORMS_ACCESS_KEY_HERE";

var LFC_EMAIL = "info@languagesforcatholics.org";

document.addEventListener('DOMContentLoaded', function () {
  var keyIsSet = WEB3FORMS_KEY && WEB3FORMS_KEY.indexOf('PASTE') === -1 && WEB3FORMS_KEY.length > 20;
  var forms = document.querySelectorAll('form.contact-form');
  var fallbacks = document.querySelectorAll('.form-fallback');
  var intros = document.querySelectorAll('.form-intro');

  if (!keyIsSet) {
    forms.forEach(function (f) { f.hidden = true; });
    intros.forEach(function (p) { p.hidden = true; });
    fallbacks.forEach(function (f) { f.hidden = false; });
    return;
  }

  fallbacks.forEach(function (f) { f.hidden = true; });

  forms.forEach(function (form) {
    var status = form.querySelector('.form-status');
    var btn = form.querySelector('button[type="submit"]');

    function say(kind, html) {
      if (!status) return;
      status.className = 'form-status form-status--' + kind;
      status.innerHTML = html;
    }

    function failed() {
      say('error', (form.dataset.error || 'Sorry, that did not send. Please email us at') +
        ' <a href="mailto:' + LFC_EMAIL + '">' + LFC_EMAIL + '</a>');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var honey = form.querySelector('input[name="botcheck"]');
      if (honey && honey.checked) return;

      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = form.dataset.sending || 'Sending...'; }
      say('', '');

      var data = new FormData(form);
      data.set('access_key', WEB3FORMS_KEY);
      data.delete('redirect');

      fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.success) {
            form.reset();
            say('ok', form.dataset.success ||
              'Thank you. Your message has arrived safely and we will reply within a few days.');
          } else {
            failed();
          }
        })
        .catch(failed)
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  });
});