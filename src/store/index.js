// store/index.js
import { createStore } from 'vuex';
import { notification } from 'ant-design-vue';

import modules from './modules';

const store = createStore({
    state: {
        loading: 0, // see: https://medium.com/@LoCascioNick/create-a-global-loading-progress-indicator-using-vuex-axios-and-nprogress-20451b33145a
        snackbar: false,
        message: '',
        description: '',
        type: 'success',
    },
    mutations: {
        START_LOADING: (state) => state.loading++,
        FINISH_LOADING: (state) => state.loading--,
        CLOSE_SNACKBAR: (state) => (state.snackbar = false),
        OPEN_SNACKBAR: (state, { message, description, variant }) => {
            console.log('success is: ', variant);
            state.snackbar = true;
            state.message = message || 'This is the content of the notification.';
            state.description = description || 'Notification description';
            state.type = variant ? variant : 'success';
            notification[variant]({
                message,
                description,
                onClose: () => {
                    console.log('Notification Clicked!');
                },
                onClick: () => {
                    console.log('Notification closed is clicked Clicked!');
                },
            });
        },
    },
    actions: {
        onShowSuccess({ commit }, { message, description }) {
            commit(
                'OPEN_SNACKBAR',
                {
                    message,
                    description,
                    variant: 'success',
                },
                {
                    root: true,
                }
            );
        },
        onShowError({ commit }, { message, description, variant }) {
            commit(
                'OPEN_SNACKBAR',
                {
                    description,
                    message,
                    variant: variant || 'error',
                },
                {
                    root: true,
                }
            );
        },
    },
    modules,
});

// Automatically run the `init` action for every module,
// if one exists.
for (const moduleName of Object.keys(modules)) {
    if (modules[moduleName].actions && modules[moduleName].actions.init) {
        store.dispatch(`${moduleName}/init`);
    }
}

export default store;
