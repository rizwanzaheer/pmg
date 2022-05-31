import axios from 'axios';

const HttpService = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? import.meta.env.VITE_BASE_API_URL : 'https://swapi.dev/api/',
    timeout: 10000,
});

HttpService.defaults.headers = {
    'Accept-Language': 'en',
};

HttpService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        return err;
    }
);

export default HttpService;
