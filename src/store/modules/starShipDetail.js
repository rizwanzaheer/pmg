import HttpService from '@/services/HttpService';

export const state = {
    starShipInfo: {},
    isLoading: true,
    isError: false,
};
export const getters = {
    getStarShipsDetail(state) {
        return state.starShipInfo;
    },
    getIsLoading(state) {
        return state.isLoading;
    },
};
export const mutations = {
    addStarShipsDetail(state, data) {
        state.starShipInfo = { ...state.starShipInfo, ...data };
    },
    setError(state, val) {
        state.isError = val;
    },
    setIsLoading(state, val) {
        state.isLoading = val;
    },
};
export const actions = {
    async getStarShipsById({ commit }, id) {
        try {
            commit('setError', false);
            const { data } = await HttpService.get(`starships/${id}`);
            commit('addStarShipsDetail', data);
            commit('setIsLoading', false);
        } catch (e) {
            commit('setIsLoading', true);
            commit('setError', true);
        }
    },
};
