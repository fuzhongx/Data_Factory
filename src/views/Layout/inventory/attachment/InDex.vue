<template>
  <el-form :inline="true" v-model="from" class="demo-form-inline">
    <el-form-item label="库存编号">
      <el-input v-model="from.attachmentCode" placeholder="请输入库存编号" clearable class="input" />
    </el-form-item>
    <el-form-item label="库存名称">
      <el-input v-model="from.attachmentName" placeholder="请输入库存名称" clearable class="input" />
    </el-form-item>
    <el-form-item>
      <el-button @click="onSelect" class="tav_btn">查询</el-button>
      <el-button @click="Reset" class="tav_btn">重置</el-button>
    </el-form-item>
  </el-form>
  <div style="margin: 10px 0">
    <el-button class="tav_btn" @click="KUCUN_ADD">新增</el-button>
    <el-button class="tav_btn" :disabled="disabled">修改</el-button>
    <el-button class="tav_btn">删除</el-button>
    <el-button class="tav_btn">导出</el-button>
  </div>
  <div>
    <el-table ref="multipleTableRef" :data="data.Data_Table" style="width: 100%;" :row-key="getKey" fit>
      <el-table-column type="selection" width="55" align="center" reserve-selection />
      <el-table-column prop="attachmentCode" label="库存编号" align="center" />
      <el-table-column prop="type" label="库存类型" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.type == 1" class="el_tag" type="success">物料</el-tag>
          <el-tag v-else class="el_tag" type="info">产品</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="attachmentName" label="库存名称" align="center" />
      <el-table-column prop="model" label="库存规格" align="center" />
      <el-table-column prop="quantity" label="数量" align="center" />
      <el-table-column prop="unit" label="单位" align="center" />
      <el-table-column prop="createName" label="姓名" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column fixed="right" label="操作" align="center">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="HandleRuku(scope.row)">
            + 入库
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="HandleCuku(scope.row)">
            - 出库
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 入库 -->
    <el-dialog v-model="play.RuKu_Dialog" title="入库管理" width="20%">
      <div style="padding: 20px 0px 10px 0px"><label for="supplyType">出（入）库数量：</label></div>
      <el-input-number v-model="Inventory.supplyType" :min="1" :max="100" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="play.RuKu_Dialog = false">取消</el-button>
          <el-button type="primary" @click="Ruku_Submit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 出库 -->
    <el-dialog v-model="play.CuKu_Dialog" title="出库管理" width="20%">
      <div style="padding: 20px 0px 10px 0px"><label for="supplyType">出（入）库数量：</label></div>
      <el-input-number v-model="Inventory.supplyType" :min="1" :max="100" />
      <div style="padding: 20px 0px 10px 0px">
        <div style="padding: 20px 0px 10px 0px"><label for="supplyType">领料人：</label></div>
        <el-select v-model="nickName_Select" placeholder="请选择领料人" style="width:150px">
          <el-option :label="item.nickName" :value="item.nickName" v-for="item in nickName" :key="item.id" />
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="play.CuKu_Dialog = false">取消</el-button>
          <el-button type="primary" @click="Cuku_Submit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加 -->
    <el-dialog v-model="play._ADD_Dialog" title="添加出入库管理" width="22%">
      <el-form ref="ruleFormRef" :model="KuCun_ADD" :rules="rules" class="demo-ruleForm" status-icon>

        <el-form-item label="库存类型" style="margin-top: 30px;" class="item-m-30">
          <el-select v-model="KuCun_ADD.type" placeholder="请选择库存类型" clearable  @change="handeChange">
            <el-option :label="item.dictLabel" :value="item.dictLabel"  v-for="item in Inventory_types" :key="item.dictCode"/>
          </el-select>
        </el-form-item>

        <el-form-item label="库存名称" class="item-m-20-30" prop="attachmentName" v-if="KuCun_ADD.type=='物料'">
          <el-select v-model="KuCun_ADD.attachmentName" placeholder="请输入库存名称" clearable :disabled="KuCun_ADD.type? false:true">
            <el-option :label="item.specification" :value="item.specification"   v-for="item in Material_list" :key="item"/>
          </el-select>
        </el-form-item>

        <el-form-item label="库存名称" class="item-m-20-30" prop="attachmentName" v-else>
          <el-select v-model="KuCun_ADD.attachmentName" placeholder="请输入库存名称" clearable :disabled="KuCun_ADD.type? false:true">
            <el-option :label="item.productName" :value="item.productName"   v-for="item in Product_list" :key="item"/>
          </el-select>
        </el-form-item>

        <el-form-item label="库存编号" class="item-m-20-30" prop="attachmentCode">
          <el-select v-model="KuCun_ADD.attachmentCode" placeholder="请输入库存编号" clearable :disabled="disabled">
            <el-option label="物料" value="shanghai" />
            <el-option label="产品" value="shanghai" />
          </el-select>
        </el-form-item>

        <el-form-item label="库存规格" class="item-m-30">
          <el-select v-model="KuCun_ADD.model" placeholder="请输入库存规格" clearable :disabled="disabled">
            <el-option label="物料" value="shanghai" />
            <el-option label="产品" value="shanghai" />
          </el-select>
        </el-form-item>

        <el-form-item label="单位" label-width="70px" class="item-m-30" prop="unit">
          <el-select v-model="KuCun_ADD.unit" placeholder="请输入对应单位" clearable>
            <el-option label="物料" value="shanghai" />
            <el-option label="产品" value="shanghai" />
          </el-select>
        </el-form-item>

        <el-form-item label="初始数量" class="item-m-30">
          <el-input-number v-model="KuCun_ADD.quantity" :min="1" :max="100"
            style="width: 100%; height: 36px;"></el-input-number>
        </el-form-item>

        <el-form-item label="备注" label-width="70px" style="margin-bottom: 50px;" class="item-m-30">
          <el-input type="textarea" v-model="KuCun_ADD.remark" style="width: 100%;" placeholder="请输入备注" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="play._ADD_Dialog = false">取消</el-button>
          <el-button type="primary" @click="_ADD_SuBmit">
            确认
          </el-button>
        </span>
      </template>

    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { 
  List_Attachment, Ruku_Attachment, Ruku_Num_Attachment,inventory_types,
  material_list,product_list
 } from '@/requert/inventory/attachment.js';
