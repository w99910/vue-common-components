<template>
    <div class="w-full h-full border flex flex-col p-4 gap-y-2">
        <div id="filter" class="flex items-center gap-x-4">
            <div class="border-dashed text-sm items-center px-2 border rounded border-gray-700 py-1 flex gap-x-2"
                 v-for="searchValue in reactiveData.searches">
                <p>Search: <span> {{ searchValue }}</span></p>
                <div v-html="removeIcon" @click="removeSearch(searchValue)" class="w-4 h-4 text-red-400"></div>
            </div>
            <div v-show="reactiveData.sort.attribute !== ''"
                 class="border-dashed text-sm items-center px-2 border rounded border-gray-700 py-1 flex gap-x-2">
                <p><span>Sort</span> <span v-text="reactiveData.sort.order"></span> By
                    <span v-text="reactiveData.sort.attribute"></span></p>
                <div v-html="removeIcon" @click="removeSort" class="w-4 h-4 text-red-400"></div>
            </div>
            <div v-for="(filter,index) in reactiveData.filters"
                 class="border-dashed text-sm items-center px-1 border rounded border-gray-700 py-1 flex gap-x-2">
                <select @change="search" @focusout="search" v-model="filter.attribute">
                    <option value="" disabled>Attribute</option>
                    <option v-for="(header,index) in reactiveData.headers" :value="header">{{ header }}</option>
                </select>
                <span v-text="filter.operator"></span>
                <!--                <span @click="filterValue.focus()"-->
                <!--                      v-text="filter.value.trim().length > 0?filter.value : '...'"/>-->
                <input @keyup.enter="search"
                       @focusout="search"
                       placeholder="..."
                       v-model="filter.value"
                       type="text"
                       :size="filter.value.trim() !== ''?filter.value.length:10"
                       :style="{width:filter.value.trim() === ''?'10px':'auto'}"
                       class="bg-white focus:outline-none bg-transparent"/>
                <div v-html="removeIcon" @click="removeFilter(filter)" class="w-4 h-4 text-red-400"></div>
            </div>
            <div class="border-dashed text-sm items-center px-2 border rounded border-gray-700 py-1 flex gap-x-2">
                <p>Search:</p>
                <input @keyup.enter="addGlobalSearch"
                       @focusout="addGlobalSearch"
                       placeholder="..."
                       v-model="reactiveData.search"
                       type="text"
                       :size="reactiveData.search.trim() !== ''?reactiveData.search.length:10"
                       :style="{width:reactiveData.search.trim() === ''?'10px':'auto'}"
                       class="bg-white focus:outline-none bg-transparent"/>
            </div>
            <dropdown-button class="border-dashed px-2 border rounded border-gray-700 py-1 flex gap-x-2">
                <span class="text-sm">Filter</span>
                <div class="w-4 h-4" v-html="filterIcon"></div>
                <template #items>
                    <div @click="addFilter('greater than')"
                         class="whitespace-nowrap py-2 border-b text-sm text-gray-600 text-center">
                        attribute greater than value
                    </div>
                    <div @click="addFilter('less than')"
                         class="whitespace-nowrap py-2 border-b text-sm text-gray-600 text-center">
                        attribute less than value
                    </div>
                    <div @click="addFilter('equal to')"
                         class="whitespace-nowrap py-2 border-b text-sm text-gray-600 text-center">attribute equal to
                        value
                    </div>
                </template>
            </dropdown-button>
            <dropdown-button class="border-dashed px-2 border rounded border-gray-700 py-1 flex gap-x-2">
                <div class="w-5 h-5" v-html="sortAsc"></div>
                <template #items>
                    <button @click="addSort(header,'asc')" v-for="(header,index) in reactiveData.headers"
                            class="whitespace-nowrap py-3 border-b text-sm">Sort Asc By
                        {{ header }}
                    </button>
                </template>
            </dropdown-button>
            <dropdown-button class="border-dashed px-2 border rounded border-gray-700 py-1 flex gap-x-2">
                <div class="w-5 h-5" v-html="sortDesc"></div>
                <template #items>
                    <button @click="addSort(header,'desc')" v-for="(header,index) in reactiveData.headers"
                            class="whitespace-nowrap py-3 border-b text-sm">Sort Desc By
                        {{ header }}
                    </button>
                </template>
            </dropdown-button>
        </div>
        <slot :items="reactiveData.data" :headers="reactiveData.headers">
            <table class="w-full gap-y-4">
                <thead>
                <tr>
                    <th class="py-2" v-for="header in reactiveData.headers">
                        <span>{{ header }}</span>
                    </th>
                </tr>
                </thead>
                <tbody class="w-full border-t text-center">
                <tr class="w-full" :class="{'border-b':index !== reactiveData.data.length -1}"
                    v-for="(item,index) in reactiveData.data">
                    <td v-for="header in headers" class="py-2">
                        <span v-if="!Array.isArray(item[header])" v-text="item[header]"></span>
                        <div v-else v-for="i in item[header]">
                            {{ i }}
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </slot>
    </div>
</template>

