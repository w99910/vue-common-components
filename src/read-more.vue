<template>
    <p v-if="enableShowMore">{{ currentText }} <span v-html="show?'Hide':'Show more'" class="text-blue-400"
                                                     @click="toggle"></span></p>
    <button @click="toggle" v-else>{{ currentText }}</button>
</template>

<script setup>
import {computed, ref} from "vue";

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        default: 100,
    },
    enableShowMore: {
        type: Boolean,
        default: true,
    }
})

const show = ref(false);

const truncatedText = props.text.slice(0, props.length) + '...';

const currentText = computed(() => show.value ? props.text : truncatedText)

const toggle = () => {
    show.value = !show.value;
}

</script>

<style scoped>

</style>
