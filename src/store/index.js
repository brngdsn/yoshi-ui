import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const types = {
  MUTATE_RESOURCE: 'MUTATE_RESOURCE'
}

const api = {
  async get (url) {
    return Vue.http.get(url)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  }
}

export default new Vuex.Store({
  state: {
    categories: [],
    wpJson: {}
  },
  getters: {
    getResource: state => prop => state[prop]
  },
  mutations: {
    [types.MUTATE_RESOURCE] (state, resource) {
      state[resource.prop] = resource.body
    }
  },
  actions: {
    async fetchResource ({commit}, config) {
      return api.get(config.url)
        .then(({body}) => commit(types.MUTATE_RESOURCE, {
          body: body,
          prop: config.prop
        }))
        .catch(e => Promise.reject(e))
    }
  }
})
