<template>
    <button v-double-click="edit" ref="buttonElement">
        <input :title="currentValue" ref="inputElement"
               :class="isSelect?'bg-blue-200 rounded':'text-gray-800 bg-transparent'"
               :disabled="!isSelect"
               type="text"
               class="text-center cursor-pointer py-1 focus:outline-none text-md"
               @focusout="update"
               v-model="input"/>
    </button>
</template>

<script setup>

import {defineProps, onMounted, ref, defineEmits, watch} from 'vue';
import {DoubleClick} from "vue-common-directives";

const props = defineProps({
    text: String,
})

const emits = defineEmits(['update'])

const isSelect = ref(false);

const vDoubleClick = DoubleClick;

const truncate = (text) => {
    return text.length > 20 ? text.substring(0, 6) + '...' + text.substring(text.length - 6, text.length) : text;
}

const input = ref(truncate(props.text))

const currentValue = ref(props.text);

const inputElement = ref(null);

const buttonElement = ref(null);

const edit = function (e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    isSelect.value = true;
    input.value = currentValue.value;
    setTimeout(() => {
        inputElement.value.focus();
    }, 100);
};

defineExpose({
    edit
})


const update = () => {
    emits('update', input.value)
    isSelect.value = false;
    currentValue.value = input.value;
    input.value = truncate(currentValue.value);
}

const updateInputWidth = (value) => {
    inputElement.value.style.width = (value.length * 0.8) + 1 + 'ch';
}

onMounted(() => {
    updateInputWidth(input.value)
    watch(input, (value) => updateInputWidth(value))
});

</script>

<style scoped>

</style>
