<template>
    <div id="homeHeader">
        <div class="header-icon pull-left">
            <i class="el-icon-s-fold" @click="navMenuState"></i>
            <div class="header-title pull-right">March_Half</div>
        </div>
        <div class="pull-right">
            <div class="user-info pull-left">
                <!-- <img src="../../assets/imgs/admin.jpg" alt=""> -->
                {{nickname}}
            </div>
            <div class=" pull-left">
                <el-dropdown class="header-icon" @command="handleCommand">
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit">修改密码</el-dropdown-item>
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="exit">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import {onMounted,reactive,ref,isRef,toRefs,computed} from "@vue/composition-api";
    import request from "@/utils/request";
    export default {
        name: 'act',
        setup(props, {refs, root}) {
            let nickname = computed(() => root.$store.state.app.nickname)
            const handleCommand = (command) => {
                console.log('click on item ' + command);
                if (command=='exit') {
                    root.$store.dispatch('exit').then(()=>{
                        root.$router.push({
                            name:'login'
                        })
                    });
                }
            }
            const navMenuState = () => {
                // root.$store.dispatch('setMenuStatus',{"name": "aaaa"});
                root.$store.commit('SET_COLLAPSE');
            }
            return {
                nickname,
                handleCommand,
                navMenuState
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

    .header-title{
        padding-left: 30px;
    }

    .user-info {
        height: 100%;
        padding: 0 30px;
        border-right: 1px solid #ededed;
    }

    
</style>