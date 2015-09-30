import cldr from 'cldr';
import _ from 'lodash';
import debug from 'gengojs-debug';
var log = debug('api');

/* Class API */
class API {
  constructor(core) {
      log.debug(`class: ${API.name}`, `process: constructor`);
      this.options = core.options;
      this.context = core;
    }
    /* Sets the API*/
  set() {
      log.debug(`class: ${API.name}`, `process: set`);
      var core = this.context;
      var i18n = function() {};
      var l10n = function() {};
      var options = this.options.api;
      _.assign((options.header = {}), this.options.header);
      debug('api', 'info', 'options exists:', !(!options));
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

      i18n[options.global] = function(...args) {
        log.debug(`class: ${API.name}`, `process: i18n`);
        return core.parse.apply(core, args);
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
      i18n.language = function(id) {
        log.debug(`class: ${API.name}`, `process: i18n.languge`);
        // de-normalize locale
        var locale = core.header.getLocale();
        locale = locale.toLowerCase().replace('-', '_');
        // denormalize id
        id = id ? id.toLowerCase().replace('_', '-') : locale;
        // store the languages
        return cldr.extractLanguageDisplayNames(locale)[id];
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
      i18n.languages = (arg, supported) => {
        log.debug(`class: ${API.name}`, `process: i18n.languges`);
        var _supported = [];
        supported = (_.isArray(arg) ? arg : supported) ||
          options.header.supported;
        arg = _.isArray(arg) ? undefined : arg;
        supported.forEach(locale => {
          arg = arg ? arg.toLowerCase() :
            core.header.getLocale();
          arg = arg.replace('_', '-');
          // de-normalize locales
          locale = locale.toLowerCase().replace('-', '_');
          // store the languages
          _supported.push(cldr.extractLanguageDisplayNames(arg)[locale]);
        }, core);
        return _supported;
      };

      /**
       * @method locale
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
      i18n.locale = (locale) => {
        debug('api', 'debug', `class: ${API.name}`, `process: i18n.locale`);
        return locale ?
          core.header.setLocale(locale) :
          core.header.detectLocale ?
          core.header.detectLocale() :
          core.header.getLocale();
      };

      /**
       * @description Get the cldr.
       * @return {CLDR} The instance of cldr.
       * @public
       */
      i18n.cldr = () => {
        log.debug(`class: ${API.name}`, `process: i18n.cldr`);
        return cldr;
      };

      /**
       * Returns the catalog
       * @param  {String} locale The locale to find
       * @return {Object}        The catalog
       */
      i18n.catalog = (locale) => {
        log.debug(`class: ${API.name}`, `process: i18n.catalog`);
        return core.backend.catalog(locale);
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
      l10n[options.localize] = function(...args) {
        log.debug(`class: ${API.name}`, `process: i10n`);
        return core.localize.apply(core, args);
      };
      return {
        i18n: i18n,
        l10n: l10n
      };
    }
    /**
     * Returns the API
     * @returns The API
     */
  get() {
      log.debug(`class: ${API.name}`, `process: get`);
      return this.apply({});
    }
    /* 
     * Applies the API to any object
     * @private
     */
  apply(object) {
    log.debug(`class: ${API.name}`, `process: apply`);
    var core = this.context;
    _.forEach(this.set(), function(item, key) {
      switch (key) {
        case 'i18n':
          _.forOwn(item, function(api, subkey) {
            if (!object[subkey]) {
              if (subkey === this.options.api.global)
                object[subkey] = api.bind(core);
              else
                object[this.options.api.global][subkey] = api.bind(core);
            }
          }, this);
          break;
        case 'l10n':
          _.forOwn(item, function(api, subkey) {
            if (!object[subkey]) {
              if (subkey === this.options.api.localize)
                object[subkey] = api.bind(core);
            }
          }, this);
          break;
      }
    }, this);
    log.debug(`class: ${API.name}`, 'API exists:',
      _.has(object, this.options.api.global) &&
      _.has(object, this.options.api.localize));
    return object;
  }
}

export default function api() {
  'use strict';
  return {
    main: function ship() {
      var object = arguments[0] || arguments[1] || {};
      log.debug('object exists:', !!object);
      return new API(this).apply(object);
    },
    package: _.merge({
      type: 'api'
    }, require('../package')),
    defaults: require('../defaults')
  };
}