<template>
  <div style="height: 100%;display: flex;">
    <div class="user_l">
      <el-input v-model="filterText" placeholder="请输入部门名称" style="padding-bottom: 10px;" />
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
            type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
            style="width: 215px;" />
        </el-form-item>
        <el-form-item>
          <el-button class="tav_btn" @click.prevent="BtnSelect">查询</el-button>
          <el-button class="tav_btn" @click.prevent="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="margin: 20px 0">
        <el-button class="tav_btn">新增</el-button>
        <el-button class="tav_btn" :disabled="disabled">编辑</el-button>
        <el-button class="tav_btn">删除</el-button>
        <el-button class="tav_btn">导出</el-button>
      </div>
      <el-table ref="multipleTableRef"
        :data="user_table.slice((Page.currentPage - 1) * Page.pageSize, Page.currentPage * Page.pageSize)"
        style="width: 100%" :row-key="getKey">
        <el-table-column type="selection" width="55" align="center" reserve-selection />
        <el-table-column prop="userId" label="用户编号" align="center" />
        <el-table-column prop="userName" label="用户名称" align="center" />
        <el-table-column prop="nickName" label="姓名" align="center" />
        <el-table-column prop="dept.deptName" label="部门" align="center" />
        <el-table-column prop="phonenumber" label="手机号" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-value="0" inactive-value="1"  style="--el-switch-on-color: #3671e8"/>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button link class="btnColor" size="small">
              编辑
            </el-button>
            <el-button link class="btnColor" size="small">
              删除
            </el-button>
            <el-button link class="btnColor" size="small">
              <el-dropdown>
                <span class="el-dropdown-link">更多</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>数据权限</el-dropdown-item>
                    <el-dropdown-item>分配用户</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="Page.currentPage" v-model:page-size="Page.pageSize"
        :page-sizes="Page.page_sizes" :disabled="disabled" background layout="total, sizes, prev, pager, next, jumper"
        :total='total' @size-change="handleSizeChange" @current-change="handleCurrentChange"
        style="float: right; margin-top: 10px;" />
    </div>
  </div>
</template>

<script setup>
import { deptTree, userList } from '@/requert/system/user.js'
import { onMounted, reactive, ref, watch } from 'vue';


onMounted(() => {
  handTree()
  list()
})
const from = reactive({
  userName: '',
  phonenumber: '',
  status: '0',
  params: '',
  pageNum: 1,
  pageSize: 10
})
const disabled = ref(false)

const BtnSelect = () => {
  userList({
    pageNum: from.pageNum,
    pageSize: from.pageSize,
    userName: from.userName,
    phonenumber: from.phonenumber,
    status: from.status,
    'params[beginTime]': from.params[0],
    'params[endTime]': from.params[1],
  }).then(res => {
    user_table.value = res.data.rows
    total.value = res.data.total
  })
}

const reset = () => {
  from.userName = '',
    from.phonenumber = '',
    from.status = '',
    from.params = ''
  list()
}

/**
 * 
 * @param val 分页index 位置
 */

const Page = reactive({
  pageSize: 10,
  currentPage: 1,
  page_sizes: [5, 10, 15, 20]
})

const handleSizeChange = (val) => {
  from.pageSize = val
  Page.currentPage = 1;
  Page.pageSize = val;
  list();
}

const handleCurrentChange = (val) => {
  from.pageNum = val
  Page.currentPage = val
  list();
}
/**
 * list 原始数据获取方法
 * user_table 用于存储后端返回的数据
 * total 后端返回数据总数
 * 
 */
const user_table = ref([])

const total = ref(0)

const getKey = (row) => {
  return row.id
}

const list = () => {
  userList().then(res => {
    user_table.value = res.data.rows
    total.value = res.data.total
  })
}

/**
 * data数据Tree结构
 */

const data = ref()

const filterText = ref('')

const treeRef = ref()

const defaultProps = {
  children: 'children',
  label: 'label',
}


const handTree = () => {
  deptTree().then(res => {
    data.value = res.data.data
  })
}


/**
 * 拿到输入的值个，过滤存在的值
 */
watch(filterText, (val) => {
  if (treeRef.value) {
    treeRef.value.filter(val)
  }
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>

<style lang="scss" scoped>
.btnColor{
  color: #3671e8;
  cursor: pointer;
}
.tav_btn {
  color: #fff;
  background-color: #3671e8;
  border-color: #3671e8;
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 6px;
}

.el-dropdown-link {
  outline: 0;
  color: #409eff;
  font-size: 12px;
  cursor: pointer;
}

.el-form-item--default .el-form-item__label {
  color: #000 !important;
}

.el-range-editor.el-input__wrapper {
  width: 215px !important;
}

.animate__animated{
  display: flex;
  height: 100%;
  background: #fff;
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