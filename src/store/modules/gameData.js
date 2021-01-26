const state = {
  playerInfos: JSON.parse(sessionStorage.getItem('playerInfos')) ? JSON.parse(sessionStorage.getItem('playerInfos')) : []
};

const mutations = {
  SET_PLAYERINFOS: (state, playerInfos) => {
    state.playerInfos = playerInfos ? JSON.parse(sessionStorage.getItem('playerInfos')) : playerInfos
  }
};
const actions = {
  generateRoutes({
    commit
  }, playerInfos) {
    return new Promise(resolve => {
      commit("SET_PLAYERINFOS", playerInfos)
      sessionStorage.setItem('playerInfos', JSON.stringify(playerInfos))
      resolve(playerInfos)
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
