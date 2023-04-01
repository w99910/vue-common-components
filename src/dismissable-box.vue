<template>
    <div v-show="show" class="px-4 gap-x-4 flex items-center w-full py-4 rounded border">
        <slot></slot>
        <button class="w-8 h-8" v-html="closeIcon" @click="show = false"/>
    </div>
</template>

<script setup>
import {closeIcon} from "../assets/icons";
import {ref} from "vue";

const show = ref(true);
</script>

<style scoped>

</style>