import { userList } from '@/requert/system/user.js';
import { ElMessage } from 'element-plus';
import { dateValue } from '@/ulit/DateTime.js'
import cookies from 'vue-cookies'

const token = cookies.get('token')

/**
 * 公共数据
 */
const data = reactive({
  Data_Table: [],
  URL: 'https://www.cp-mes.cn/prod-api/system/attachment/'
})
const ruleFormRef = ref()

/**
 * rules校验规则
 */
const rules = reactive({
  attachmentCode: [
    { required: true, message: '请选择库存编号', trigger: 'blur' },
  ],
  attachmentName: [
    { required: true, message: '请选择库存名称', trigger: 'blur' },
  ],
  unit: [
    { required: true, message: '请选择对应单位', trigger: 'blur' },
  ]
})

//判断编辑逻辑
const disabled = ref(true)

/**
 * play dialog展示判断介质
 */
const play = reactive({
  RuKu_Dialog: false,
  CuKu_Dialog: false,
  _ADD_Dialog: true
})

onMounted(() => {
  list()
  Ruku_NickName()
})

/**
 * 表单后端返回数据来源
 * list()
 */
const from = reactive({
  pageNum: 1,
  pageSize: 10,
  attachmentCode: '',
  attachmentName: '',
})
const list = () => {
  List_Attachment(from).then(res => {
    data.Data_Table = res.data.rows
  })
}
const onSelect = () => {
  list()
}
const Reset = () => {
  from.attachmentCode = '',
    from.attachmentName = '',
    list()
}

/**
 * 添加参数
 */

const KuCun_ADD = reactive({
  attachmentCode: "",
  attachmentName: "",
  model: "",
  quantity: 1,
  remark: "",
  type: "",
  unit: "",
})

// 监听单个 ref
watch(()=>KuCun_ADD.type, (newVal, oldVal) => {
  if(newVal!=oldVal){
    KuCun_ADD.attachmentName=[]
  }
})

const handeChange=(row)=>{
console.log(row);
}

const KUCUN_ADD = () => {
  play._ADD_Dialog = true
}
const _ADD_SuBmit = () => {
  Ruku_Num_Attachment({
    attachmentCode:KuCun_ADD.attachmentCode,
    attachmentName:KuCun_ADD.attachmentName,
    model:KuCun_ADD.model,
    quantity:KuCun_ADD.quantity,
    remark:KuCun_ADD.remark,
    type:KuCun_ADD.type,
    unit: KuCun_ADD.unit,
  }).then(res => {
   if(res.data.code==200){
    play._ADD_Dialog =false
    list()
   }else{
    ElMessage.error(res.data.msg)
   }
  })
}


