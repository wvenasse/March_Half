<template>
    <div id="homeHeader">
        <div class="header-icon pull-left">
            <i class="el-icon-s-fold" @click="navMenuState"></i>
            <div class="header-title pull-right">March_Half</div>
        </div>
        <div class="pull-right">
            <div class="user-info pull-left">
                {{nickname}}
            </div>
            <div class=" pull-left">
                <el-dropdown class="header-icon" @command="handleCommand">
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="exit">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog :title="adminDialog.title" :visible.sync="adminDialog.visible" :append-to-body="true">
            <el-form :model="adminDialog.form">
                <el-form-item label="管理员名称" :label-width="adminDialog.formLabelWidth" style="margin-bottom: 20px;">
                    <el-input disabled v-model="adminDialog.form.userName" autocomplete="off" v-if="adminDialog.flag">
                    </el-input>
                    <el-input v-model="adminDialog.form.userName" autocomplete="off" v-else></el-input>
                </el-form-item>
                <el-form-item label="管理员昵称" :label-width="adminDialog.formLabelWidth" style="margin-bottom: 20px;">
                    <el-input v-model="adminDialog.form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" :label-width="adminDialog.formLabelWidth" style="margin-bottom: 20px;">
                    <el-input type="password" v-model="adminDialog.form.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adminDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitAdmin">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        onMounted,
        reactive,
        ref,
        isRef,
        toRefs,
        computed
    } from "@vue/composition-api";
    import request from "@/utils/request";
    import {updateNickName} from "@/utils/app.js"
    import {
        UpdateAdmin,
        ShowAdmin
    } from "@/api/Admin";
    export default {
        name: 'act',
        setup(props, {
            refs,
            root
        }) {
            let nickname = computed(() => root.$store.state.app.nickname)
            let username = computed(() => root.$store.state.app.username)
            const handleCommand = (command) => {
                console.log('click on item ' + command);
                if (command == 'exit') {
                    root.$store.dispatch('exit').then(() => {
                        root.$router.push({
                            name: 'login'
                        })
                    });
                }
                else if (command == 'info') {
                    loadData();
                }
            }
            const navMenuState = () => {
                // root.$store.dispatch('setMenuStatus',{"name": "aaaa"});
                root.$store.commit('SET_COLLAPSE');
            }
            let adminDialog = reactive({
                visible: false,
                title: "",
                flag: false,
                form: {
                    userName: "",
                    nickname: "",
                    password: "",
                },
                formLabelWidth: "120px",
            });
            let cureentAdmin = reactive({
                admin: {
                    powerId: '',
                    powerIdentity: '',
                    powerMy: 'off',
                    powerOrder: 'off',
                    powerFavor: 'off',
                    powerPost: 'off',
                }
            })
            const loadData = () => {
                let data = {
                    userName: root.$store.state.app.username
                };
                ShowAdmin(data)
                    .then(function (response) {
                        console.log(response)
                        cureentAdmin.admin = response.data;
                        openDiaog();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };
            const openDiaog = () => {
                adminDialog.title = "用户信息";
                adminDialog.flag = true;
                adminDialog.form = cureentAdmin.admin;
                console.log(adminDialog.form)
                adminDialog.visible = true;
            };
            const submitAdmin = () => {
                let yy = new Date().getFullYear();
                let m = new Date().getMonth() + 1;
                let mm = m < 10 ? '0' + m : m;
                let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                adminDialog.form.rootTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
                let data = {
                    userName: adminDialog.form.userName,
                    nickname: adminDialog.form.nickname,
                    password: adminDialog.form.password,
                    rootTime: adminDialog.form.rootTime
                };
                UpdateAdmin(data)
                    .then(function (response) {
                        console.log(response);
                        root.$message({
                            type: "success",
                            message: response.data.msg,
                        });
                        root.$store.commit('UPDATE_NICKNAME', adminDialog.form.nickname);
                        updateNickName(adminDialog.form.nickname);
                        adminDialog.visible = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            return {
                nickname,
                username,
                handleCommand,
                navMenuState,
                adminDialog,
                cureentAdmin,
                loadData,
                openDiaog,
                submitAdmin
            }
        }
    }
</script>

<style lang="scss" scoped>
    #homeHeader {
        position: fixed;
        top: 0;
        right: 0;
        height: 75px;
        background: #fff;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
        line-height: 75px;
        transition: all 0.3s ease 0s;
        z-index: 2;
    }

    .open {
        #homeHeader {
            left: $navMenu;
        }
    }

    .close {
        #homeHeader {
            left: $navMenuMin;
        }
    }

    .header-icon {
        font-size: 25px;
        padding: 0 30px;
        cursor: pointer;
    }

    .header-title {
        padding-left: 30px;
    }

    .user-info {
        height: 100%;
        padding: 0 30px;
        border-right: 1px solid #ededed;
    }
</style>