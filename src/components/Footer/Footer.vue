<script setup>
import FooterMenuLinks from './FooterMenuLinks.vue';
import LanguageSelect from '../LanguageSelect.vue';

import { FOOTER_MENU_ITEMS_HELP } from '@/constants/footerMenuItems';
</script>

<template>
    <footer class="footer flex justify-center">
        <div class="flex w-[100%] justify-between px-10 py-6">
            <div class="footer__left">
                <div class="footer__left-contact">
                    <a href="mailto:rizwanzaheerr@gmail.com">{{ $t('footer.email.support') }}: rizwanzaheerr@gmail.com</a>
                </div>
                <LanguageSelect />
            </div>
            <div class="footer__right">
                <FooterMenuLinks :links="FOOTER_MENU_ITEMS_HELP" />
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.footer {
    background-color: $blue;

    &__left {
        margin-right: 100px;
        &-logo {
            min-width: 55px;
            width: 55px;
        }
        &-contact {
            display: flex;
            margin: 12px 0;
            font-size: 12px;
            color: $grey;
            a {
                color: $grey;
            }
        }
    }

    &__right {
        display: flex;
    }
}
</style>
