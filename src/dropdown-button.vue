<template>
    <button v-click-outside="clickOutside" @click="showActions"
            class="flex items-center gap-x-2 relative">
        <slot></slot>
        <Transition name="dropdown-button">
            <div v-show="data.shouldShowActions"
                 :style="{top:data.top,left:data.left}"
                 ref="box"
                 class="z-[100] text-start border absolute text-gray-700 shadow px-4 rounded bg-white">
                <div v-show="shouldShowArrowIndicator"
                     :style="{top:data.arrow.top,
                        borderWidth: data.arrow.borderTop + 'px ' + data.arrow.borderRight + 'px ' + data.arrow.borderBottom + 'px ' + data.arrow.borderLeft + 'px'}"
                     class="w-4 border absolute h-4 bg-white transform rotate-45 translate-x-1/2 right-1/2"></div>
                <slot name="items"></slot>
            </div>
        </Transition>
    </button>
</template>

<script setup>
import {reactive, ref} from "vue";
import {ClickOutside} from "vue-common-directives";

const props = defineProps({
    shouldShowArrowIndicator: {
        type: Boolean,
        default: true
    },
    top: {
        type: String,
        default: '3rem'
    },
    left: {
        type: String,
        default: '-50%'
    }
})

const data = reactive({
    shouldShowActions: false,
    top: props.top,
    left: props.left,
    arrow: {
        top: '-.6rem',
        borderTop: 2,
        borderLeft: 2,
        borderRight: 0,
        borderBottom: 0,
    }
})
const box = ref(null)

let showActions = () => {
    data.shouldShowActions = true;
    setTimeout(() => {
        const rect = box.value.getBoundingClientRect();
        const boxWidth = rect.width;
        const boxHeight = rect.height;

        let padding = 10;

        // check if the box is going out of the screen
        if (rect.top + boxHeight > window.innerHeight) {
            // when box height is larger than the available height between rect top and window top 0,
            // let box scrollable
            if (boxHeight > rect.top) {
                box.value.style.height = `${window.innerHeight - rect.top - padding}px`;
                box.value.style.overflowY = 'scroll';
            } else {
                data.top = `-${boxHeight + padding}px`
                data.arrow.top = 'calc(100% - 0.4rem)'
                data.arrow.borderTop = 0;
                data.arrow.borderBottom = 2;
                data.arrow.borderLeft = 0;
                data.arrow.borderRight = 2;
            }
        }

        if (rect.left + boxWidth > window.innerWidth) {
            let left = rect.left + boxWidth - window.innerWidth;
            data.left = `calc(-50% - ${left}px - ${padding}px)`
        }
    }, 50)
};
const vClickOutside = ClickOutside;
const clickOutside = () => {
    if (data.shouldShowActions) {
        data.shouldShowActions = false;
    }
}
</script>

<style scoped>
:deep(.dropdown-button-enter-active) {
    transition: opacity 0.2s ease-out;
}

:deep(.dropdown-button-leave-active) {
    transition: opacity 0.2s ease-out;
}

:deep(.dropdown-button-enter-from),
:deep(.dropdown-button-leave-to) {
    opacity: 0;
}
</style>
