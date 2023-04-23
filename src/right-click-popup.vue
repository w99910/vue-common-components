<template>
    <div ref="box" class="p-2 pop-up-box flex flex-col rounded hidden fixed bg-white shadow-lg z-[1000]"
         :style="{top:data.top + 'px',left:data.left + 'px'}">
        <button :class="{'border-b':index !== items.length -1}" :key="index" @click="item.handler"
                v-for="(item,index) in items"
                class="py-2 flex text-gray-600 items-center gap-x-4 px-2 cursor-pointer">
            <span v-html="item.icon" class="w-5 h-5 pointer-events-none"></span>
            <span class="pointer-events-none ">{{ item.name }}</span>
        </button>
    </div>
</template>

<script setup>
import {defineProps, onMounted, reactive, ref} from 'vue';

const data = reactive({
    top: 0,
    left: 0,
});

const box = ref(null);

defineProps({
    items: Array
})

onMounted(() => {
    // listen right click of parent element
    box.value.parentElement.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.ctrlKey) return;
        document.querySelectorAll('.pop-up-box').forEach((popup) => {
            if (e.target !== popup) {
                popup.classList.add('hidden');
            }
        })
        data.top = e.pageY;
        data.left = e.pageX;
        box.value.classList.remove('hidden');
    });

    const onClickOutside = function (e) {
        if (box.value && !box.value.classList.contains('hidden')) {
            box.value.classList.add('hidden')
            e.preventDefault();
            e.stopPropagation()
        }

    };

    document.addEventListener('click', onClickOutside);
})
</script>

<style scoped>
</style>
