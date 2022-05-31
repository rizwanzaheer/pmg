import { createI18n as _createI18n } from 'vue-i18n';
import messages from './locales/index';

export const SUPPORT_LOCALES = ['en', 'zh_cn'];

export function createI18n() {
    return _createI18n({
        legacy: false,
        globalInjection: true,
        locale: localStorage.getItem('lang') || 'en',
        fallbackLocale: 'en',
        messages,
    });
}

export const i18n = createI18n();
