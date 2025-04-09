<template>
  <div class="pagination-table">
    <!-- 表格主体 -->
    <el-table
      v-loading="loading"
      :data="tableData"
    >
      <!-- 动态列渲染 -->
      <template v-for="col in columns.columns" :key="col.prop">
        <!-- <el-table-column type=""></el-table-column> -->
        <el-table-column
          :type="col.type"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align || 'left'"
        >
          <!-- 自定义列模板 -->
          <template #default="scope" v-if="col.slotName">
            <slot :name="col.slotName" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
  
  <script setup>
import { ref,onMounted, watchEffect, defineProps, defineEmits, defineExpose } from "vue";
import columns from '@/components/TableConfig/MyTable.js'
import {List_material} from '@/requert/inventory/material'

const tableItem=ref()

onMounted(()=>{
  List()
})

columns.columns.value.map(item=>{
  tableItem[item.prop]=''
})
const List=()=>{
  List_material().then(res=>{
    let {materialNumber,materialName,materialUnit,specification,materialAttribute,createName,createTime}=res.data.rows
    tableItem.value.prop={materialNumber,materialName,materialUnit,specification,materialAttribute,createName,createTime}
    console.log(res.data.rows,'物料管理');
  })
}

const props = defineProps({
  columns:{
    type:Array,
  }
});
// 状态管理
const loading = ref(false);
const tableData = ref([]);

</script>
  

  <style scoped>
.pagination-wrapper {
  padding: 20px 0;
  display: flex;
  justify-content: flex-end;
}
</style>