<template>
   <el-button @click="handelEdit(scope.row)" class="add_btn">
        增加字段
      </el-button>
  <ElTable :column="column" :data="dataTable">
    <template #operation="scope">
      <el-button @click="handelEdit(scope.row)" class="btn_active" type="text">
        修改
      </el-button>
      <el-button @click="deleteRow(scope.row)" class="btn_active"  type="text">删除</el-button>
    </template>
  </ElTable>

  <!-- 
  编辑 -->
  <el-dialog v-model="uPddialog" title="修改自定义字段" width="25%">
      <EIForm v-bind="uPdformConfig"  ref="myFormRef" style="margin-top: 30px;">
        <template #footer>
          <el-form-item>
            <div class="btn-left">
              <el-button class="tav_btn">确认</el-button>
              <el-button class="tav_btn" @click="uPddialog = false">取消</el-button>
            </div>
          </el-form-item>
        </template>
      </EIForm>
    </el-dialog>
</template>

<script setup>
import EIForm from "@/components/fromConfig/EIForm.vue";
import ElTable from "@/components/TableConfig/ElTable.vue";
import column from "@/components/basic-data/customInfo/product.js";
import uPdformConfig from '@/components/basic-data/customInfo/uPdproduct.js'
import { onMounted, ref } from "vue";

import { List_product } from "@/requert/basic-data/customInfo/product.js";

const uPdproduct= uPdformConfig.formItems ?? []
console.log(uPdformConfig);


//弹窗标志
const uPddialog=ref(true)

const dataTable = ref();

onMounted(() => {
  List();
});

const List = () => {
  List_product({
    pageNum: 1,
    pageSize: 10,
    customTable: 0,
  }).then((res) => {
    dataTable.value = res.data.rows;
  });
};

// 编辑
const handelEdit=(row)=>{
  uPddialog.value=true
}
</script>

<style lang="scss" scoped>
.add_btn{
  color:#efff;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #3671e8;
}
.btn_active{
  color:#3671e8;
}
</style>