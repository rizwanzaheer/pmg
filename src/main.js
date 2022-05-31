import { createApp } from 'vue';

// 3rd parties libs
import Antd from 'ant-design-vue';

// App Routes
import router from '@/router';

// css
import '@/tailwind.css';

import 'ant-design-vue/dist/antd.css';

// Components
import App from '@/App.vue';

// Store
import store from '@/store';

// i18n
import { i18n } from '@/i18n/i18n';

// Creating App Instance
const app = createApp(App);

// Global Styles
import './styles/app.scss';

app.config.productionTip = false;

app.use(router);
app.use(store);
app.use(i18n);
app.use(Antd);

router.isReady().then(() => {
    app.mount('#app');
});
