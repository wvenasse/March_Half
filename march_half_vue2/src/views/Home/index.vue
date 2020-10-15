<template>
    <div id="home">
        <el-container style="height:100vh;">
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{currentPerson.nickname}}</span>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu router default-active="/borad" :default-openeds="['1','2','3']">
                        <el-menu-item index="/borad"><i class="el-icon-s-marketing"></i>看板</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>基础数据</template>
                            <el-menu-item-group>
                                <template slot="title">基本</template>
                                <el-menu-item index="/dorm">寝室管理</el-menu-item>
                                <el-menu-item index="/user">人员管理</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="论坛">
                                <el-menu-item index="/post">帖子管理</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1">
                                <template slot="title">首页</template>
                                <el-menu-item index="/notice">公告管理</el-menu-item>
                                <el-menu-item index="/pay">缴费管理</el-menu-item>
                                <el-menu-item index="/hygiene">卫生管理</el-menu-item>
                                <el-menu-item index="/repair">报修管理</el-menu-item>
                                <el-menu-item index="/out">外出管理</el-menu-item>
                                <el-menu-item index="/act">活动管理</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-s-tools"></i>基础设置</template>
                            <!-- <el-submenu index="3-1">
                                <template slot="title">类别</template>
                                <el-menu-item index="3-1-1">楼宇</el-menu-item>
                                <el-menu-item index="3-1-2">寝室</el-menu-item>
                                <el-menu-item index="3-1-3">人员</el-menu-item>
                                <el-menu-item index="3-1-4">缴费</el-menu-item>
                                <el-menu-item index="3-1-5">报修</el-menu-item>
                                <el-menu-item index="3-1-6">活动</el-menu-item>
                            </el-submenu> -->
                            <el-menu-item index="/type">类别</el-menu-item>
                            <el-menu-item index="/power">权限</el-menu-item>
                            <el-menu-item index="/admin">管理员</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
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
            let currentPerson = ref({});
            const userData = (() => {
                var rootStr = sessionStorage.getItem('root');
                var rootJson = JSON.parse(rootStr);
                currentPerson.value = rootJson;
            });
            onMounted(() => {
                userData();
            })
            return {
                currentPerson,
                userData,
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
        /* background: url("../../assets/imgs/summer.jpg"); */
        width: 100%;
        height: 100%;
        position: fixed;
        background-size: 100% 100%;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .el-menu {
        height: 100%;
    }

    .el-main {
        padding: 0;
    }
</style>