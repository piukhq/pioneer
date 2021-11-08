/* eslint-disable */
(() => {
  var wrapper = document.querySelectorAll('.v-hero-block__wrapper')[0];
  wrapper.innerHTML = '';
  wrapper.id = 'bink-app-root';

  var file = 'https://web.dev.gb.bink.com/develop/wasabi/static/css/main.css';
  var link = document.createElement('link');
  link.href = file.substr(0, file.lastIndexOf('.')) + '.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.media = 'screen,print';
  document.getElementsByTagName('head')[0].appendChild(link);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://core.spreedly.com/iframe/iframe-v1.min.js';
  document.body.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://web.dev.gb.bink.com/develop/wasabi/static/js/main.js';
  document.body.appendChild(script);
})()
