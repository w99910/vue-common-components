<template>
    <div :id="id"
         class="z-[1000] bg-[rgba(0,0,0,0.6)] pop-over w-screen flex items-start py-12 justify-center h-screen top-0 left-0 fixed overflow-x-hidden overflow-y-auto ">
        <slot class="flex flex-col py-8 items-center justify-center">
        </slot>
    </div>
</template>

<script setup>
// Emit an event called 'click-outside' when the user clicks outside the pop-over element
import {onMounted, onUnmounted} from "vue";
import {Random} from "js-utils";

const emits = defineEmits(['click-outside'])

const id = Random.string(10)

function handleClick(e) {
    if (e.target.classList.contains('pop-over')) {
        emits('click-outside');
    }
}

function handleEscape(e) {
    if (e.key === 'Escape') {
        emits('click-outside');
    }
}

onMounted(() => {
    const element = document.getElementById(id)
    document.querySelector('body').appendChild(element)
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClick)
    document.removeEventListener('keydown', handleEscape)
})

</script>

<style scoped>

</style>
