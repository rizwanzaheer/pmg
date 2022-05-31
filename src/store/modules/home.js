import _ from 'lodash';
import HttpService from '@/services/HttpService';

export const state = {
    trendingFilm: {},
    films: [],
    starShips: [],
};
export const getters = {};

export const mutations = {
    addTrendingFilm(state, data) {
        state.trendingFilm = { ...data };
    },
    addFilms(state, data) {
        state.films.push(...data);
    },
    addStarShips(state, data) {
        state.starShips.push(...data);
    },
};
export const actions = {
    async getTrendingFilm({ commit }) {
        try {
            const { data } = await HttpService.get(`films`);
            let result = data.results[0];
            let lastPart = result.url.split('/');
            result.id = parseInt(lastPart.pop() || lastPart.pop());
            commit('addTrendingFilm', result);
        } catch (e) {
            console.log('getTrendingFilm e is: ', e);
        }
    },

    async getFilms({ commit }) {
        try {
            const { data } = await HttpService.get(`films`);
            if (!_.isEmpty(data.results)) {
                data.results.filter((val) => {
                    let lastPart = val.url.split('/');
                    val.id = parseInt(lastPart.pop() || lastPart.pop());
                });
            }
            commit('addFilms', data.results);
        } catch (e) {
            console.log('addFilms e is: ', e);
        }
    },
    async getStarShips({ commit }) {
        try {
            const { data } = await HttpService.get(`starships?limit=40`);
            if (!_.isEmpty(data.results)) {
                data.results
                    .filter((val) => {
                        val.length = val.length.split(',').join('');
                        val.max_atmosphering_speed = val.max_atmosphering_speed.split('km').join('').split('n/a').join('');
                        let lastPart = val.url.split('/');
                        val.id = parseInt(lastPart.pop() || lastPart.pop());
                    })
                    .sort((a, b) => {
                        return parseFloat(a.length) - parseFloat(b.length);
                    });
            }
            commit('addStarShips', data.results);
        } catch (e) {
            console.log('getStarShips e is: ', e);
        }
    },
};
