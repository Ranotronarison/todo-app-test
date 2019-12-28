import Vue from 'vue'
import VuePouchDB from 'vue-pouch-db'

const bucket = new VuePouchDB({
  config: {
    remote: ''
  }
})

/**
 * A continuer plus tard
 */

Vue.prototype.$pouchdb = bucket
