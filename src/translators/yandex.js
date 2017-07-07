/* eslint-disable no-undef */
require('es6-promise').polyfill();
require('isomorphic-fetch');

/* eslint-disable */
function iterate(obj, cb, write) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] === 'object') { iterate(obj[property], cb, write); } else if (write) {
        obj[property] = cb();
      } else { cb(obj[property]); }
    }
  }
}
/* eslint-enable */

class YandexTranslator {
  constructor(apiKey) {
    const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

    this.apiKey = apiKey;
    this.apiURL = `${API_URL}?key=${apiKey}`;
  }

  translateJSON(json, src, target, callback) {
    const data = [];
    iterate(json, (text) => {
      const regMustache = /\{\{(.*?)\}\}/g;

      if (text.match(regMustache)) {
        data.push(text.replace(regMustache, (match, p1) => `NO_TRANSLATION_${p1.trim()}`));
      } else {
        data.push(text);
      }
    });

    this.translate(data, src, target, (translations) => {
      const newLangData = JSON.parse(JSON.stringify(json));
      let index = 0;

      iterate(newLangData, () => {
        let trans = translations[index];
        index += 1;

        if (trans.indexOf('NO_TRANSLATION_') > -1) {
          trans = trans.replace(/NO_TRANSLATION_(\w+)/g, (match, p1) => `{{ ${p1} }}`);
        }
        return trans;
      }, true);

      callback(newLangData);
    });
  }

  translate(texts, source, target, callback) {
    const reqURL = `${this.apiURL}&lang=${target.slice(0, 2)}`;

    const formBody = Object.keys(texts).map(key => `text=${encodeURIComponent(texts[key])}`).join('&');

    fetch(reqURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
    .then(res => res.json())
    .then((data) => {
      if (data.code === 200) {
        callback(data.text);
      } else {
        callback(`Error:${data.message}`);
      }
    });
  }

}

export default YandexTranslator;
