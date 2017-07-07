'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function mustache(string, data) {
  var str = string;
  if (typeof string === 'string' && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    Object.keys(data).forEach(function (key) {
      str = str.replace(new RegExp('{{\\s*' + key + '\\s*}}', 'g'), data[key]);
    });
  }
  return str;
}

var InternationalProvider = function (_React$Component) {
  inherits(InternationalProvider, _React$Component);

  function InternationalProvider() {
    classCallCheck(this, InternationalProvider);
    return possibleConstructorReturn(this, (InternationalProvider.__proto__ || Object.getPrototypeOf(InternationalProvider)).apply(this, arguments));
  }

  createClass(InternationalProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { locale: this.props.locale, getContentByKey: this.getContentByKey.bind(this) };
    }
  }, {
    key: 'getContentByKey',
    value: function getContentByKey(langKey) {
      var _this2 = this;

      var _props = this.props,
          locale = _props.locale,
          data = _props.data;


      if (data[locale]) {
        if (langKey instanceof Array) {
          var res = {};
          langKey.forEach(function (key) {
            res = Object.assign({}, res, _this2.getSingleContentByKey(data, locale, key));
          });
          return res;
        }
        return this.getSingleContentByKey(data, locale, langKey);
      }

      return false;
    }
  }, {
    key: 'getSingleContentByKey',
    value: function getSingleContentByKey(data, locale, langKey) {
      // Convert JavaScript string in dot notation into an object reference
      // https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
      var translations = langKey.split('.').reduce(function (o, i) {
        return o[i];
      }, data[locale]);
      var res = {};
      var regMustache = /\{\{(.*?)\}\}/g;

      if (translations) {
        // if it's a mastache string return function instead
        Object.keys(translations).forEach(function (key) {
          var str = translations[key];
          var matchs = str.match(regMustache);
          if (matchs) {
            var fn = function fn(strData) {
              return mustache(str, strData);
            };
            res[key] = fn;
          } else {
            res[key] = str;
          }
        });
      }

      return res;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return InternationalProvider;
}(React.Component);

InternationalProvider.defaultProps = {
  defaultLocale: 'en-US',
  locale: 'en-US',
  data: {}
};

InternationalProvider.childContextTypes = {
  locale: PropTypes.string,
  getContentByKey: PropTypes.func
};

function withTranslation(WrappedComponent, langKey) {
  function WithTranslation(props, context) {
    var langs = void 0;
    if (langKey) {
      langs = context.getContentByKey(langKey);
    }
    return React.createElement(WrappedComponent, _extends({}, props, {
      langs: langs,
      locale: context.locale
    }));
  }

  var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithTranslation.displayName = 'withTranslation(' + wrappedComponentName + ')';

  WithTranslation.contextTypes = {
    locale: PropTypes.string,
    getContentByKey: PropTypes.func
  };

  return WithTranslation;
}

/* eslint-disable no-undef */
require('es6-promise').polyfill();
require('isomorphic-fetch');

var YandexTranslator = function () {
  function YandexTranslator(apiKey) {
    classCallCheck(this, YandexTranslator);

    var API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

    this.apiKey = apiKey;
    this.apiURL = API_URL + '?key=' + apiKey;
  }

  createClass(YandexTranslator, [{
    key: 'translate',
    value: function translate(texts, source, target, callback) {
      var reqURL = this.apiURL + '&lang=' + target.slice(0, 2);

      var formBody = Object.keys(texts).map(function (key) {
        return 'text=' + encodeURIComponent(texts[key]);
      }).join('&');
      console.log(formBody);

      fetch(reqURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.code === 200) {
          callback(data.text);
        } else {
          console.log('Error:' + data.message);
        }
      });
    }
  }]);
  return YandexTranslator;
}();

exports.InternationalProvider = InternationalProvider;
exports.WithTranslation = withTranslation;
exports.YandexTranslator = YandexTranslator;
