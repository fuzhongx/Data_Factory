<template>
  <div>
    <el-form :inline="true" v-model="from" class="demo-form-inline">
      <el-form-item label="角色编码">
        <el-input v-model="from.roleKey" placeholder="请输入角色编码" clearable class="input" />
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="from.roleName" placeholder="请输入角色名称" clearable class="input" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="from.status" placeholder="请选择状态" clearable style="width: 192px; height: 36px">
          <el-option label="正常" value="0" />
          <el-option label="停用" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="from.params" editable format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
          @change="changeTime" />
        <!-- style="width: 210px;" -->
      </el-form-item>
      <el-form-item>
        <el-button @click="onSelect" class="tav_btn">查询</el-button>
        <el-button @click="reset" class="tav_btn">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="margin: 10px 0">
      <el-button class="tav_btn" @click="addPost">新增</el-button>
      <el-button class="tav_btn" @click="updPost" :disabled="disabled">编辑</el-button>
      <el-button class="tav_btn" @click="delPost">删除</el-button>
      <el-button class="tav_btn" @click="handleDaochu">导出</el-button>
    </div>
    <div>
      <el-table ref="multipleTableRef" :data="data.role_List" style="width: 100%" @select-all="selectALL"
        :row-key="getKey" :select-on-indeterminate="allChecked" @select="selChange">
        <el-table-column type="selection" width="55" align="center" reserve-selection />
        <el-table-column prop="roleId" label="角色编号" align="center" />
        <el-table-column prop="roleName" label="角色名称" align="center" />
        <el-table-column prop="roleKey" label="权限字符" align="center" />
        <el-table-column prop="roleSort" label="显示顺序" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="switchChane"
              :before-change="beforeChange" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="240" />
        <!-- <el-table-column prop="updateTime" label="更新时间" align="center" /> -->
        <el-table-column fixed="right" label="操作" width="700" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="updateRow(scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row)">
              删除
            </el-button>
            <el-button link type="primary" size="small">
              <el-dropdown>
                <span class="el-dropdown-link">更多</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click.prevent='dataPower(scope.row)'>数据权限</el-dropdown-item>
                    <el-dropdown-item>分配用户</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加角色--------------- -->
    <el-dialog v-model="play.adddialog" title="添加角色" width="25%">
      <el-form :model="ADD_Role" :rules="rules" class="el-from-padding">
        <el-form-item label="角色名称" :label-width="data.formLabelWidth" prop="roleName">
          <el-input autocomplete="off" v-model="ADD_Role.roleName" class="input" />
        </el-form-item>
        <el-form-item label="字符权限" :label-width="data.formLabelWidth" prop="roleKey">
          <el-input v-model="ADD_Role.roleKey" autocomplete="off" class="input" />
        </el-form-item>
        <el-form-item label="角色顺序" :label-width="data.formLabelWidth" prop="roleSort">
          <el-input-number v-model="ADD_Role.roleSort" :min="0" class="input" />
        </el-form-item>
        <el-form-item label="状态" label-width="50px" prop="status">
          <el-radio-group v-model="ADD_Role.status" class="ml-4">
            <el-radio label="0" size="large" value="0">正常</el-radio>
            <el-radio label="1" size="large" value="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限" label-width="78px" class="infinite-list" style="overflow: auto;">
          <el-tree :data="ADD_Role.dataTree" :props="defaultProps" show-checkbox ref="treeRef" node-key="id"
            @check="handleCheck" />
        </el-form-item>
        <el-form-item label="备注" label-width="50px" style="label-l">
          <el-input type="textarea" v-model="ADD_Role.remark" autocomplete="off" placeholder="请添加备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="tav_btn" @click="addSubmit">确认</el-button>
          <el-button @click="play.adddialog = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑角色-------------------------------------------------------------- -->
    <el-dialog v-model="play.upddialog" title="编辑角色" width="25%">
      <el-form :model="UPD_Role" :rules="rules" class="el-from-padding">
        <el-form-item label="角色名称" :label-width="data.formLabelWidth" prop="roleName">
          <el-input autocomplete="off" v-model="UPD_Role.roleName" class="input" />
        </el-form-item>
        <el-form-item label="字符权限" :label-width="data.formLabelWidth" prop="roleKey">
          <el-input v-model="UPD_Role.roleKey" autocomplete="off" class="input" />
        </el-form-item>
        <el-form-item label="角色顺序" :label-width="data.formLabelWidth" prop="roleSort">
          <el-input-number v-model="UPD_Role.roleSort" :min="0" class="input" />
        </el-form-item>
        <el-form-item label="状态" label-width="50px" prop="status">
          <el-radio-group v-model="UPD_Role.status" class="ml-4">
            <el-radio label="0" size="large" value="0">正常</el-radio>
            <el-radio label="1" size="large" value="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限" label-width="78px" class="infinite-list">
          <el-tree :data="ADD_Role.dataTree" :props="defaultProps" show-checkbox ref="treeRef" node-key="id"
            @check="handleCheck" />
        </el-form-item>
        <el-form-item label="备注" label-width="50px" style="label-l">
          <el-input type="textarea" v-model="UPD_Role.remark" autocomplete="off" placeholder="请添加备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="tav_btn" @click="updSubmit">确认</el-button>
          <el-button @click="play.upddialog = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog v-model="play.codedialog" title="分配权限" width="25%">
      <el-form :model="UPD_Role" :rules="rules" class="el-from-padding">
        <el-form-item label="角色名称" :label-width="data.formLabelWidth" prop="roleName">
          <el-input autocomplete="off" v-model="Quan_xian.roleName" class="input" />
        </el-form-item>
        <el-form-item label="字符权限" :label-width="data.formLabelWidth" prop="roleKey">
          <el-input v-model="Quan_xian.roleKey" autocomplete="off" class="input" />
        </el-form-item>
        <el-form-item label="权限范围" :label-width="data.formLabelWidth" prop="roleSort">
          <el-select v-model="Quan_xian.dataScope">
          <el-option label="全部数据权限" value="1" />
          <el-option label="自定义数据权限" value="2" />
          <el-option label="本部门数据权限" value="3" />
          <el-option label="本部门内及以下数据权限" value="4" />
          <el-option label="仅本人数据权限" value="5" />
      </el-select>
        </el-form-item>
       
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="tav_btn" @click="codeSubmit">确认</el-button>
          <el-button @click="play.codedialog = false"> 取消 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { roleListApi, treeselectAPI, addroleAPI, updroleAPI } from '@/requert/system/role.js'