/**
 * 入库
 * params 获取当前id数据
 * Ruku_Submit 提交入库事件
 * Inventory 入库/出库共有属性
 */
const Inventory = reactive({
  supplyType: 1,
  address: ''
})

const params = ref()

const HandleRuku = (row) => {
  play.RuKu_Dialog = true
  getValue(row)
}

/**
 * 根据ID获取值函数
 */
const getValue = (row) => {
  axios({
    url: data.URL + row.attachmentId,
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(res => {
    params.value = res.data.data
    console.log(res.data.data);
  })

}

/**
 * 入库出库共有函数
 */
const attachment = () => {
  Ruku_Num_Attachment({
    attachmentCode: params.value.attachmentCode,
    attachmentId: params.value.attachmentId,
    attachmentName: params.value.attachmentName,
    createBy: params.value.createBy,
    createName: null,
    createTime: params.value.createTime,
    model: params.value.model,
    purveyorId: params.value.purveyorId,
    purveyorName: params.value.purveyorName,
    quantity: params.value.quantity,
    remark: params.value.remark,
    type: params.value.type,
    unit: params.value.unit,
    updateBy: params.value.updateBy,
    updateTime: dateValue(),
  })
}

const Ruku_Submit = () => {
  Ruku_Attachment({
    address: nickName_Select.value,
    contractEmail: null,
    contractName: params.value.contractName,
    contractPhone: Inventory.supplyType,
    contractPost: params.value.unit,
    nature: params.value.model,
    purveyorCode: params.value.attachmentCode,
    purveyorName: params.value.attachmentName,
    supplyType: '1',
    type: params.value.type,
  }).then(res => {
    if (res.data.code == 200) {
      play.RuKu_Dialog = false
      ElMessage.success('入库成功')
      attachment()
      list()
    } else {
      ElMessage.error(res.data.msg)
    }
  })

}

/**
 * 出库
 * params 获取当前id数据
 * nickName 领料人后端返回数据
 * Ruku_Submit 提交入库事件
 */
const dataRow = ref()
const nickName = ref()
const nickName_Select = ref(null)
const Inventory_types=ref()
const Product_list=ref()
const Material_list=ref()

const HandleCuku = (row) => {
  play.CuKu_Dialog = true
  getValue(row)
  dataRow.value = row
}

/**
 * userList用户姓名
 * inventory_types库存类型函数
 * product_list 产品函数
 * material_list 物料函数
 * 
 */
const Ruku_NickName = () => {
  userList().then(res => {
    nickName.value = res.data.rows
  })
  inventory_types().then(res=>{
    Inventory_types.value=res.data.data
  })
  product_list().then(res=>{
   Product_list.value=res.data.rows
  })
  material_list().then(res=>{
    Material_list.value=res.data.rows
  })

}
const Cuku_Submit = () => {
  Ruku_Attachment({
    address: nickName_Select.value,
    contractEmail: null,
    contractName: params.value.createBy,
    contractPhone: Inventory.supplyType,
    contractPost: params.value.unit,
    nature: params.value.model,
    purveyorCode: params.value.attachmentCode,
    purveyorName: params.value.attachmentName,
    supplyType: '0',
    type: params.value.type,
  }).then(res => {
    if (res.data.code == 200) {
      data.Data_Table = res.data.rows
      play.CuKu_Dialog = false
      ElMessage.success('入库成功')
      list()
    } else {
      ElMessage.error(res.data.msg)
    }

  })
}

/**
 * 
 * @param row checkedBox 唯一标识,防止二次触发选中
 */
const getKey = (row) => {
  return row.id
}
</script>

<style lang="scss" scoped>
.item-m-30 {
  margin: 20px 30px;
}

.item-m-20-30 {
  margin: 20px 30px 20px 20px;
}

.el-form-item__label {
  font-weight: 700;
}

::v-deep .el-select__wrapper {
  width: 100% !important;
  height: 36px !important;
}

.el-tag {
  background-color: #ebf1fd;
  border-color: #d7e3fa;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #3671e8;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}


.el-dropdown-link {
  outline: 0;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
}

.el-dropdown-lin:hover {
  color: rgb(149, 187, 224)
}

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}

.el-from-padding {
  padding: 30px 20px;
}

.label-l .el-form-item--default .el-form-item__labe {
  padding-left: 10px !important;
}

.el-dialog__title {
  font-weight: 400px;
}

.input {
  height: 36px !important;
}

.tav_btn {
  padding: 0px 20px;
  color: #fff;
  background-color: #3671e8;
  border: 1px solid #3671e8;
}
</style>