<template>
    <button v-double-click="edit">
        <input :title="currentValue"
               ref="inputElement"
               :class="[isSelect?'bg-blue-200 rounded':'bg-transparent',shouldTextCenter?'text-center':'text-start']"
               :disabled="!isSelect"
               type="text"
               spellcheck="false"
               class="cursor-pointer py-1 focus:outline-none text-md"
               @focusout="update"
               v-model="input"/>
    </button>
</template>

<script setup>

import {defineProps, onMounted, ref, defineEmits, watch, onUnmounted} from 'vue';
import {DoubleClick} from "vue-common-directives";

const props = defineProps({
    text: String,
    length: {
        type: Number,
        default: 6,
    },
    shouldTextCenter: {
        type: Boolean,
        default: false,
    }
})

const emits = defineEmits(['update'])

const isSelect = ref(false);

const vDoubleClick = DoubleClick;

const truncate = (text) => {
    return text.length > props.length ? text.substring(0, props.length) + '...' : text;
}

const input = ref(truncate(props.text))

const currentValue = ref(props.text);

const inputElement = ref(null);

const edit = function (e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    isSelect.value = true;
    input.value = currentValue.value;
    setTimeout(() => {
        if (inputElement.value) {
            inputElement.value.focus();
        }
    }, 100);
};

defineExpose({
    edit
})


const update = () => {
    if (input.value !== currentValue.value) {
        emits('update', input.value)
    }
    isSelect.value = false;
    currentValue.value = input.value;
    input.value = truncate(currentValue.value);
}

const updateInputWidth = (value) => {
    inputElement.value.style.width = (value.length * 0.8) + 1 + 'ch';
}

function listenEnterKeyDown(e) {
    if (e.key === 'Enter' && isSelect.value) {
        update();
        inputElement.value?.blur();
    }
}

onMounted(() => {
    updateInputWidth(input.value)
    watch(input, (value) => updateInputWidth(value))

    window.addEventListener('keydown', listenEnterKeyDown)
});

onUnmounted(() => {
    window.removeEventListener('keydown', listenEnterKeyDown)
})

</script>

<style scoped>

</style>
