<template>
    <div class="relative">
        <button
            @click="showBox"
            :class="buttonClass"
            class="w-auto text-gray-600 info-btn rounded">
            <slot></slot>
        </button>
        <div v-if="shouldShow" v-show="shouldShow"
             v-click-outside="hideBox"
             :class="itemsBoxClass"
             class="absolute shadow-lg mt-1 border flex flex-col gap-y-2 bg-white p-2 rounded">
            <slot name="items"></slot>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {ClickOutside} from "vue-common-directives";

const shouldShow = ref(false);

const vClickOutside = ClickOutside

defineProps(['buttonClass', 'itemsBoxClass'])
const showBox = () => {
    setTimeout(() => {
        shouldShow.value = true;
    }, 100)
}
const hideBox = () => {
    if (shouldShow) shouldShow.value = false;
}
</script>

<style scoped>
</style>
