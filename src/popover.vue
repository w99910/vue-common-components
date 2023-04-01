<template>
    <div :id="id" style="transform:translateX(0)"
         class="z-[100] pop-over bg-[rgba(0,0,0,0.6)] w-screen h-screen top-0 left-0 fixed flex items-center justify-center">
        <div class="p-4 rounded bg-white pop-over-contents">
            <slot></slot>
        </div>
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
