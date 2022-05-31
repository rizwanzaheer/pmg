<script setup>
defineProps({
    style: {
        type: String,
        default: '',
    },
    links: {
        type: Object,
        default: {},
    },
});
</script>

<template>
    <div :style="style">
        <h3 class="title">{{ $t(links.title) }}</h3>
        <ul>
            <li v-for="item in links.items" :key="Math.random()">
                <a :href="item.link">{{ $t(item.title) }}</a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div {
    &:first-child {
        margin-left: 0;
    }
    margin-left: 30px;
    margin-right: 60px;
}

h3 {
    color: $white;
    font-size: 14px;
    font-weight: 300;
}
ul {
    li > a {
        color: $grey;
        font-size: 12px;
        font-weight: 300;

        &:hover {
            color: $lightBlue;
        }
    }
}
</style>
