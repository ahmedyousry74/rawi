import Vue from 'vue'
import VeeValidate, {
  Validator,
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'

import ar from 'vee-validate/dist/locale/ar'
import en from 'vee-validate/dist/locale/en'

import enAttributes from '~/locales/attributes-translation/en-attributes'
import arAttributes from '~/locales/attributes-translation/ar-attributes'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// https://logaretm.github.io/vee-validate/advanced/server-side-validation.html#setting-errors-manually

// Install English and Arabic locales.
Validator.localize({
  en: {
    messages: en.messages,
    attributes: enAttributes,
  },
  ar: {
    messages: ar.messages,
    attributes: arAttributes,
  },
})

export default ({ store, app }) => {
  app.i18n.locale = app.$cookies.get('i18n_redirected')
  Validator.localize(app.i18n.locale)
}
