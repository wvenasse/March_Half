<template>
    <div id="homeNav">
        <el-menu router default-active="/borad" :default-openeds="['1','2','3']" :collapse="isCollapse"
            background-color="#000" text-color="#fff" >
            <!-- transparent active-text-color="#fff"-->
            <el-menu-item index="/borad">
                <i class="el-icon-s-marketing"></i>
                <span slot="title">看板</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">基础数据</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">基本</template>
                    <el-menu-item index="/dorm">寝室管理</el-menu-item>
                    <el-menu-item index="/user">人员管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="论坛">
                    <el-menu-item index="/post">帖子管理</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2">
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
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">基础设置</span>
                </template>
                <el-menu-item index="/type">类别</el-menu-item>
                <el-menu-item index="/power">权限</el-menu-item>
                <el-menu-item index="/admin">管理员</el-menu-item>
            </el-submenu>
        </el-menu>
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
    export default {
        name: 'act',
        setup(props, {
            refs,
            root
        }) {
            let isCollapse = computed(() => root.$store.state.app.isCollapse)

            return {
                isCollapse
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/config.scss";

    #homeNav {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        overflow: auto;
        background: #000;
        transition: all 0.3s ease 0s;
    }

    .open {
        #homeNav {
            width: $navMenu;
        }
    }

    .close {
        #homeNav {
            width: $navMenuMin;
        }
    }
</style>