import { ElMessage, ElMessageBox } from 'element-plus';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from 'axios';
import cookies from "vue-cookies";
const token = cookies.get('token')
const data = reactive({
  role_List: [],
  activeValue: '0',
  inactiveValue: '1',
  changeSwitch: '',
  switchValue: '',

})
const allChecked = ref();
const disabled = ref(true)
const from = reactive({
  roleName: '',
  roleKey: '',
  status: '0',
  params: '',
})
const play = reactive({
  adddialog: false,
  upddialog: false,
  codedialog:true
})
const Quan_xian=reactive({
  roleKey: "",
  roleName: "",
  dataScope:''
})
const delRoleID = ref(null)
const treeRef = ref('null')
const SelectID = ref([])
const ADD_Role = reactive({
  dataTree: [],
  deptCheckStrictly: true,
  deptIds: [],
  menuCheckStrictly: true,
  menuIds: [],
  remark: '',
  roleKey: "",
  roleName: "",
  roleSort: 0,
  status: "0",
})

const UPD_Role = reactive({
  ids: '',
  dataTree: [],
  checkedKeys: [],
  deptCheckStrictly: true,
  deptIds: [],
  menuCheckStrictly: true,
  menuIds: [],
  remark: '',
  roleKey: "",
  roleName: "",
  roleSort: 0,
  status: "0",
  createTime: ''
})
const defaultProps = {
  children: 'children',
  label: 'label',
}
const rules = {
  roleName: [
    { required: true, message: "请输入角色名称", trigger: "blur" },
  ],
  roleKey: [
    { required: true, message: "请输入权限字符", trigger: "blur" },
  ],
  roleSort: [
    { required: true, message: "请选择排序", trigger: "blur" },
  ],
};
onMounted(() => {
  list()
  dateValue()
  treeselectAPI().then(res => {
    ADD_Role.dataTree = res.data.data
  })
})
const onSelect = () => {
  roleListApi({
    pageNum: 1,
    pageSize: 10,
    roleName: from.roleName,
    roleKey: from.roleKey,
    status: from.status,
    'params[beginTime]': from.params[0],
    'params[endTime]': from.params[1],
  }).then(res => {
    if (res.data.code == 200) {
      data.role_List = res.data.rows
    } else {
      ElMessage.error(res.data.msg)
    }
  })
}

