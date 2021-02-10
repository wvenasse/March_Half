<template>
    <div id="homeNav">
        <el-menu router :default-active="$route.path"  :default-openeds="['1','2','3']" :collapse="isCollapse"
            background-color="#000" text-color="#fff" >
            <!--default-active="/borad" transparent active-text-color="#fff"-->
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
                    <el-menu-item index="/user">用户管理</el-menu-item>
                    <el-menu-item index="/service">服务人员管理</el-menu-item>
                    <el-menu-item index="/institution">服务机构管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="讨论">
                    <el-menu-item index="/post">帖子管理</el-menu-item>
                </el-menu-item-group>
                 <el-menu-item-group title="服务">
                    <el-menu-item index="/order">订单管理</el-menu-item>
                    <el-menu-item index="/evaluation">评价管理</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2">
                    <template slot="title">信息</template>
                    <el-menu-item index="/notice">公告管理</el-menu-item>
                    <el-menu-item index="/inform">通知管理</el-menu-item>
                    <el-menu-item index="/message">消息管理</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">基础设置</span>
                </template>
                <el-menu-item index="/type">类别管理</el-menu-item>
                <el-menu-item index="/power">权限管理</el-menu-item>
                <el-menu-item index="/admin">管理员管理</el-menu-item>
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