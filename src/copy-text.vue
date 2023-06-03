<template>
    <button @click="copy" class="px-4 py-2 bg-gray-100 border rounded">
        <span v-show="!copied">
            <slot>Copy Text</slot>
            </span>
        <span v-show="copied" class="flex gap-x-2 text-green-600 items-center justify-center">
           <slot name="success">
            <span class="w-5 h-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="w-full h-full">
                <path d="m12 15 2 2 4-4"></path>
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
            </span>
               Copied
        </slot>
        </span>
    </button>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

const copied = ref(false);

const emits = defineEmits(['copied']);

const copy = async () => {
    try {
        await navigator.clipboard.writeText(props.text);
        copied.value = true;
        emits('copied', true)
        setTimeout(() => {
            copied.value = false;
        }, 2000)
    } catch (err) {
        copied.value = false;
        emits('copied', false, err)
        console.log('error copied', err)
    }
}
</script>

<style scoped>

</style>
