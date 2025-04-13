<template>
<el-table v-bind="$attrs" :data="tableData">
    <el-table-column v-for="item in column" :key="item.prop" v-bind="item">
        <template #default="scope" v-if="$slots[item.prop]">
         <slot :name="item.prop" v-bind="scope"></slot>
        </template>
    </el-table-column>
</el-table>
</template>

<script setup>
import {defineProps} from 'vue'
const prop=defineProps({
    tableData:{
        type:Array
    },
    column:{
        type:Array 
    }
})

</script>

<style>

</style>