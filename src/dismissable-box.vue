<template>
    <div v-show="show" class="px-4 gap-x-4 flex items-center w-full py-4 rounded border">
        <slot></slot>
        <button class="w-8 h-8" v-html="closeIcon" @click="close"/>
    </div>
</template>

<script setup>
import {closeIcon} from "../assets/icons";
import {ref} from "vue";

const props = defineProps(['oneTime', 'id'])

const getStorageKey = () => 'dismissable-box-' + props.id;

const close = () => {
    if (props.oneTime && props.id) {
        window.localStorage.setItem(getStorageKey(), true)
        console.log(window.localStorage.getItem(getStorageKey()));
    }
    show.value = false;

}
const show = ref(!window.localStorage.getItem(getStorageKey()));
</script>

<style scoped>

</style>
