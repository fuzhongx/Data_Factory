<template>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="page_sizes"
      :small="small"
      background
      layout="total,  prev, pager, next, jumper,sizes,"
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script setup>
import { ref } from 'vue'

//分页配置
const currentPage = ref(1)
const pageSize= ref(10)
const page_sizes=ref([10,15,20])
const small = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

</script>

<style>

</style>