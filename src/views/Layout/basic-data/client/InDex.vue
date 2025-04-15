<template>
  <EIForm></EIForm>
  <ElTable :tableData="tableData" :column="column.columns"></ElTable>
</template>

<script setup>
import EIForm from "@/components/fromConfig/EIForm.vue";
import ElTable from "@/components/TableConfig/ElTable.vue";
import column from "@/components/basic-data/client.js";
import { List_Client } from "@/requert/basic-data/client.js";
import { ref, onMounted } from "vue";

const tableData = ref();

onMounted(() => {List()});

const List = () => {
  List_Client({
    pageNum: 1,
    pageSize: 10,
  }).then((res) => {
    tableData.value=res.data.rows
  });
};
</script>

<style>
</style>