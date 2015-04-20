'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _cldr = require('cldr');

var _cldr2 = _interopRequireWildcard(_cldr);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _d = require('debug');

var _d2 = _interopRequireWildcard(_d);

var debug = _d2['default']('default-api');
/* Class API */

var API = (function () {
  function API(_this) {
    _classCallCheck(this, API);

    this.options = _this.options;
    this.context = _this;
  }

  _createClass(API, [{
    key: 'set',

    /* Sets the API*/
    value: function set() {
      var _this = this.context;
      var i18n = function i18n() {};
      var l10n = function l10n() {};
      var options = this.options.api;
      _import2['default'].assign(options.header = {}, this.options.header);
      debug('options exists:', !!options);
      /**
      * @method i18n
      * @description I18ns the arguments.
      * Note: You can change ID for i18n. See Configuration.
      * @param  {...*} arg The arguments to internationalize.
      *
      * @example <caption>Phrase notation with default parser.</caption>
      *
      * // Assuming the locale === 'ja',
      * // a basic phrase returns 'こんにちは'
      * __('Hello');
      *
      * // a basic phrase with sprintf returns 'Bob こんにちは'
      * __('Hello %s', 'Bob');
      *
      * // a basic phrase with interpolation returns 'Bob こんにちは'
      *  __('Hello {{name}}', {name:'Bob'});
      *
      * @example <caption>Bracket notation with default parser.</caption>
      *
      * // Assuming the locale === 'ja',
      * // a basic bracket phrase returns 'おっす'
      * __('[Hello].informal');
      *
      * // a basic bracket phrase with sprintf returns 'Bob おっす'
      * __('[Hello %].informal', 'Bob');
      *
      * // a basic bracket phrase with interpolation returns 'Bob おっす'
      * __('[Hello {{name}}].informal', {name:'Bob'});
      *
      * @example <caption>Dot notation with default parser.</caption>
      *
      * // Assuming the locale === 'ja',
      * // a basic dot phrase returns 'おっす'
      * __('greeting.hello.informal');
      *
      * // a basic dot phrase with sprintf returns 'Bob おっす'
      * __('greeting.hello.person.informal', 'Bob');
      *
      * //a basic dot phrase with interpolation returns 'Bob おっす'
      * __('greeting.hello.person.informal', {name:'Bob'});
      *
      * 
      * @example <caption>All notations with Message Format.</caption>
      * // See '{@link https://github.com/thetalecrafter/
       message-format|message-format}' for documentation.
      * // See updated docs at README:
      * 
      * // Assuming the locale === 'en-us',
      * // a basic phrase with message formatting
      * // returns "You took 4,000 pictures since Jan 1, 2015 9:33:04 AM"
      * __('You took {n,number} pictures since 
       {d,date} {d,time}', { n:4000, d:new Date() });
      *
      * // a basic bracket phrase with message formatting
      * // returns "You took 4,000 pictures since Jan 1, 2015 9:33:04 AM"
      * __('[You took {n, numbers} pictures].since.date', 
       { n:4000, d:new Date() });
      *
      * // a basic dot phrase with message formatting
      * // returns "You took 4,000 pictures since Jan 1, 2015 9:33:04 AM"
      * __('pictures.since.date', { n:4000, d:new Date() });
      *
      * @return {String} Then i18ned string.
      * @public
      */

      i18n[options.global] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        debug('fn:', 'i18n-globalize');
        return _this.parse.apply(_this, args);
      };
      /**
       * @method language
       * @description Returns the name of the current locale.
       * @param  {string} id The locale to change.
       *
       * @example <caption>Get the current language.</caption>
       *
       * // assuming locale === 'en-us'
       * // returns 'American English'
       * __.languages();
       *
       * @example <caption>Get the current language in another locale. </caption>
       *
       * // assuming locale === 'en-us'
       * // returns 'English'
       * __.language('en');
       *
       * // returns 'Japanese'
       * __.language('ja');
       *
       * @return {String} Then i18ned string.
       * @public
       */
      i18n.language = function (id) {
        debug('fn:', 'i18n-language');
        // de-normalize locale
        var locale = _this.header.getLocale().replace('-', '_');
        // denormalize id
        id = id ? id.toLowerCase().replace('-', '_') : locale;
        // store the languages
        return _cldr2['default'].extractLanguageDisplayNames(locale)[id];
      };
      /**
      * @method languages
      * @description Returns the names of the supported locale.
      * @param  {String | Array} arg The locale to change or the supported locales.
      * @param {Array} supported The supported locales.
      *
      * @example <caption>Get the supported languages.</caption>
      *
      * // Assuming locale === 'en-us'
      * // returns ['American English', 'Japanese']
      * __.lanugages();
      *
      * @example <caption>Get the current languages in another locale. </caption>
      *
      * // Assuming locale === 'en-us'
      * // returns ['アメリカ英語', '日本語']
      * __.languages('ja');
      *
      * @example <caption>Override the supported locales.</caption>
      *
      * // Assuming locale === 'en-us'
      * // returns ['English', 'Japanese']
      * __.languages(['en', 'ja']);
      *
      * @example <caption>Override the supported locales 
       and get the languages in another locale.</caption>
      *
      * // Assuming locale === 'en-us'
      * // returns ['英語', '日本語']
      * __.languages('ja', ['en', 'ja']);
      *
      * @return {String} Then i18ned string.
      * @public
      */
      i18n.languages = function (arg, supported) {
        debug('fn:', 'i18n-languages');
        var _supported = [];
        supported = (_import2['default'].isArray(arg) ? arg : supported) || options.header.supported;
        arg = _import2['default'].isArray(arg) ? undefined : arg;
        supported.forEach(function (locale) {
          // de-normalize locales
          locale = locale.replace('-', '_');
          // denormalize arg
          arg = arg ? arg.toLowerCase().replace('-', '_') : _this.header.getLocale().replace('-', '_');
          // store the languages
          _supported.push(_cldr2['default'].extractLanguageDisplayNames(arg)[locale]);
        }, _this);
        return _supported;
      };

      /**
       * @method locales
       * @description Sets or gets the locale.
       * @param  {String} locale The locale to set or get.
       *
       * @example <caption>Get the current locale.</caption>
       *
       * // Assuming locale === 'en-us'
       * // returns 'en-us'
       * __.locale()
       *
       * @example <caption>Set the locale.</caption>
       *
       * // Asumming locale === 'en-us'
       * // sets and returns 'ja'
       * __.locale('ja')
       *
       * @return {String} The locale.
       * @public
       */
      i18n.locale = function (locale) {
        debug('fn:', 'i18n-locale');
        return locale ? _this.header.setLocale(locale) : _this.header.detectLocale();
      };

      /**
       * @description Get the cldr.
       * @return {CLDR} The instance of cldr.
       * @public
       */
      i18n.cldr = function () {
        debug('fn:', 'i18n-cldr');
        return _cldr2['default'];
      };

      /**
       * @method l10n
       * @description Localizes date, time and numbers.
       * See {@link https://github.com/iwatakeshi/tokei|Tokei} for documentation.
       * Note: You can change ID for l10n. See Configuration.
       * @param  {String}  locale The locale to override.
       * @return {Tokei} The instance of Tokei.
       * @public
       */
      l10n[options.localize] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        debug('fn:', 'i18n-localize');
        return _this.localize.apply(_this, args);
      };
      return {
        i18n: i18n,
        l10n: l10n
      };
    }
  }, {
    key: 'get',

    /* Get the API */
    value: function get() {
      return this.apply({});
    }
  }, {
    key: 'apply',

    /* Private: Applies the API to any object */
    value: function apply(object) {
      var _this = this.context;
      _import2['default'].forEach(this.set(), function (item, key) {
        switch (key) {
          case 'i18n':
            _import2['default'].forOwn(item, function (api, subkey) {
              if (!object[subkey]) {
                if (subkey === this.options.api.global) object[subkey] = api.bind(_this);else object[this.options.api.global][subkey] = api.bind(_this);
              }
            }, this);
            break;
          case 'l10n':
            _import2['default'].forOwn(item, function (api, subkey) {
              if (!object[subkey]) {
                if (subkey === this.options.api.localize) object[subkey] = api.bind(_this);
              }
            }, this);
            break;
        }
      }, this);
      debug('API exists:', _import2['default'].has(object, this.options.api.global) && _import2['default'].has(object, this.options.api.localize));
      return object;
    }
  }]);

  return API;
})();

exports['default'] = function () {
  'use strict';
  return {
    main: function main() {
      var object = arguments[0] || arguments[1] || {};
      debug('object exists:', !!object);
      this.api = new API(this).apply(object);
    },
    'package': _import2['default'].merge({
      type: 'api'
    }, require('./package')),
    defaults: require('./defaults')
  };
};

module.exports = exports['default'];