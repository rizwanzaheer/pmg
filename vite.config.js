import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import ViteRequireContext from '@originjs/vite-plugin-require-context';

import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';

export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true, // enable this when using vue Reactivity Transform macros
        }),
        ViteComponents({
            customComponentResolvers: [AntDesignVueResolver()],
        }),
        viteCompression('algorithm'),
        ViteRequireContext(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        open: true,
    },

    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    'primary-color': '#1DA57A',
                },
            },
        },
    },
});
