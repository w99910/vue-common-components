<template>
    <button v-click-outside="clickOutside" @click="showActions = true"
            class="flex items-center gap-x-2 relative">
        <slot></slot>
        <Transition name="dropdown-button">
            <div v-show="showActions"
                 class="z-[100] text-start border absolute text-gray-700 top-11 border shadow transform translate-x-1/2 right-1/2 px-4 rounded bg-white">
                <div v-show="shouldShowArrowIndicator"
                     class="w-4 -top-2 absolute h-4 bg-white border-l border-t transform rotate-45 translate-x-1/2 right-1/2"></div>
                <slot name="items"></slot>
            </div>
        </Transition>
    </button>
</template>

<script setup>
import {ref} from "vue";
import {ClickOutside} from "vue-common-directives";

defineProps({
    shouldShowArrowIndicator: {
        type: Boolean,
        default: true
    }
})

let showActions = ref(false);
const vClickOutside = ClickOutside;
const clickOutside = () => {
    if (showActions.value) {
        showActions.value = false;
    }
}
</script>

<style scoped>
:deep(.dropdown-button-enter-active) {
    transition: all 0.2s ease-out;
    transform-origin: center;
}

:deep(.dropdown-button-leave-active) {
    transition: all 0.2s ease-out;
    transform-origin: center;
}

:deep(.dropdown-button-enter-from),
:deep(.dropdown-button-leave-to) {
    top: 40px;
    opacity: 0;
}
</style>
