<template>
    <button v-click-outside="clickOutside" @click="showActions = true"
            class="flex items-center gap-x-2 relative">
        <span class="whitespace-nowrap" v-if="label">{{ label }}</span><span class="whitespace-nowrap">{{
            value
        }}</span>
        <Transition name="select-button">
            <div v-show="showActions"
                 class="z-[100] text-start border absolute text-gray-700 top-11 border shadow transform translate-x-1/2 right-1/2 px-4 rounded bg-white">
                <div v-show="shouldShowArrowIndicator"
                     class="w-4 -top-2 absolute h-4 bg-white border-l border-t transform rotate-45 translate-x-1/2 right-1/2"></div>
                <slot name="items" :select="select" :values="values">
                    <button @click="select(item)" class="whitespace-nowrap py-2" v-for="item in values">{{ item }}
                    </button>
                </slot>
            </div>
        </Transition>
    </button>
</template>

<script setup>
import {ref} from "vue";
import {ClickOutside} from "vue-common-directives";

const props = defineProps({
    shouldShowArrowIndicator: {
        type: Boolean,
        default: true
    },
    modelValue: {
        type: String,
        required: true,
    },
    values: {
        type: Array,
        required: true,
    },
    label: {
        type: String,
    }
})

const value = ref(props.modelValue);

const emits = defineEmits(['update:modelValue']);

let showActions = ref(false);
const vClickOutside = ClickOutside;
const clickOutside = () => {
    if (showActions.value) {
        showActions.value = false;
    }
}

const select = (val) => {
    value.value = val;
    showActions.value = false;
    emits('update:modelValue', value.value);
}
</script>

<style scoped>
:deep(.select-button-enter-active) {
    transition: all 0.2s ease-out;
    transform-origin: center;
}

:deep(.select-button-leave-active) {
    transition: all 0.2s ease-out;
    transform-origin: center;
}

:deep(.select-button-enter-from),
:deep(.select-button-leave-to) {
    top: 40px;
    opacity: 0;
}
</style>
