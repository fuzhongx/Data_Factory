<template>
  <div  class="animate__animated animate__fadeInLeft" style="height: 100%;">
    <div class="user_l">
      <el-input v-model="filterText" placeholder="请输入部门名称" style="padding-bottom: 10px;"/>
      <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" default-expand-all
        :filter-node-method="filterNode" />
    </div>

    <div class="user_r">
      <el-form :inline="true" v-model="from" class="demo-form-inline" label-width="54px">
      <el-form-item label="用户名称">
        <el-input v-model="from.userName" placeholder="请输入用户名称" clearable class="input" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="from.phonenumber" placeholder="请输入手机号码" clearable class="input" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="from.status" placeholder="请选择状态" clearable style="width: 192px; height: 36px">
          <el-option label="正常" value="0" />
          <el-option label="停用" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="from.params" editable format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
          type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 219px;"
         />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSelect" class="tav_btn">查询</el-button>
        <el-button @click="reset" class="tav_btn">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0">
      <el-button class="tav_btn" @click="addPost">新增</el-button>
      <el-button class="tav_btn" @click="updPost" :disabled="disabled">编辑</el-button>
      <el-button class="tav_btn" @click="delPost">删除</el-button>
      <el-button class="tav_btn" @click="handleDaochu">导出</el-button>
    </div>
    <el-table ref="multipleTableRef" :data="user_table" style="width: 100%" 
        :row-key="getKey" :select-on-indeterminate="allChecked" >
        <el-table-column type="selection" width="55" align="center" reserve-selection />
        <el-table-column prop="userId" label="用户编号" align="center" />
        <el-table-column prop="userName" label="用户名称" align="center" />
        <el-table-column prop="nickName" label="姓名" align="center" />
        <el-table-column  label="部门" align="center">
          <span> {{item.dept }}</span>
        </el-table-column>
        <el-table-column prop="phonenumber" label="手机号" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="switchChane"
              :before-change="beforeChange" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <!-- <el-table-column prop="updateTime" label="更新时间" align="center" /> -->
        <el-table-column fixed="right" label="操作"  align="center">
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
                    <el-dropdown-item @click="fenUser(scope.row)">分配用户</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {deptTree,userList} from '@/requert/system/user.js'
import { onMounted, reactive, ref,watch } from 'vue';


onMounted(()=>{
  handTree()
  list()
})
const from=reactive({
  userName:'',
  phonenumber:'',
  status:'0',
  params:''
})

/**
 * list 原始数据获取方法
 * user_table 用于存储后端返回的数据
 * total 后端返回数据总数
 * 
 */
const user_table=ref()
const total=ref(null)
const dept=ref()
const getKey=(row)=>{
  return row.id
}
const list=()=>{
  userList().then(res=>{
    console.log(res);
   user_table.value=res.data.rows
   total.value=res.data.total
   user_table.value.forEach(e => {
     dept.value=e.dept
   });

  })
}

/**
 * data数据Tree结构
 */
const data=ref()

const filterText = ref('')

const treeRef=ref()

const defaultProps = {
  children: 'children',
  label: 'label',
}


const handTree=()=>{
  deptTree().then(res=>{
     data.value=res.data.data
  })
}


/**
 * 拿到输入的值个，过滤存在的值
 */
watch(filterText, (val) => {
  if(treeRef.value){
    treeRef.value.filter(val)
  }
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  outline: 0;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
}
.el-form-item--default .el-form-item__label{
  color: #000 !important;
}
.el-range-editor.el-input__wrapper {
    width: 215px !important;
}
.animate__fadeInLeft{
  display: flex;
}

.user_l {
  width: 18%;
  height: 100%;
  background: #fff;
}

.user_r {
  width: 82%;
  height: 100%;
  padding: 0px 10px;
  background: #fff;
}
</style>