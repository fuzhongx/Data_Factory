<template>
  <EIForm v-bind="formConfig" v-model:modelValue="formData" ref="myFormRef">
    <template #footer>
      <el-form-item>
        <el-button class="tav_btn" @click="btnSelect">搜索</el-button>
        <el-button class="tav_btn" @click="reset">重置</el-button>
      </el-form-item>
    </template>
  </EIForm>

  
   <!-- 事项 -->
   <div style="margin: 20px 0 10px 0">
      <el-button class="tav_btn" @click="handleAdd">新增</el-button>
      <el-button class="tav_btn" @click="handleUpdata" :disabled="updateBtn">修改</el-button>
      <el-button class="tav_btn" >删除</el-button>
      <el-button class="tav_btn" @click="handelExport">导出</el-button>
    </div>

   <!-- 表单 -->
  <ElTable :tableData="tableData" :column="column.columns">
    <template #operation="scope">
      <button @click="handelEdit(scope.row)" class="btn_active" type="text">
        修改
      </button>
      <button @click="deleteRow(scope.row)" class="btn_active">删除</button>
    </template>
  </ElTable>

<!-- 
  编辑 -->
   <el-dialog v-model="uPddialog" title="客户修改操作" width="25%">
      <EIForm v-bind="uPdformConfig" v-model:modelValue="uPdFormData" ref="myFormRef" style="margin-top: 30px;">
        <template #footer>
          <el-form-item>
            <div class="btn-left">
              <el-button class="tav_btn" @click="uPdBtn">确认</el-button>
              <el-button class="tav_btn" @click="uPddialog = false">取消</el-button>
            </div>
          </el-form-item>
        </template>
      </EIForm>
    </el-dialog>

<!-- 
  新增 -->
   <el-dialog v-model="aDddialog" title="客户新增操作" width="30%">
      <EIForm v-bind="aDdformConfig" v-model:modelValue="aDdFormData" ref="myFormRef" style="margin-top: 30px;">
        <template #footer>
          <el-form-item style="width: 100%;">
            <div class="btn-left">
              <el-button class="tav_btn" @click="AddSubmit">确认</el-button>
              <el-button class="tav_btn" @click="aDddialog = false">取消</el-button>
            </div>
          </el-form-item>
        </template>
      </EIForm>
    </el-dialog>


</template>

<script setup>
import EIForm from "@/components/fromConfig/EIForm.vue";
import ElTable from "@/components/TableConfig/ElTable.vue";
import column from "@/components/basic-data/client.js";
import formConfig from "@/components/basic-data/formConfig.js";
import uPdformConfig from '@/components/basic-data/uPd-Client.js'
import aDdformConfig from '@/components/basic-data/aDd-Client.js'

import { handleDelete } from "@/ulit/delete.js";
import {handleDaochu} from '@/ulit/XLSX.js';
import bus from "@/ulit/Bus.js";
import cookies from "vue-cookies";
const token = cookies.get("token");

import { List_Client,uPd_Client,Add_Client } from "@/requert/basic-data/client.js";
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";



// 配置项
const formItems = formConfig.formItems ?? [];
const uPdformItems = uPdformConfig.formItems ?? [];
const aDdformItems=aDdformConfig.formItems ?? []

//配置项转换参数
const form = {};
const uPdForm={}
const aDdForm={}

// 遍历转换model为空
formItems.map((k) => {
  form[k.field] = "";
});

uPdformItems.map((k) => {
  uPdForm[k.field] = "";
});

aDdformItems.map((k) => {
  aDdForm[k.field] = "";
});

// 表单配置值
const tableData = ref();
const myFormRef = ref();
const formData = ref(form);
const uPdFormData = ref(uPdForm);
const aDdFormData = ref(aDdForm);

//配置dialog
const uPddialog=ref(false)
const aDddialog=ref(false)

//禁用按钮
const updateBtn=ref(true)


onMounted(() => {
  List();
});

formData.value.pageNum=1,
formData.value.pageSize=10


const btnSelect = () => {
  List_Client(formData.value).then((res) => {
    tableData.value = res.data.rows;
  });
};

// 重置
const reset = () => {
  myFormRef.value.reset();
  List()
};

//新增
const handleAdd=()=>{
  aDddialog.value=true
}

//新增提交
const AddSubmit=()=>{
  Add_Client(aDdFormData.value).then((res) => {
    if(res.data.code==200)
  {
    tableData.value = res.data.rows;
    ElMessage.success(res.data.msg)
    List()
    aDddialog.value=false
  }else{
    ElMessage.error(res.data.msg)
  }
    
  });
}


//导出
const handelExport=()=>{
  handleDaochu(tableData.value)
}

/**
 * @property List后端返回数据预览
 */

const List = () => {
  List_Client({ pageNum: 1, pageSize: 10 }).then((res) => {
    tableData.value = res.data.rows;
  });
};

//存储选中ID
const getCheckedID=ref([])

//表格选中ID
bus.on('getCheckedBoxID',k=>{
  const newId = ref(new Set());
  k.forEach((item) => {
    newId.value.add(item.clientId);
    getCheckedID.value=Array.from(newId.value)
    getAxios.url='https://www.cp-mes.cn/prod-api/system/client/'+Array.from(newId.value)
    console.log(k.length);

     //判断是否禁用按钮
    if(item.length==1){
      updateBtn.value=false
    }else{
      updateBtn.value=true
    }
      });

})


const getAxios={
  url: "",
  method:"get",
  headers: {
    Authorization: "Bearer " + token,
  },
}

//多选编辑
const  handleUpdata=()=>{
  uPddialog.value=true
  axios(getAxios).then(res=>{
    let {clientAvatar,clientContact,clientId,clientName,clientNumber,clientPhone,remark,status}=res.data.data
    uPdFormData.value={clientAvatar,clientContact,clientId,clientName,clientNumber,clientPhone,remark,status}
  })

}

//编辑
const handelEdit = (row) => {
  uPddialog.value=true
  let{clientAbbreviation,clientAvatar,clientContact,clientId, clientName,clientNumber,clientPhone,remark,status}=row
  uPdFormData.value={clientAbbreviation,clientAvatar,clientContact,clientId,clientName,clientNumber,clientPhone,remark,status}
  console.log(row);
};

//编辑提交
const uPdBtn=()=>{
  uPd_Client(uPdFormData.value).then(res=>{
    if(res.data.code==200){
      tableData.value = res.data.rows;
      ElMessage.success(res.data.msg)
      List()
      uPddialog.value=false
    }else{
      ElMessage.error(res.data.msg)
    }
  })
}

/**
 * @param deleteParams 删除所需参数
 */
 let deleteParams = {
  url: "https://www.cp-mes.cn/prod-api/system/client/",
  ArrayId: [],
  method() {
    List();
  },
};

// 删除
const deleteRow=(row)=>{
  deleteParams.ArrayId=row.clientId
  handleDelete(deleteParams)
}

</script>

<style lang="scss" scoped>
.btn-left{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}
.el-dialog__title {
    font-weight: 800 !important;
}
.tav_btn {
  padding: 0px 20px;
  color: #fff;
  background-color: #3671e8;
  border: 1px solid #3671e8;
}
.btn_active {
  padding: 0px 10px;
  margin: 30px 5px 20px 5px;
  color: #3671e8;
  background: #fff;
  border: 0;
  outline: 0;
}
</style>
<style>
.el-dialog__title {
    font-weight: 800 !important;
}
</style>