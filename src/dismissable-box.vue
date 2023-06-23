<template>
    <div v-show="show" class="px-4 gap-x-4 flex items-center w-full py-4 rounded border">
        <slot></slot>
        <button class="w-6 h-6" v-html="closeIcon" @click="close"/>
    </div>
</template>

<script setup>
import {closeIcon} from "../assets/icons";
import {ref} from "vue";

const props = defineProps(['oneTime', 'id'])

const emits = defineEmits(['close'])

const getStorageKey = () => 'dismissable-box-' + props.id;

const close = () => {
    if (props.oneTime && props.id) {
        window.localStorage.setItem(getStorageKey(), true)
    }
    show.value = false;
    emits('close', true)

}
const show = ref(!window.localStorage.getItem(getStorageKey()));
</script>

<style scoped>

</style>
