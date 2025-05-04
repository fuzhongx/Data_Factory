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

   <el-table-column v-else-if="item.type=='select'" :label="item.label" :align="item.align" :prop="item.prop">
    <template #default="scope">  
         <!-- virtual-scroll数据大于100虚拟滚动 -->
        <el-select
        v-model="scope.row.procedureName" placeholder="请输入内容" :disabled="item.disabled" 
        :loading="loadingOptions[item.prop]"  @focus="loadOptions(item)" 
        @change="handleSelect(scope.row)" 
        >
        <el-option v-for="opt in dynamicOptions[item.prop]" :key="opt.value" :value="opt.value" :label="opt.label" ></el-option>
        </el-select>
    </template> 
   </el-table-column>

   <el-table-column v-else-if="item.type=='input'" :label="item.label" :align="item.align" :prop="item.prop">
    <template #default="scope">
      <!-- {{  scope.row.technologicalRequirements}} -->
        <el-input v-model="scope.row.technologicalRequirements" placeholder="请输入要求" :disabled="item.disabled"></el-input>
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
import axios from "axios";
import cookies from 'vue-cookies'
const token = cookies.get('token')

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

const dynamicOptions = ref({}); // 存储动态选项
const loadingOptions = ref({}); // 加载状态

// 加载异步选项
const loadOptions = async (item) => {
  console.log(item.options(),13);
  
  if (item.options && typeof item.options === 'function') {
    try {
      loadingOptions.value[item.prop] = true;
      dynamicOptions.value[item.prop] = await item.options();
      
    } finally {
      loadingOptions.value[item.prop] = false;
    }
  }
};

const handleSelect=(procedureName)=>{
  console.log(procedureName,888);
axios({
  url:'https://www.cp-mes.cn/prod-api/system/procedure/'+procedureName,
  method:'get',
  headers:{
    Authorization:'Bearer '+token
  }
}).then(res=>{
  console.log(res);
  
})

}

//获取多选ID
const getCheckedBox_Value = (row) => {
  bus.emit('getCheckedBoxID',row)
};

</script>

<style>
.el-table th.el-table__cell {
    background-color: #f8f8f9;
}
</style>