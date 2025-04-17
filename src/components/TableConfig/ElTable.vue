<template>
  <el-table
    v-bind="$attrs"
    :data="tableData"
    @selection-change="getCheckedBox_Value"
  >
  
  <template  v-for="item in column" :key="item.prop">
   <el-table-column v-if="item.type=='switch'" :label="item.label" :align="item.align" :prop="item.prop">
    <template #default="scope">
        <el-switch v-model="scope.row.status"
        active-value="0"
        inactive-value="1"
        />
    </template>
  
   </el-table-column>

    <el-table-column v-bind="item" v-else>
      <template #default="scope" v-if="$slots[item.prop]">
        <slot :name="item.prop" v-bind="scope"></slot>
      </template>
    </el-table-column>

  </template>
  </el-table>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import bus from "@/ulit/Bus.js";
const prop = defineProps({
  tableData: {
    type: Array,
  },
  column: {
    type: Array,
  },
});
onMounted(()=>{


})

//获取多选ID
const getCheckedBox_Value = (row) => {
  bus.emit('getCheckedBoxID',row)
};

</script>

<style>
</style>