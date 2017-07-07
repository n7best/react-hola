/* eslint-disable no-undef */
require('es6-promise').polyfill();
require('isomorphic-fetch');

class YandexTranslator {
  constructor(apiKey) {
    const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

    this.apiKey = apiKey;
    this.apiURL = `${API_URL}?key=${apiKey}`;
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
