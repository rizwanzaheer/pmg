export const state = {
    name: 'PMG Assignment',
    isLoading: false,
    cardLayout: JSON.parse(localStorage.getItem('cardLayout')) || false,
};

export const mutations = {
    SWITCH_CARD_LAYOUT(state, val) {
        state.cardLayout = val;
        localStorage.setItem('cardLayout', val);
    },
};
export const actions = {
    changeCardLayout({ commit, state, dispatch, getters }, val) {
        commit('SWITCH_CARD_LAYOUT', val);
    },
};
