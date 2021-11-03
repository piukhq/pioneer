/* eslint-disable */
(() => {
  var wrapper = document.querySelectorAll('.v-hero-block__wrapper')[0];
  wrapper.innerHTML = '';
  wrapper.id = 'bink-app-root';

  var file = 'http://localhost:5000/static/css/main.css';
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
  script.src = 'http://localhost:5000/static/js/main.js';
  document.body.appendChild(script);
})()

/**
 * To inject from localhost run the following commands
 *   NODE_CONFIG_ENV=development THEME=wasabi npm run build
 *   npx serve@6.5.8 --cors -s build
 **/
