<template>
    <div class="flex items-center w-full gap-x-4">
        <input v-if="type==='radio'" class="mr-2" type="radio"
               :checked="isChecked"
               :value="value"
               :class="{'bg-gray-100 text-gray-600':disabled}"
               :disabled="disabled"
               @change="onChange"/>
        <label :class="{'w-3/12':!['checkbox','radio'].includes(type),'mb-6':errorMessage.trim() !== ''}" class="mr-4">
            {{ label }}
        </label>
        <div class="flex flex-col relative" :class="type==='checkbox' ? 'w-6 h-6' : 'w-9/12'">
            <input v-if="type ==='text' || type==='number' || type==='email' || type==='checkbox'|| type==='password'"
                   class="border w-full rounded px-4 py-2"
                   :type="type"
                   :class="{'bg-gray-100 text-gray-600':disabled}"
                   :disabled="disabled"
                   spellcheck="false"
                   :value="modelValue"
                   @input="onChange"
            />
            <select
                v-if="type ==='select'"
                :value="modelValue"
                class="w-full"
                :disabled="disabled"
                @change="onChange">
                <option value>Choose: {{ label }}</option>
                <option v-if="Array.isArray(values)" v-for="value in values" :value="value">{{ value }}</option>
                <option v-if="values instanceof Object && !Array.isArray(values)"
                        v-for="value in Object.entries(values)"
                        :value="value[0]">
                    {{ value[1] }}
                </option>
            </select>
            <span class="text-sm text-red-500 mt-2" v-show="errorMessage.trim().length !== 0">{{
                    errorMessage
                }}</span>
        </div>
    </div>
</template>

<script setup>
// type: text,number,select
import {computed, ref, watch} from "vue";
// rules: ['required','email','password']
const props = defineProps(['modelValue', 'type', 'label', 'values', 'value', 'rules', 'disabled'])
const emits = defineEmits(['update:modelValue'])
const errorMessage = ref('')
const emitUpdate = (val) => {
    emits('update:modelValue', val)
}
// Radio
let isChecked;
if (props.type === 'radio') {
    isChecked = computed(() => {
        return props.modelValue === props.value
    })
}
// DatePicker
let date;
if (props.type === 'date') {
    // since datepicker need v-model, define a ref explicitly and watch it and emit the event if change
    date = ref(props.modelValue)
    watch(date, (val) => {
        emitUpdate(val)
    });
}
const onChange = (e) => {
    validate(e.target.value);
    emitUpdate(e.target.value)
}
const validate = (val) => {
    let hasError = false;
    if (props.rules.length > 0) {
        for (let rule of props.rules) {
            if (!rule) {
                return;
            }
            let value = val.trim();
            if (rule === 'required' && value.length === 0) {
                errorMessage.value = 'This field is required';
                hasError = true;
            }
            if (rule === 'email') {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!emailRegex.test(value)) {
                    errorMessage.value = 'Invalid Email Address';
                    hasError = true;
                }
            }
            if (rule.includes('min')) {
                let min = rule.split(':')[1]
                if (props.type === 'text') {
                    if (value.length < min) {
                        errorMessage.value = `Minimum ${min} characters required`
                        hasError = true;
                    }
                }
                if (props.type === 'number') {
                    value = parseInt(value);
                    min = parseInt(min)
                    if (value < min) {
                        errorMessage.value = `Value cannot be less than ${min}`
                        hasError = true;
                    }
                }
            }
        }
        if (!hasError) {
            errorMessage.value = ''
        }
    }
}
</script>

<style scoped>
</style>
