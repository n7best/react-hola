import React from 'react';
import PropTypes from 'prop-types';

function mustache(string, data) {
  let str = string;
  if (typeof (string) === 'string' && typeof (data) === 'object') {
    Object.keys(data).forEach((key) => {
      str = str.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), data[key]);
    });
  }
  return str;
}

class InternationalProvider extends React.Component {

  getChildContext() {
    return { locale: this.props.locale, getContentByKey: this.getContentByKey.bind(this) };
  }

  getContentByKey(langKey) {
    const { locale, data } = this.props;

    if (data[locale]) {
      if (langKey instanceof Array) {
        let res = {};
        langKey.forEach((key) => {
          res = Object.assign({}, res, this.getSingleContentByKey(data, locale, key));
        });
        return res;
      }
      return this.getSingleContentByKey(data, locale, langKey);
    }

    return false;
  }

  getSingleContentByKey(data, locale, langKey) {
    // Convert JavaScript string in dot notation into an object reference
    // https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
    const translations = langKey.split('.').reduce((o, i) => o[i], data[locale]);
    const res = {};
    const regMustache = /\{\{(.*?)\}\}/g;

    if (translations) {
      // if it's a mastache string return function instead
      Object.keys(translations).forEach((key) => {
        const str = translations[key];
        const matchs = str.match(regMustache);
        if (matchs) {
          const fn = strData => mustache(str, strData);
          res[key] = fn;
        } else {
          res[key] = str;
        }
      });
    }


    return res;
  }

  render() {
    return this.props.children;
  }
}

InternationalProvider.defaultProps = {
  locale: 'en-US',
  data: {}
};

InternationalProvider.childContextTypes = {
  locale: PropTypes.string,
  getContentByKey: PropTypes.func
};

export default InternationalProvider;
