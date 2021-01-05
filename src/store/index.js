import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
