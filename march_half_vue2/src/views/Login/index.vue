<template>
    <div id="login">
        <div class="login-wrap">
            <el-tabs v-model="activeName" stretch @tab-click="handleClick">
                <el-tab-pane label="登录" name="login">
                    <el-form class="login-form" :label-position="labelPosition" label-width="80px" size="medium "
                        :model="formLabelAlign">
                        <el-form-item label="用户名">
                            <el-input v-model="formLabelAlign.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="formLabelAlign.userPass"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align: center;">
                            <el-button type="primary" @click="loginBtn">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="regist">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :label-position="registPosition"
                        label-width="80px" size="medium " class="demo-ruleForm regist-form">
                        <el-form-item label="邮箱" prop="email">
                            <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" minlength="6"
                                maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="code">
                            <el-col :span="11">
                                <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                            </el-col>
                            <el-col :span="13">
                                <el-button style="float:right;" type="">验证码</el-button>
                            </el-col>
                        </el-form-item>
                        <el-form-item style="text-align: center;">
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {onMounted, reactive,ref} from '@vue/composition-api'
    import {getSms} from '@/api/login'
    // import {xxxx} from '@/api/login.js'
    import {
        stripscript,
        validateEmail,
        validatePassword
    } from '@/utils/validate.js'

    export default {
        name: 'login',
        // context
        setup(props, {
            refs
        }) {

            var checkEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('邮箱不能为空'));
                } else if (validateEmail(value)) {
                    callback(new Error('邮箱格式不正确，请重新输入！'));
                } else {
                    callback();
                }
            };
            var checkCode = (rule, value, callback) => {
                ruleForm.code = stripscript(value);
                value = stripscript(value);
                let reg = /^[a-z0-9]{6}$/;
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else if (!reg.test(value)) {
                    callback(new Error('验证码格式错误'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                ruleForm.pass = stripscript(value);
                value = stripscript(value);
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (validatePassword(value)) {
                    callback(new Error('密码为6至20位数字+字母'));
                } else {
                    if (ruleForm.checkPass !== '') {
                        refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                ruleForm.checkPass = stripscript(value);
                value = stripscript(value);
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            const activeName = ref('login');
            const labelPosition = ref('top');
            const registPosition = ref('left');
            let formLabelAlign = reactive({
                userName: '',
                userPass: '',
                aginPass: '',
            });
            let ruleForm = reactive({
                email: '',
                pass: '',
                checkPass: '',
                code: ''
            });
            let rules = reactive({
                email: [{
                    validator: checkEmail,
                    trigger: 'blur'
                }],
                pass: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur'
                }],
                code: [{
                    validator: checkCode,
                    trigger: 'blur'
                }],
            });

            const handleClick = ((tab, event) => {
                console.log(tab, event);
            });
            const submitForm = (formName => {
                


                refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            });
            const resetForm = (formName => {
                refs[formName].resetFields();
            });
            const loginBtn = () => {
                // 为给定 ID 的 user 创建请求

                console.log("成功登录！");
            };

            onMounted(()=>{
                getSms()
            })

            return {
                checkEmail,
                checkCode,
                validatePass,
                validatePass2,
                activeName,
                labelPosition,
                registPosition,
                formLabelAlign,
                ruleForm,
                rules,
                handleClick,
                submitForm,
                resetForm,
                loginBtn
            }

        },
    }
</script>

<style scoped>
    #login {
        background: url("../../assets/imgs/backhround1.jpg");
        width: 100%;
        height: 100%;
        position: fixed;
        background-size: 100% 100%;
    }

    .login-wrap {
        position: relative;
        width: 30%;
        margin: 0 auto;
        top: 50px;
        background: rgba(255, 255, 255, 0.3);
    }

    .el-tabs__header {
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        font-size: 20px;
    }

    .login-form{
        width: 50%;
        margin: 0 auto;
    }
    .regist-form {
        width: 70%;
        margin: 0 auto;
    }
</style>