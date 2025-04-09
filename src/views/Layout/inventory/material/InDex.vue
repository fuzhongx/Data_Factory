<template>
  <div>
   <CustomForm v-bind="formConfig" v-model:modelValue="formData" ref="myFormRef">
    <template #footer>
      <el-form-item>
        <el-button class="tav_btn" @click="btnSelect">搜索</el-button>
        <el-button  class="tav_btn" @click="reset">重置</el-button>
      </el-form-item>
    </template>
   </CustomForm>
   <!-- 表格主体 -->
   <PaginationTable></PaginationTable>
  </div>
</template>

<script setup>
import {ref,defineExpose} from 'vue'
import CustomForm from '@/components/CustomForm'
import formConfig from '@/fromConfig/material'
import PaginationTable from '@/components/TableConfig/TableConfig.vue'

const formItems=formConfig.formItems ?? []
const from={}

formItems.map(item=>{
  from[item.field]=''
})

const formData=ref(from)
const myFormRef=ref()

const reset=()=>{
  myFormRef.value.reset()
}


</script>

<style lang="scss" scoped>
.tav_btn {
    padding: 0px 20px;
    color: #fff;
    background-color: #3671e8;
    border: 1px solid #3671e8;
}
</style>