<template>
  <el-table
    v-bind="$attrs"
    :data="tableData"
    @selection-change="getCheckedBox_Value"
  >
  
  <template  v-for="item in column" :key="item.prop">
   <el-table-column v-if="item.type=='switch'" :label="item.label">
    <el-switch v-model="$slots[item.prop]"/>
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
import { defineProps, ref } from "vue";
import bus from "@/ulit/Bus.js";
const prop = defineProps({
  tableData: {
    type: Array,
  },
  column: {
    type: Array,
  },
});

const getCheckedBoxID = ref([]);
const getCheckedBox_Value = (row) => {
  const newId = ref(new Set());
  row.forEach((item) => {
    newId.value.add(item.materialId);
    getCheckedBoxID.value = Array.from(newId.value);
    console.log(getCheckedBoxID.value, 88);
    console.log(Array.from(getCheckedBoxID.value));
    bus.emit('getCheckedBoxID',Array.from(getCheckedBoxID.value))
  });
};
</script>

<style>
</style>