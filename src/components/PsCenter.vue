<template>
  <div class="contair">
    <el-tabs tab-position="left" class="demo-tabs">
      <el-tab-pane label="信息安全">
        <div class="con-r">
          <div class="imgs-24">
            <img src="@/assets/image/admin.png" alt="" />
          </div>
          <div class="title">系统管理员</div>
          <div>用户名</div>
          <div>手机号码</div>
          <div>邮箱</div>
          <div>部门</div>
          <div>角色</div>
          <div>创建日期</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全设置">
        <div class="con-r">
          <div>
            <h4>账户密码</h4>
            <span>定期修改密码有助于保护账户安全</span>
            <el-button class="updateBtn" @click="data.psdDialogVisible = true"
              >修改</el-button
            >
          </div>
          <div>
            <h4>绑定手机</h4>
            <span>已绑定手机号：17621210366</span>
            <el-button class="updateBtn" @click="data.phoneDialogVisible = true"
              >更换</el-button
            >
          </div>
          <div>
            <h4>绑定邮箱</h4>
            <span>未绑定邮箱</span>
            <el-button class="updateBtn" @click="data.emailDialogVisible = true"
              >绑定</el-button
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 修改 -->
    <el-dialog
      v-model="data.psdDialogVisible"
      title="修改密码"
      width="30%"
      center
    >
      <el-form
        :model="data.passwordUpdated"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPsd">
          <el-input
            v-model="data.passwordUpdated.oldPsd"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPsd">
          <el-input
            v-model="data.passwordUpdated.newPsd"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="newPsds">
          <el-input v-model="data.passwordUpdated.newPsds" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.psdDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="psdSubmit"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 更换 -->
    <el-dialog
      v-model="data.phoneDialogVisible"
      title="绑定手机号"
      width="23%"
      center
    >
      <el-form
        :model="data.phoneUpdated"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="data.phoneUpdated.phone"
            type="text"
            autocomplete="off"
             placeholder="请输入手机号"
             class="ipt-h-40"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="keyWord">
          <el-input
            v-model="data.phoneUpdated.keyWord"
            placeholder="请输入验证码"
            class="input-with-select ipt-h-40"
          >
          <template #append>
            <el-button @click="getKey">发送验证码</el-button>
          </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.phoneDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="psdSubmit"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
     <!-- 绑定邮箱 -->
     <el-dialog
      v-model="data.emailDialogVisible"
      title="重置邮箱"
      width="23%"
      center
    >
      <el-form
        :model="data.emailUpdated"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="email">
          <el-input
            v-model="data.emailUpdated.email"
            type="text"
            autocomplete="off"
             placeholder="请输入手机号"
             class="ipt-h-40"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="keyWord">
          <el-input
            v-model="data.emailUpdated.keyWord"
            placeholder="请输入验证码"
            class="input-with-select ipt-h-40"
          >
          <template #append>
            <el-button @click="getKey">发送验证码</el-button>
          </template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.emailDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="psdSubmit"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { possionApi, passwordApi } from "@/requert/possion/possion.js";
import { ElMessage } from "element-plus";

import { onMounted, reactive } from "vue";

const data = reactive({
  psdDialogVisible: false,
  phoneDialogVisible: false,
  emailDialogVisible: false,
  userPossion: [],
  passwordUpdated: {
    newPsd: "",
    oldPsd: "",
    newPsds: "",
  },
  phoneUpdated:{
   phone:'',
   keyWord:''
  },
  emailUpdated:{
    email:'',
   keyWord:''
  }
});
const rules = {
  oldPsd: [
    { type: "", required: true, message: "请输入旧密码", trigger: "blur" },
  ],
  newPsd: [
    { type: "", required: true, message: "请输入新密码", trigger: "blur" },
  ],
  newPsds: [
    { type: "", required: true, message: "请再次确认新密码", trigger: "blur" },
  ],
  phone: [
    { type: "", required: true, message: "请输入手机号", trigger: "blur" },
  ],
  email: [
    { type: "", required: true, message: "请输入邮箱", trigger: "blur" },
  ],
  keyWord: [
    { type: "", required: true, message: "请输入验证码", trigger: "blur" },
  ],
};
const getKey=()=>{
 
}
const psdSubmit = () => {
  passwordApi({
    confirmPassword: data.passwordUpdated.newPsds,
    newPassword: data.passwordUpdated.newPsds,
    oldPassword: data.passwordUpdated.oldPsd,
  })
    .then((res) => {
      console.log(res);
      data.psdDialogVisible = false;
    })
    .catch((error) => {
      ElMessage.error(error.response.data.msg);
    });
};
const possionList = () => {
  possionApi().then((res) => {
    data.userPossion = res.data.data;
  });
};
onMounted(() => {
  possionList;
});
</script>

<style lang="scss" scoped>
.ipt-h-40{
  height: 40px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.title {
  // width: 180px;
  margin-left: 10px;
}
.demo-tabs {
  width: 100%;
  height: 100vh;
  background: #fff;
}
.imgs-24 {
  width: 180px;
  border-radius: 50%;
}
.con-r {
  width: 100%;
  margin: 10px 10px 10px 0;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  background: #fff;
  div {
    padding: 10px;
    margin-left: 10px;
  }
  h4 {
    font-weight: 700;
    margin: 10px 0;
  }
  span {
    font-size: 14px;
  }
}
.updateBtn {
  font-size: 14px;
  padding: 5px 15px;
  background: #ecf2ff;
  color: #558af5;
  cursor: pointer;
  margin-left: 20px;
}
.updateBtn:hover {
  color: #fff;
  background-color: #558af5;
}
</style>