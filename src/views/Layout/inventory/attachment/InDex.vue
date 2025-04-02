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
    <el-button class="tav_btn">新增</el-button>
    <el-button class="tav_btn" :disabled="disabled">修改</el-button>
    <el-button class="tav_btn">删除</el-button>
    <el-button class="tav_btn">导出</el-button>
  </div>
  <div>
    <el-table ref="multipleTableRef" :data="data.Data_Table" style="width: 100%;" :row-key="getKey"
      fit>
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
      <div  style="padding: 20px 0px 10px 0px"><label for="supplyType">出（入）库数量：</label></div>
      <el-input-number v-model="Inventory.supplyType" :min="1" :max="100" @change="handleChange" />
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
    <el-dialog v-model="play.CuKu_Dialog" title="出库管理" width="20%" >
      <div style="padding: 20px 0px 10px 0px"><label for="supplyType">出（入）库数量：</label></div>
      <el-input-number v-model="Inventory.supplyType" :min="1" :max="100" @change="handleChange" />
       <div  style="padding: 20px 0px 10px 0px">
        <el-select v-model="select" placeholder="Select" style="width:150px">
          <el-option label="Restaurant" value="1" />
          <el-option label="Order No." value="2" />
          <el-option label="Tel" value="3" />
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
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import { List_Attachment, Ruku_Attachment } from '@/requert/inventory/attachment.js'
import { ElMessage } from 'element-plus';

/**
 * 公共数据
 */
const data = reactive({
  Data_Table: [],
  URL: 'https://www.cp-mes.cn/prod-api/system/attachment/'
})

//判断编辑逻辑
const disabled = ref(false)
/**
 * play dialog展示判断介质
 */
const play = reactive({
  RuKu_Dialog: false,
  CuKu_Dialog: false
})
onMounted(() => {
  list()
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
 * 入库
 * params 获取当前id数据
 * Ruku_Submit 提交入库事件
 * Inventory 入库/出库共有属性
 */
const Inventory = reactive({
  supplyType: '',
  address:''
})
const params = ref()
const HandleRuku = (row) => {
  console.log(row);
  play.RuKu_Dialog = true
  params.value = row
}
const Ruku_Submit = () => {
  Ruku_Attachment({
    address: null,
    contractEmail: params.value.contractEmail,
    contractName: params.value.createBy,
    contractPhone: 1,
    contractPost: params.value.unit,
    nature: params.value.model,
    purveyorCode: params.value.attachmentCode,
    purveyorName: params.value.attachmentName,
    supplyType: Inventory.supplyType,
    type: params.value.type,
  }).then(res => {
    if (res.data.code == 200) {
      data.Data_Table = res.data.rows
      ElMessage.success('出库成功')
      play.RuKu_Dialog = false
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}
/**
 * 出库
 * params 获取当前id数据
 * Ruku_Submit 提交入库事件
 */
const dataRow=ref()
const HandleCuku = (row) => {
  console.log(row);
  play.CuKu_Dialog = true
  dataRow.value = row
}
const Cuku_Submit = () => {
  Ruku_Attachment({
    address: null,
    contractEmail: dataRow.value.contractEmail,
    contractName: dataRow.value.createBy,
    contractPhone: 1,
    contractPost: dataRow.value.unit,
    nature: dataRow.value.model,
    purveyorCode: params.value.attachmentCode,
    purveyorName: params.value.attachmentName,
    supplyType: Inventory.supplyType,
    type: params.value.type,
  }).then(res => {
    if (res.data.code == 200) {
      data.Data_Table = res.data.rows
      play.CuKu_Dialog = false
      ElMessage.success('入库成功')
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

.el-select__wrapper {
  height: 36px !important;
}

.el-select__wrapper {
  height: 36px !important;
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