const changeTime = () => {

}
const selChange = (val) => {
  delRoleID.value = val.map(item => {
    return item.roleId
  })
  if (val.length != 1) {
    disabled.value = true
  } else {
    disabled.value = false
    val.map(item => {
      SelectID.value.push(item.roleId)
      UPD_Role.ids = item.roleId
    })
  }
}
const handleDaochu = () => {
  // 创建一个workbook
  const workbook = XLSX.utils.book_new();
  // 导出数据
  const worksheet = XLSX.utils.json_to_sheet(data.role_List);
  XLSX.utils.book_append_sheet(workbook, worksheet, "角色列表");

  // 将workbook转为二进制数据
  const excelData = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });
  // 创建blob对象并保存excel文件
  const blob = new Blob([excelData], { type: "application/octet-stream" });
  // 设置导出文件名字
  saveAs(blob, "角色列表.xlsx");
};

const delPost = () => {
  ElMessageBox.confirm(
    '系统提示',
    '删除角色操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }
  ).then(() => {
    axios({
      url: 'https://www.cp-mes.cn/prod-api/system/role/' + delRoleID.value,
      method: 'delete',
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then(res => {
      if (res.data.code == 200) {
        data.role_List = res.data.rows
        ElMessage.success('删除成功')
        list()
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  })
}
const deleteRow = (row) => {
  ElMessageBox.confirm(
    '系统提示',
    '删除角色操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }
  ).then(() => {
    axios({
      url: 'https://www.cp-mes.cn/prod-api/system/role/' + row.roleId,
      method: 'delete',
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then(res => {
      if (res.data.code == 200) {
        data.role_List = res.data.rows
        ElMessage.success('删除成功')
        list()
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  })
}
const dataPower=(row)=>{
play.codedialog=true
 axios({
    url:'https://www.cp-mes.cn/prod-api/system/role/' +row.roleId,
    method:'get',
    headers:{
      Authorization: "Bearer " + token,
    }
  }).then(res=>{
    Quan_xian.roleName= res.data.data.roleName
    Quan_xian.roleKey=res.data.data.roleKey
    Quan_xian.dataScope=res.data.data.dataScope
  })
 
  
}

const selectALL = () => {

}
// 获取选中的数据
const handleCheck = () => {
  const list = []
  list.value = treeRef.value?.getCheckedNodes(false) || [];
  list.value.forEach(item => {
    ADD_Role.menuIds.push(item.id)
  })
}
//tree数据
const treeData = () => {
  treeselectAPI().then(res => {
    ADD_Role.treeselect = res.data.data
  })
}
//回显
const checkChange = async () => {
  treeRef.value?.setCheckedKeys(UPD_Role.checkedKeys)
}
const addPost = () => {
  play.adddialog = true
  treeData()
}
const updPost = async () => {
  play.upddialog = true
  axios({
    url: 'https://www.cp-mes.cn/prod-api/system/role/' + SelectID.value,
    headers: {
      Authorization: "Bearer " + token,
    }
  }).then(res => {
    UPD_Role.menuIds = res.data.data.menuIds
    UPD_Role.remark = res.data.data.remark
    UPD_Role.roleKey = res.data.data.roleKey
    UPD_Role.roleName = res.data.data.roleName
    UPD_Role.roleSort = res.data.data.roleSort
    UPD_Role.status = res.data.data.status
    UPD_Role.createTime = res.data.data.createTime
  })
  axios({
    url: 'https://www.cp-mes.cn/prod-api/system/menu/roleMenuTreeselect/' + SelectID.value,
    method: 'get',
    headers: {
      Authorization: "Bearer " + token,
    }
  }).then(res => {
    UPD_Role.checkedKeys = res.data.data.checkedKeys
    checkChange()
  })

  treeData()
}
const updateRow = async (row) => {
  UPD_Role.ids = row.roleId
  play.upddialog = true
  UPD_Role.menuIds = row.menuIds
  UPD_Role.remark = row.remark
  UPD_Role.roleKey = row.roleKey
  UPD_Role.roleName = row.roleName
  UPD_Role.roleSort = row.roleSort
  UPD_Role.status = row.status
  UPD_Role.createTime = row.createTime
  axios({
    url: 'https://www.cp-mes.cn/prod-api/system/menu/roleMenuTreeselect/' + row.roleId,
    method: 'get',
    headers: {
      Authorization: "Bearer " + token,
    }
  }).then(res => {
    UPD_Role.checkedKeys = res.data.data.checkedKeys
    checkChange()
  })
  treeData()

}
const dateValue = () => {
  const date = new Date()
  const y = date.getFullYear()
  const w = date.getMonth() + 1
  const d = date.getDate()

  const h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  const m = date.getMinutes() >= 10 ? date.getMinutes() : ' 0' + date.getMinutes()
  const s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  return y + '-' + w + '-' + d + ' ' + h + ':' + m + ':' + s
}
const updSubmit = () => {
  updroleAPI({
    admin: false,
    createBy: "18000000000",
    createTime: UPD_Role.createTime,
    dataScope: "1",
    delFlag: "0",
    deptCheckStrictly: true,
    deptIds: null,
    flag: false,
    menuCheckStrictly: true,
    menuIds: UPD_Role.checkedKeys,
    remark: UPD_Role.remark,
    roleId: UPD_Role.ids,
    roleKey: UPD_Role.roleKey,
    roleName: UPD_Role.roleName,
    roleSort: UPD_Role.roleSort,
    status: UPD_Role.status,
    tenantId: "243924",
    updateBy: "18000000000",
    updateTime: dateValue(),
  }).then(res => {
    if (res.data.code == 200) {
      play.adddialog = false
      data.role_List = res.data.rows
      ElMessage.success('修改成功')
      list()
    } else {
      ElMessage.error(res.data.msg)
    }

  })
}
const addSubmit = () => {
  addroleAPI({
    deptCheckStrictly: true,
    deptIds: [],
    menuCheckStrictly: true,
    menuIds: ADD_Role.menuIds,
    remark: ADD_Role.remark,
    roleKey: ADD_Role.roleKey,
    roleName: ADD_Role.roleName,
    roleSort: ADD_Role.roleSort,
    status: ADD_Role.status,
  }).then(res => {
    if (res.data.code == 200) {
      play.adddialog = false
      data.role_List = res.data.rows
      list()
    } else {
      ElMessage.error(res.data.msg)
    }

  })
}
const beforeChange = () => {
  return new Promise((resolve) => {
    ElMessage.success('Switch success')
    return resolve(true)
  })
}
const switchChane = () => {
  ElMessageBox.confirm(
    '确认要停用此角色吗？',
    '角色操作',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'

    }
  ).then(() => {

  }).catch(() => {

  })

}
const getKey = (row) => {
  return row.id
}
const list = () => {
  roleListApi({
    pageNum: 1,
    pageSize: 10
  }).then(res => {
    data.role_List = res.data.rows
  })
}
const reset = () => {
  from.pageNum = '',
    from.pageSize = '',
    from.roleName = '',
    from.roleKey = '',
    from.status = '',
    from.params = ''
  list()
}
</script>

<style lang="scss" scoped>
.el-dropdown-link{
  outline: 0;
  color: #409eff;
  font-size: 12px;
}
.el-dropdown-lin:hover{
  color:rgb(149, 187, 224)
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