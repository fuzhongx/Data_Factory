<template>
  <div>
    <ELForm v-bind="formConfig" v-model:modelValue="formData" ref="myFormRef">
      <template #footer>
        <el-form-item>
          <el-button class="tav_btn" @click="btnSelect">搜索</el-button>
          <el-button class="tav_btn" @click="reset">重置</el-button>
        </el-form-item>
      </template>
    </ELForm>

  <!-- 事项 -->
   <div style="margin: 20px 0 10px 0;">
    <el-button class="tav_btn" @click="handleAdd">新增</el-button>
    <el-button class="tav_btn">修改</el-button>
    <el-button class="tav_btn">删除</el-button>
    <el-button class="tav_btn">导出</el-button>
   </div>

    <!-- 表单 -->
    <ElTable :tableData="tableData" :column="column.columns">
      <template #operation="scope">
        <button @click="handelEdit(scope.row)" class="btn_active" type="text">
          修改
        </button>
        <button @click="deleteRow(scope.row)" class="btn_active">
          删除
        </button>
      </template>
    </ElTable>
  
   <!-- 修改 -->
    <el-dialog v-model="uPddialog" title="物料修改操作" width="35%">
      <ELForm
        v-bind="UpdformConfig"
        v-model:modelValue="uPdFormData"
        ref="myFormRef"
      >
        <template #footer>
          <el-form-item>
            <el-button class="tav_btn" @click="uPdbtn">确认</el-button>
            <el-button class="tav_btn" @click="uPddialog = false"
              >取消</el-button
            >
          </el-form-item>
        </template>
      </ELForm>
    </el-dialog>

       <!-- 添加 -->
       <el-dialog v-model="uPddialog" title="物料新增操作" width="35%">
      <ELForm
        v-bind="UpdformConfig"
        v-model:modelValue="uPdFormData"
        ref="myFormRef"
      >
        <template #footer>
          <el-form-item>
            <el-button class="tav_btn" @click="uPdbtn">确认</el-button>
            <el-button class="tav_btn" @click="uPddialog = false"
              >取消</el-button
            >
          </el-form-item>
        </template>
      </ELForm>
    </el-dialog>


  </div>
</template>

<script setup>
import { ref, reactive, defineExpose, onMounted } from "vue";
import ELForm from "@/components/fromConfig/EIForm.vue";
import formConfig from "@/components/fromConfig/material";
import ElTable from "@/components/TableConfig/ElTable.vue";
import column from "@/components/TableConfig/MyTable";
import UpdformConfig from "@/components/material/uPd-Material";
import { ElMessage } from "element-plus";
import { dateValue } from '@/ulit/DateTime.js'
import  {handleDelete } from '@/ulit/delete.js'
import { List_material, uPd_material } from "@/requert/inventory/material";

const uPddialog = ref(false);

//form 配置项
const formItems = formConfig.formItems ?? [];
const uPdFormItem = UpdformConfig.formItems ?? [];

const from = {};
const uPdForm = {};

// 见每个配置项转化为空
formItems.map((item) => {
  from[item.field] = "";
});

//修改项目转化为空
uPdFormItem.map((item) => {
  uPdForm[item.field] = "";
});

const formData = ref(from);
const uPdFormData = ref(uPdForm);

const myFormRef = ref();

const btnSelect = () => {
  List_material({
    pageNum: 1,
    pageSize: 10,
    materialNumber: formData.value.materialNumber,
    materialName: formData.value.materialName,
    specification: formData.value.specification,
  }).then((res) => {
    tableData.value = res.data.rows;
  });
};

// 重置
const reset = () => {
  myFormRef.value.reset();
};

onMounted(() => {
  List();
});

const List = () => {
  List_material().then((res) => {
    tableData.value = res.data.rows;
    console.log(res.data.rows, "物料管理");
  });
};

//表格数据
const tableData = ref([]);
const RowValue = ref();

/**
 * @param deleteParams 删除所需参数
 */
let deleteParams={
    url:'https://www.cp-mes.cn/prod-api/system/material/',
    ArrayId:[],
    method(){
      List()
    }
  }

//删除
const deleteRow=(row)=>{
  deleteParams.ArrayId=row.materialId
  handleDelete(deleteParams)
}

const handleAdd=()=>{

}

//编辑
const handelEdit = (row) => {
  uPddialog.value = true;
  let {
    createBy,
    createName,
    createTime,
    inventoryMax,
    inventoryMin,
    inventorySafe,
    materialAttribute,
    materialId,
    materialName,
    materialNumber,
    materialQuantity,
    materialUnit,
    remark,
    specification,
    updateBy,
    updateTime,
  } = row;
  uPdFormData.value = {
    materialNumber,
    materialName,
    materialUnit,
    specification,
    materialAttribute,
    remark,
  };
  RowValue.value = {
    createBy,
    createName,
    createTime,
    inventoryMax,
    inventoryMin,
    inventorySafe,
    materialId,
    materialQuantity,
    updateBy,
    updateTime,
  };
  RowValue.value.updateTime=dateValue()
};
const uPdbtn = () => {
  let {
    materialNumber,
    materialName,
    materialUnit,
    specification,
    materialAttribute,
    remark,
  } = uPdFormData.value;
  let {
    createBy,
    createName,
    createTime,
    inventoryMax,
    inventoryMin,
    inventorySafe,
    materialId,
    materialQuantity,
    updateBy,
    updateTime,
  } = RowValue.value;
  uPd_material({
    createBy,
    createName,
    createTime,
    inventoryMax,
    inventoryMin,
    inventorySafe,
    materialAttribute,
    materialId,
    materialName,
    materialNumber,
    materialQuantity,
    materialUnit,
    remark,
    specification,
    updateBy,
    updateTime,
  }).then((res) => {
    if (res.data.code == 200) {
      tableData.value = res.data.rows;
      ElMessage.success("修改成功");
      List();
      uPddialog.value=false
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
</script>

<style lang="scss" scoped>
.btn_active {
  padding: 0px 10px;
  margin: 0 10px;
  color: #3671e8;
  background: #fff;
  border: 0;
  outline: 0;
}
.tav_btn {
  padding: 0px 20px;
  color: #fff;
  background-color: #3671e8;
  border: 1px solid #3671e8;
}
</style>