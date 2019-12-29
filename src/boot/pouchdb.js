import Vue from 'vue'
import PouchDB from 'pouchdb'
import cordovaAdapter from 'pouchdb-adapter-cordova-sqlite'
import pouchdbAuthentication from 'pouchdb-authentication'
import find from 'pouchdb-find'

const DATABASE_URL = 'https://fc49457c-280f-4807-bf98-346c2a60d022-bluemix.cloudantnosqldb.appdomain.cloud/tododb'

PouchDB
  .plugin(cordovaAdapter)
  .plugin(pouchdbAuthentication)
  .plugin(find)
const localDB = new PouchDB('localtododb.db', { adapter: 'cordova-sqlite' })
const remoteDB = new PouchDB(DATABASE_URL, { skip_setup: true })
remoteDB.logIn('fc49457c-280f-4807-bf98-346c2a60d022-bluemix', '6243a2d127a35b31a780eb39aaceed40fa629108cd8c52bd31c76d20fdb9ec6d')

localDB.replicate.from(remoteDB, { live: true, retry: true })
  .on('error', function (err) {
    console.log(err)
  })

Vue.prototype.$db = localDB
