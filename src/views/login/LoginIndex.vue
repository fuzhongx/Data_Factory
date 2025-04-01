<template>
    <div class="contair contair-blur">
        <div class="box">
            <el-form ref="ruleFormRef" style="max-width: 450px" :model="LoginForm" status-icon label-width="auto"
                class="demo-ruleForm" :rules="rules">
                <el-form-item>
                    <div class="login-title-box">
                        <i><img src="@/assets/image/logo.png" alt="" srcset="" class="title-img"></i>
                        <h2 class="Login-title">智慧云平台</h2>
                    </div>              
                </el-form-item>
                <el-form-item prop="username">
                    <svg-icon icon-Name="login-user" class="user_icon"></svg-icon>
                    <el-input v-model="LoginForm.username" type="text" autocomplete="off" class="login_user"
                        placeholder="请输入用户名"  @keyup.enter="inpSubmit(ruleFormRef)" />
                </el-form-item>
                <el-form-item prop="password" class="login_psd">
                    <svg-icon icon-Name="psd" class="psd_icon"></svg-icon>
                    <el-input v-model="LoginForm.password" :type="psw?'password':'text'" autocomplete="off" id="pasdValue"
                        placeholder="请输入密码" @keyup.enter="inpSubmit(ruleFormRef)" />
                        <svg-icon icon-Name="login-close" class="psd_open"  v-if="!psw" aria-hidden="true"  @click="psw=!psw"></svg-icon>
                        <svg-icon icon-Name="login-open" class="psd_open" v-else aria-hidden="true" @click="psw=!psw"></svg-icon>
                </el-form-item>
                <el-form-item prop="Num">
                    <svg-icon icon-Name="key" class="psd_icon"></svg-icon>
                    <el-input v-model="LoginForm.Num" class="impt-w-50" placeholder="请输入验证码"  @keyup.enter="inpSubmit(ruleFormRef)" />
                    <img :src="'data:image/jpeg;base64,' + LoginForm.imgs" alt="" class="img-h-46" @click='KeyWord'>
                </el-form-item>
                <el-form-item>
                    <div class="unpaw">
                        <span> <el-checkbox class="checkbox-c-fff" @change="checkedShow" label="记住密码"
                                v-model="data.checkedValue"> </el-checkbox></span>
                        <span>忘记密码</span>
                    </div>
                </el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)" class="btnSubmit"
                    :loading="LoginForm.loading"> 登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { loginApi, captchaApi,listApi } from '@/requert/login/loginApi.js'
import { useRouter } from 'vue-router';
import cookies from "vue-cookies";
import { ElMessage } from 'element-plus';
// import fetchDynamicRoutes from '@/router/router'
const router=new useRouter()

const psw=ref('true')
const data = reactive({
    checkedValue: '',
    tenantId:''
})
const ruleFormRef = ref()
// const router = useRouter()
const LoginForm = reactive({
    username: '',
    password: '',
    captchaKey: '',
    imgs: '',
    Num: '',
    loading: false,
    age: ''
})
const rules = reactive({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [

        { required: true, message: '请输入密码', trigger: 'blur' },
        { message: '请输入密码6到8位数', trigger: 'blur' },
    ],
    Num: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
    ],
})
onMounted(() => {
    pasdFull()
    KeyWord()
    list()
})
const list=()=>{
    listApi().then(res=>{
        data.tenantId=res.data.data.voList
    })
}
const KeyWord=()=>{
    captchaApi().then(res => {
        LoginForm.captchaKey = res.data.data.uuid
        LoginForm.imgs = res.data.data.img
    }).catch(error=>{
        ElMessage.error(error)
    })
}
const checkedShow = () => {
    if (data.checkedValue) {
        localStorage.setItem('username', LoginForm.username)
        localStorage.setItem('password', LoginForm.password)
    } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
    }
}
const pasdFull = () => {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    if (localStorage.getItem('username')) {
        LoginForm.username = username
        LoginForm.password = password
        data.checkedValue = true
    } else {
        data.checkedValue = false
    }

}
  async function inpSubmit(formEl){
    if (!formEl) return 
    await formEl.validate((valid) => {
        if (valid) {
            loginApi({
                code: LoginForm.Num,
                tenantId: "000000",
                username: LoginForm.username,
                password: LoginForm.password,
                uuid: LoginForm.captchaKey,
            }).then(res => {
                if(res.data.code==200){
                cookies.set('token',res.data.data.token)
                localStorage.removeItem('selectKey')
                localStorage.setItem('selectKey','dashboard')
                router.push('/index')
                ElMessage.success('登录成功');
                LoginForm.loading = false
                }else{
                    LoginForm.loading = false
                    KeyWord()
                    ElMessage.error(res.data.msg)
                }
               
            })
                .catch(error => {
                    ElMessage.error(error);
                })
        }
    })
 }
//  res.data.data.tokenType + ' ' + 
const submitForm = async (formEl) => {
    if (!formEl) return 
    await formEl.validate((valid) => {
        if (valid) {
            LoginForm.loading=true 
           loginApi({
                code: LoginForm.Num,
                tenantId: "000000",
                username: LoginForm.username,
                password: LoginForm.password,
                uuid: LoginForm.captchaKey,
            }).then(res => {
                if(res.data.code==200){
                cookies.set('token',res.data.data.token)
                localStorage.removeItem('selectKey')
                localStorage.setItem('selectKey','dashboard')
                router.push('/index')
                ElMessage.success('登录成功');
                LoginForm.loading = false
                }else{
                    LoginForm.loading = false
                    KeyWord()
                    ElMessage.error(res.data.msg)
                }
               
            })
                .catch(error => {
                    ElMessage.error(error);
                    LoginForm.loading = false
                })
            
        }
    })
//   await  fetchDynamicRoutes()
}

</script>

<style lang="scss" scoped>
.title-img{
    width: 25px;
    height: 25px;
    margin-top: 4px;
    margin-right: 10px;
}
.login-title-box{
    display: flex;
    margin: 0 auto;
}
.impt-w-50 {
    position: relative;
}

.img-h-46 {
    height: 44px;
    position: absolute;
    display: inline-block;
    right: 0;
    outline: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    cursor: pointer;
    border: 0px;
    box-sizing: content-box;
}

.el-button--primary {
    background-color: #009688 !important;
    border-color: #009688 !important;
}

.contair {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("@/assets/image/JPEG.jfif");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    background-position: center;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 添加一个模糊滤镜效果 */
// .contair-blur {
//     width: 100%;
//     height: 100vh;
//   background-image: url('@/assets/image/JPEG.jfif');
//   background-size: cover;
//   background-position: center;
//   filter: blur(-5px); /* 模糊效果 */
// }

.box {
    width: 460px;
    height: 386px;
    border-radius: 10px;
    background-color: hsla(0, 0%, 100%, .7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
}

.demo-ruleForm {
    width: 360px;
    height: 360px;
}

.Login-title {
    color: #302f2f;
}

.login_user {
    position: relative;
}

.user_icon {
    position: absolute;
    left: 12px;
    z-index: 33;
    color: #aaa8a8;
    font-size: 12px;
}

.login_psd {
    position: relative;
}

.psd_icon {
    position: absolute;
    left: 10px;
    z-index: 33;
    font-size: 16px;
}
.psd_open {
    position: absolute;
    right: 10px;
    z-index: 33;
    font-size: 16px;
}

::v-deep .el-input__inner {
    height: 44px !important;
    padding-left: 20px;
}

.unpaw {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #aaa8a8;
}

.checkbox-c-fff {
    color: #aaa8a8;
}

.btnSubmit {
    height: 44px;
    width: 100%;
}
</style>
