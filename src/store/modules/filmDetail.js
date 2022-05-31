import HttpService from '@/services/HttpService';

export const state = {
    filmInfo: {},
    isLoading: true,
    isError: false,
};
export const getters = {
    getFilmDetail(state) {
        return state.filmInfo;
    },
    getIsLoading(state) {
        return state.isLoading;
    },
};
export const mutations = {
    addFilmDetail(state, data) {
        state.filmInfo = { ...state.filmInfo, ...data };
    },
    setError(state, val) {
        state.isError = val;
    },
    setIsLoading(state, val) {
        state.isLoading = val;
    },
};
export const actions = {
    async getFilmById({ commit }, id) {
        try {
            commit('setError', false);
            const { data } = await HttpService.get(`films/${id}`);
            commit('addFilmDetail', data);
            commit('setIsLoading', false);
        } catch (e) {
            commit('setIsLoading', true);
            commit('setError', true);
        }
    },
};