<script setup>
import {filterIcon, remove as removeIcon, sortAsc, sortDesc} from "../assets/icons";
import {computed, reactive, ref, toRaw, watch} from "vue";

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    attributes: {
        type: Array,
        required: true
    },
    headers: {
        type: Array,
        required: false,
    }
});
// Initialization
const attributes = function () {
    let t = [];
    for (let attribute of props.attributes) {
        // split by dot
        let splitAttributes = attribute.split('.');
        t.push(splitAttributes);
    }
    return t;
}()
const formatItem = function (item) {
    let t = {};
    for (let i = 0; i <= attributes.length - 1; i++) {
        let value = item;
        const attrs = attributes[i];
        for (let j = 0; j <= attrs.length - 1; j++) {
            let key = attrs[j];
            if (key === '*') {
                try {
                    value = value.map((item) => {
                        if (item[attrs[j + 1]] === undefined) return item;
                        return item[attrs[j + 1]];
                    });
                } catch (e) {
                    console.log(e, item, value, attrs)
                }
                break;
            }
            value = value[key];
            if (!value) {
                break;
            }
        }
        t[props.headers ? props.headers[i] : attrs.join('_').replace('*_', '')] = value;
    }
    return t;
}
let formatData = (data) => data.map((item) => {
    return formatItem(item);
});
let parseHeadersFromAttributes = (attributes) => {
    let t = [];
    for (let attribute of attributes) {
        // split by dot
        let splitAttributes = attribute.split('.');
        t.push(splitAttributes.join('_').replace('*_', ''));
    }
    return t;
}
let originalData = formatData(props.data);
const reactiveData = reactive({
    data: originalData,
    headers: props.headers ?? parseHeadersFromAttributes(props.attributes),
    search: '',
    searches: [],
    filters: [],
    sort: {
        attribute: '',
        order: '',
    }
})
watch(() => props.data, (newVal, oldVal) => {
    originalData = formatData(newVal);
    reactiveData.data = originalData
})
// Add
const addFilter = (operator) => {
    reactiveData.filters.push({
        attribute: '',
        value: '',
        operator: operator
    });
}
const addGlobalSearch = () => {
    if (reactiveData.search.trim().length !== 0 && !reactiveData.searches.includes(reactiveData.search)) {
        reactiveData.searches.push(reactiveData.search);
    }
    reactiveData.search = '';
    search();
}
const addSort = (attribute, order) => {
    reactiveData.sort.attribute = attribute;
    reactiveData.sort.order = order;
    search();
}
// Search
const searchInAttributes = (item, searchValue) => {
    for (let key in item) {
        let value = item[key];
        if (!value) {
            continue;
        }
        if (typeof value === 'object') {
            return searchInAttributes(item[key], searchValue)
        }
        if (Array.isArray(value)) {
            return item[key].map((i) => {
                return searchInAttributes(i, searchValue)
            }).length > 0;
        }
        let match = value.match(new RegExp(searchValue, 'i'));
        if (match) {
            return true;
        }
    }
    return false;
}
// Filter
const compare = (a, b, operator) => {
    if (operator === 'greater than' && a > b) {
        return true;
    }
    if (operator === 'less than' && a < b) {
        return true;
    }
    return operator === 'equal to' && a.toLowerCase() === b.toLowerCase();
}
const filter = (item, filterData) => {
    let value = item[filterData.attribute];
    if (!value) return false;
    if (Array.isArray(value)) {
        return value.filter((val) => {
            return compare(val, filterData.value, filterData.operator)
        }).length > 0;
    }
    return compare(value, filterData.value, filterData.operator)
}
// Main search function
const search = () => {
    if (reactiveData.searches.length !== 0 || reactiveData.filters.length !== 0) {
        reactiveData.data = originalData.filter((value) => {
            for (let search of reactiveData.searches) {
                if (searchInAttributes(value, search.toLowerCase())) {
                    console.log(value)
                    return true;
                }
            }
            for (let filterData of reactiveData.filters) {
                if (filter(value, filterData)) {
                    return true;
                }
            }
            return false;
        })
        console.log(reactiveData.data)
    } else {
        reactiveData.data = originalData;
    }
    if (reactiveData.sort.attribute !== '' && reactiveData.sort.order !== '') {
        reactiveData.data = reactiveData.data.sort((a, b) => {
            if (reactiveData.sort.order === 'asc') {
                return a[reactiveData.sort.attribute] > b[reactiveData.sort.attribute] ? 1 : -1;
            }
            return a[reactiveData.sort.attribute] < b[reactiveData.sort.attribute] ? 1 : -1;
        })
    }
}
const sort = (attribute) => {
    if (reactiveData.sort.attribute === attribute) {
        reactiveData.sort.order = reactiveData.sort.order === 'asc' ? 'desc' : 'asc';
    } else {
        reactiveData.sort.attribute = attribute;
        reactiveData.sort.order = 'asc';
    }
    search();
}
const removeFilter = (filter) => {
    reactiveData.filters = reactiveData.filters.filter((value) => value !== filter);
    search();
}
const removeSearch = (searchValue) => {
    reactiveData.searches = reactiveData.searches.filter((value) => value !== searchValue);
    search();
}
const removeSort = () => {
    reactiveData.sort.attribute = '';
    reactiveData.sort.order = '';
    search();
}
</script>

<style scoped>
</style>
