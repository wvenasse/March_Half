<template>
  <div id="login">
    <div class="login-wrap">
      <el-tabs v-model="activeName" stretch @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form class="login-form" :label-position="labelPosition" label-width="80px" size="medium "
            :model="formLabelAlign">
            <el-form-item label="用户账号">
              <el-input v-model="formLabelAlign.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formLabelAlign.userPass" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item style="text-align: center;">
              <el-button type="primary" @click="login">登录</el-button>
              <!-- loginBtn -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="regist">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :label-position="registPosition"
            label-width="80px" size="medium " class="demo-ruleForm regist-form">
            <el-form-item label="用户账号" prop="userName">
              <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="nickname">
              <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" minlength="6" maxlength="20">
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="邮箱" prop="email">
              <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="验证码" prop="code">
              <el-col :span="11">
                <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
              </el-col>
              <el-col :span="13">
                <el-button style="float:right;" type="">验证码</el-button>
              </el-col>
            </el-form-item> -->
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
  import { onMounted,reactive,ref,isRef,toRefs} from "@vue/composition-api";
  import request from "@/utils/request";
  import {Login,ShowUser,AddAdmin} from "@/api/Login"
  import {stripscript,validateUserName,validatePassword} from "@/utils/validate.js";
  import {Message} from 'element-ui';
  import {setToken,setUserName,setNickName} from "@/utils/app"
  export default {
    name: "login",
    setup(props, {
      refs,
      root
    }) {
      var checkUserName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("账号不能为空"));
        } else if (validateUserName(value)) {
          callback(new Error("账号格式不正确，请重新输入"));
          root.$message({
            showClose: true,
            message: '用户账号格式应为3到16位（字母，数字，下划线，减号）',
            type: 'warning'
          });
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        ruleForm.pass = stripscript(value);
        value = stripscript(value);
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (validatePassword(value)) {
          callback(new Error("密码为6至20位数字+字母"));
        } else {
          if (ruleForm.checkPass !== "") {
            refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        ruleForm.checkPass = stripscript(value);
        value = stripscript(value);
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      const activeName = ref("login");
      const labelPosition = ref("top");
      const registPosition = ref("left");
      let formLabelAlign = reactive({
        userName: "",
        userPass: "",
        aginPass: ""
      });
      let ruleForm = reactive({
        userName: "",
        nickname: "",
        pass: "",
        checkPass: ""
      });
      let rules = reactive({
        userName: [{
          validator: checkUserName,
          trigger: "blur"
        }],
        pass: [{
          validator: validatePass,
          trigger: "blur"
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: "blur"
        }],
      });
      const handleClick = (tab, event) => {
        console.log(tab, event);
      };

      const submitForm = formName => {
        refs[formName].validate(valid => {
          if (valid) {
            let yy = new Date().getFullYear();
            let m = new Date().getMonth() + 1;
            let mm = m < 10 ? '0' + m : m;
            let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
            let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            let time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            let data = {
              userName: ruleForm.userName,
              nickname: ruleForm.nickname,
              password: ruleForm.pass,
              rootTime: time
            };
            console.log(data);
            AddAdmin(data).then(response => {
              console.log(response);
              activeName.value = 'login';
              Message.success(response.data.msg);
            }).catch(function (error) {
              console.log(error);
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      };
      const resetForm = formName => {
        refs[formName].resetFields();
      };
      const login  = (()=>{
        let data = {
          userName: formLabelAlign.userName,
          password: formLabelAlign.userPass
        };
        let data1 = {
          userName: formLabelAlign.userName,
        }
        root.$router.push({
          name: 'home',
        });
        Login(data).then(response => {
          console.log(response);
          Message.success(response.data.msg);
          if (response.data.code != 0) {
            root.$store.commit('SET_TOKEN','admin_token');
            setToken('admin_token');
            
            ShowUser(data1).then(response => {
              console.log(response);
              root.$store.commit('SET_NICKNAME',response.data.nickname);
              setNickName(response.data.nickname);
              root.$store.commit('SET_USERNAME',response.data.userName);
              setUserName(response.data.userName);
            })
            root.$router.push({
              name: 'home',
            })
          }
        }).catch(function (error) {
          console.log(error);
        });
      })
      onMounted(() => {
        
      });

      return {
        checkUserName,
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
        login
      };
    }
  };
</script>

<style scoped>
  #login {
    background: url("../../../public/imgs/Login/backhround3.jpg");
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

  .login-form {
    width: 50%;
    margin: 0 auto;
  }

  .regist-form {
    width: 70%;
    margin: 0 auto;
  }
</style>