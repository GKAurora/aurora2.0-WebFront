import Vue from 'vue'
import Vuex from 'vuex'
import { requestUserInfo } from '@/api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tagsList: [],    //标签栏
    collapse: false,
    user: {
      name: '',
      permissions: [],
      accessMenu: []
    },
    source: {
      token: null,
      cancel: null
    },
    siteMsg: {
      siteTree: [],
      currentSiteNode: {
        tree_level: 0
      },
      siteId: '/'
    },
    timeFrame:[]
  },
  mutations: {
    setSiteId(state, id){
      state.siteMsg.siteId = id
    },
    setSiteNode(state, currentSiteNode){
      state.siteMsg.currentSiteNode = currentSiteNode
    },
    setTime(state,time){
      state.timeFrame=time
    },
    setUser(state, { user }) {
      state.user.name = user.name
      state.user.permissions = user.permissions
      state.user.accessMenu = user.accessMenu
    },
    deleteUser(state) {
      state.user.name = ''
      state.user.permissions = []
      state.user.accessMenu = []
    },
    updateSource(state, { source }) {
      state.source = source
    },
    //标签栏
    delTagsItem(state, data) {
      state
        .tagsList
        .splice(data.index, 1);
    },
    //设置标签
    setTagsItem(state, data) {
      // console.log(data)
      state
        .tagsList
        .push(data)
    },
    clearTags(state) {
      state.tagsList = []
    },
    closeTagsOther(state, data) {
      state.tagsList = data;
    },
    closeCurrentTag(state, data) {
      for (let i = 0, len = state.tagsList.length; i < len; i++) {
        const item = state.tagsList[i];
        if (item.path === data.$route.fullPath) {
          if (i < len - 1) {
            data
              .$router
              .push(state.tagsList[i + 1].path);
          } else if (i > 0) {
            data
              .$router
              .push(state.tagsList[i - 1].path);
          } else {
            data
              .$router
              .push("/");
          }
          state
            .tagsList
            .splice(i, 1);
          break;
        }
      }
    },
    // 侧边栏折叠
    hadndleCollapse(state, data) {
      state.collapse = data;
    }
  },
  actions: {
    requestUserInfo({ commit }) {
      return requestUserInfo().then(user => {
        commit('setUser', { user })
      })
    }
  },
  modules:{}
})
