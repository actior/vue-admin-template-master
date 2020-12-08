const storage = sessionStorage;

const state = {
  playerList: [],
  roundNumber: storage.getItem("roundNumber")
    ? storage.getItem("roundNumber")
    : 1
};
const mutations = {
  ADD_PLATER_LIST: (state, info) => {
    state.playerList.push(info);
  },
  SET_ROUNDNUMBER: state => {
    state.roundNumber++;
  }
};

const actions = {
  addPlayerList({ commit }, info) {
    commit("ADD_PLATER_LIST", info);
  },
  addRound({ commit }) {
    commit("SET_ROUNDNUMBER");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
