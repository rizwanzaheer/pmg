import HttpService from '@/services/HttpService';
import _ from 'lodash';

export const state = {
    searchText: '',
    totalPageCount: 0,
    totalResultCount: 0,
    isLoading: false,
    isError: false,
};
export const getters = {
    getIsLoading(state) {
        return state.isLoading;
    },
};
export const mutations = {
    SET_SEARCH_TEXT(state, data) {
        state.searchText = data;
    },

    SET_TOTAL_PAGE_COUNT(state, count) {
        state.totalPageCount = count;
    },
    SET_TOTAL_RESULT_COUNT(state, count) {
        state.totalResultCount = count;
    },

    SET_ERROR(state, val) {
        state.isError = val;
    },
    SET_LOADING(state, val) {
        state.isError = val;
    },
};
export const actions = {
    async changeSearchInput({ commit, state, dispatch, getters }, val) {
        commit('SET_SEARCH_TEXT', val);
    },

    async getFilmById({ commit }, id) {
        commit('SET_LOADING', true);
        try {
            commit('SET_ERROR', false);
            const { data } = await HttpService.get(`films/${id}`);
            // commit('addFilmDetail', data);
            commit('SET_LOADING', false);
        } catch (e) {
            commit('SET_LOADING', false);
            commit('SET_ERROR', true);
        }
    },
};
