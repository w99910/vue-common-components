<template>
    <div class="flex flex-col gap-y-2 bg-white p-2 rounded">
        <input placeholder="Search ... " v-model="data.search" type="text"
               class="w-full focus:outline-none focus:border-custom-blue border-b-2 py-2 px-1.5"/>
        <slot name="item" v-for="(item,index) in data.items" :item="item" :index="index"/>
    </div>
</template>

<script setup>
import {reactive, watch} from "vue";

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

const data = reactive({
    search: '',
    items: props.items,
})

watch(() => data.search, (search) => {
    if (search.trim().length === 0) {
        data.items = props.items;
        return;
    }
    data.items = props.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
})

</script>

<style scoped>

</style>
