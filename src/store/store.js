import { createStore } from 'vuex';

export default createStore({
  state: {
    tagList: []
  },
  getters: {
    getTabList: store => store.tagList
  },
  mutations: {
    ADD_TAGS(state, v) {
      if(state.tagList.indexOf(v)===-1){
        state.tagList.push(v)//添加数据
      }
      
    }
  },
  actions: {
    ADD_TAGS({ commit }, data) {
      commit('ADD_TAGS', data)
    }
  }

})