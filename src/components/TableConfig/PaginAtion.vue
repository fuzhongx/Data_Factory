<template>
   <el-pagination v-model:current-page="Page.currentPage" v-model:page-size="Page.pageSize"
            :page-sizes="Page.page_sizes" background layout="total, sizes, prev, pager, next, jumper"
            :total='Page.total' @size-change="handleSizeChange" @current-change="handleCurrentChange"
            style="float: right; margin-top: 10px;" />
</template>

<script setup>
import {reactive} from 'vue'
const Page = reactive({
    pageSize: 10,
    currentPage: 1,
    total: 0,
    page_sizes: [5, 10, 15, 20],
})

const handleSizeChange = (val) => {
    Page.pageSize = val;
    Page.currentPage = 1;
    // List()
}

const handleCurrentChange = (val) => {
    Page.currentPage = val
    //   debouncedFetch()
    // List()
}
</script>

<style>

</style>