<template>
    <div :id="id"
         class="z-[1000] bg-[rgba(0,0,0,0.6)] pop-over w-screen flex items-start py-12 justify-center h-screen top-0 left-0 fixed overflow-x-hidden overflow-y-auto ">
        <slot class="flex flex-col py-8 items-center justify-center">
        </slot>
    </div>
</template>

<script setup>
// Emit an event called 'click-outside' when the user clicks outside the pop-over element
import {onMounted} from "vue";
import {Random} from "js-utils";

const emits = defineEmits(['click-outside'])

const id = Random.string(10)

onMounted(() => {
    const element = document.getElementById(id)
    document.querySelector('body').appendChild(element)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('pop-over')) {
            emits('click-outside');
        }
    })
})

</script>

<style scoped>

</style>
