<template>
    <div id="home">
        <el-container>
            <el-header class="top_menu">
                <el-row>
                    <el-col :span="12" class="top_label">
                        <h2>
                            <!-- <img class="home_logo" src="../../assets/imgs/lo.png" alt="" width="60px" style="margin-top"> -->
                            <label class="title" text="MARCH_HALF">MARCH_HALF</label>
                        </h2>
                    </el-col>
                    <el-col :span="12" class="top_menu">
                        <el-menu mode="horizontal" background-color="#009E9D" text-color="#ffffff"
                            active-text-color="#ffffff">
                            <el-menu-item>{{currentPerson.nickname}}</el-menu-item>
                            <el-submenu index="2">
                                <template slot="title">设置</template>
                                <el-menu-item index="2-1">修改密码</el-menu-item>
                                <el-menu-item index="2-2">个人信息</el-menu-item>
                                <el-menu-item index="2-3">退出系统</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        background-color="#009E9D" text-color="#fff" active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import {
        onMounted,
        reactive,
        ref,
    } from "@vue/composition-api";
    import request from "@/utils/request";
    export default {
        name: 'home',
        setup(props, {
            refs,
            root
        }) {
            let skin = reactive({
                system: {
                    color: '#000'
                },
                leftMenu: {
                    style: 0, //0-element菜单导航，1-自定义列表菜单（全部展开）
                    backgroundColor: "#ffffff", //左侧菜单区域的背景色
                    mainMenuBgColor: "#ffffff", //左侧主菜单（一级菜单）背景色
                    subMenuBgColor: "#ffffff", //左侧二级菜单背景色
                    textColor: "#000", //菜单文字颜色
                    activeTextColor: "#ff0000" //选中时的菜单颜色,选中时菜单的背景色在html页面中的is-active定义
                }
            });
            let leftMenu = reactive({
                defaultMenuWidth: 220,
                width: '220px',
                isCollapse: false,
                showMenuExpandBtn: false, //是否显示左侧菜单折叠按钮
                menuStateClass: 'el-icon-s-fold', //折叠按钮样式
                defaultMenu: -1,
                currentUrl: "about:blank",
                tempUrl: "",
                menus: [],
                // menuMap: new HashMap(),
            })
            let allowSwitchPerson = ref(true);
            let currentPerson = ref({});

            const userData = (() => {
                let userName = root.$route.query.userName;
                let data = {
                    userName: userName
                }
                request.request({
                        method: "get",
                        url: "/showUser",
                        params: data
                    })
                    .then(function (response) {
                        console.log(response);
                        currentPerson.value = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            });
            const handleOpen = ((key, keyPath) => {
                console.log(key, keyPath);
            })
            const handleClose = ((key, keyPath) => {
                console.log(key, keyPath);
            })
            onMounted(() => {
                userData();
            })
            return {
                skin,
                leftMenu,
                allowSwitchPerson,
                currentPerson,

                userData,
                handleOpen,
                handleClose
            }
        }
    };
</script>
<style scoped>
    #home,
    section {
        height: 100%;
    }

    #home {
        background: url("../../assets/imgs/summer.jpg");
        width: 100%;
        height: 100%;
        position: fixed;
        background-size: 100% 100%;
    }

    .el-header {
        background-color: #009E9D;
        color: #000000;
        text-align: center;
        line-height: 60px;
        height: 60px;
    }

    .el-aside {
        background-color: #009E9D;
        color: #000000;
        text-align: center;
    }

    .el-main {
        background-color: #ffffff;
        /* background-image: radial-gradient( rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1)); */
        /* rgba(255, 255, 255, 0.9); */
        color: #000000;
        text-align: center;
    }

    .el-menu--horizontal>.el-menu-item,
    .el-menu--horizontal>.el-submenu {
        float: right;
    }

    .el-menu.el-menu--horizontal {
        border: 0;
    }

    .title {
        font-size: 40px;
        font-weight: 600;
        cursor: pointer;
        background-image: linear-gradient(to right, #ffffff, #72f0f0);
        color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .el-menu-item-group__title {
        color: #CDDC39;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>