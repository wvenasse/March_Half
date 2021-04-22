<template>
    <div id="power">
        <el-container style="height: 100%;">
            <el-header style="height: auto;">
                <el-row class="toolbar " style="height: auto; ">
                    <el-col :span="20">
                        <el-form :inline="true" size="small">
                            <el-form-item>
                                <el-input placeholder="请输入权限名称" v-model="form.powerIdentity" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item style="margin-left: 10px;">
                                <el-button icon="el-icon-search" size="small" type="primary" @click="loadData">查询
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="4" style="    text-align: right;">
                        <el-button type="primary" size="small" @click="openDiaog(0)">新增</el-button>
                        <el-button title="刷新表格" icon="el-icon-refresh" size="small" circle @click="loadData">
                        </el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="height: 100%;">
                <el-table v-loading="table.loading" size="small" :data="table.tableData" stripe highlight-current-row
                    style="margin: 0px 0px" key="1" height="100%">
                    <el-table-column prop="powerId" label="权限序号"></el-table-column>
                    <el-table-column prop="powerIdentity" label="权限身份"></el-table-column>
                    <el-table-column prop="powerMy" label="我的页面权限">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.powerMy" @change="updateSwitch(scope.row)"
                                active-color="#13ce66" inactive-color="#ff4949" active-value="on" inactive-value="off"
                                >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="powerOrder" label="订单页面权限">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.powerOrder" @change="updateSwitch(scope.row)"
                                active-color="#13ce66" inactive-color="#ff4949" active-value="on" inactive-value="off"
                                >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="powerFavor" label="收藏点赞权限">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.powerFavor" @change="updateSwitch(scope.row)"
                                active-color="#13ce66" inactive-color="#ff4949" active-value="on" inactive-value="off"
                                >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="powerPost" label="讨论页面权限">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.powerPost" @change="updateSwitch(scope.row)"
                                active-color="#13ce66" inactive-color="#ff4949" active-value="on" inactive-value="off"
                                >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <el-button size="small" type="text" @click="openDiaog(scope.row)">修改</el-button>
                            <el-button @click="deleteData(scope.row)" size="small" type="text" class="danger"
                                style="color:red">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer style="height: 34px;">
                <el-pagination small background @size-change="handlePageSizeChange"
                    @current-change="handleCurrentChange" :current-page="pagination.pageIndex"
                    :page-sizes="[5, 10, 20, 30, 40]" :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalRecordCount">
                </el-pagination>
            </el-footer>
        </el-container>
        <el-dialog :title="powerDialog.title" :visible.sync="powerDialog.visible" :append-to-body="true">
            <el-form :model="powerDialog.form">
                <el-form-item label="权限身份" :label-width="powerDialog.formLabelWidth">
                    <el-input v-model="powerDialog.form.powerIdentity" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="小程序端权限" :label-width="powerDialog.formLabelWidth">
                    <el-col :span="12">
                        <el-form-item label="我的页面" prop="powerMy" :label-width="powerDialog.formLabelWidth">
                            <el-switch v-model="powerDialog.form.powerMy" active-color="#13ce66"
                                inactive-color="#ff4949" active-value="on" inactive-value="off" active-text="开启"
                                inactive-text="关闭">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单页面" prop="powerOrder" :label-width="powerDialog.formLabelWidth">
                            <el-switch v-model="powerDialog.form.powerOrder" active-color="#13ce66"
                                inactive-color="#ff4949" active-value="on" inactive-value="off" pactive-text="开启"
                                inactive-text="关闭">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item :label-width="powerDialog.formLabelWidth">
                    <el-col :span="12">
                        <el-form-item label="收藏点赞" prop="powerFavor" :label-width="powerDialog.formLabelWidth">
                            <el-switch v-model="powerDialog.form.powerFavor" active-color="#13ce66"
                                inactive-color="#ff4949" active-value="on" inactive-value="off" pactive-text="开启"
                                inactive-text="关闭">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="讨论页面" prop="powerPost" :label-width="powerDialog.formLabelWidth">
                            <el-switch v-model="powerDialog.form.powerPost" active-color="#13ce66"
                                inactive-color="#ff4949" active-value="on" inactive-value="off" pactive-text="开启"
                                inactive-text="关闭">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="powerDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitPower">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {
        onMounted,
        reactive,
        ref,
    } from "@vue/composition-api";
    import request from "@/utils/request";
    import {
        ShowAllPower,
        UpdatePower,
        AddPower,
        DelPower,
        FindAllPower
    } from "@/api/Power"
    export default {
        name: 'power',
        setup(props, {
            refs,
            root
        }) {
            let form = reactive({
                powerIdentity: ''
            })
            let table = reactive({
                loading: false,
                tableData: []
            })
            let pagination = reactive({
                pageIndex: 1,
                totalRecordCount: 0,
                pageSize: 10,
            })
            let powerDialog = reactive({
                visible: false,
                title: '',
                flag: false,
                form: {
                    powerId: '',
                    powerIdentity: '',
                    powerMy: 'off',
                    powerOrder: 'off',
                    powerFavor: 'off',
                    powerPost: 'off',
                },
                formLabelWidth: '120px'
            })

            const loadData = () => {
                table.loading = true;
                let data = {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                    keyWord: form.powerIdentity
                }
                table.loading = false;
                FindAllPower(data).then(function (response) {
                        table.loading = false;
                        console.log(response);
                        table.tableData = response.data.pageInfo.list;
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const openDiaog = (power) => {
                console.log(power);
                if (power !== 0) {
                    powerDialog.title = '修改权限';
                    powerDialog.flag = true;
                    powerDialog.form = power;
                } else {
                    powerDialog.title = '新增权限';
                    powerDialog.flag = false;
                    powerDialog.form = {};
                }
                powerDialog.visible = true;
            }
            const submitPower = () => {
                let data = {
                    powerIdentity: powerDialog.form.powerIdentity,
                    powerMy: powerDialog.form.powerMy,
                    powerOrder: powerDialog.form.powerOrder,
                    powerFavor: powerDialog.form.powerFavor,
                    powerPost: powerDialog.form.powerPost,
                }
                if (powerDialog.flag) {
                    data['powerId'] = powerDialog.form.powerId
                    UpdatePower(data).then(function (response) {
                            console.log(response);
                            loadData();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    AddPower(data).then(function (response) {
                            console.log(response);
                            loadData();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                powerDialog.visible = false;
            }
            const deleteData = (power) => {
                let data = {
                    powerId: power.powerId
                }
                root.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    DelPower(data).then(function (response) {
                            console.log(response);
                            loadData();
                            root.$message({
                                type: 'success',
                                message: response.data.msg
                                //'删除成功!'
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }).catch(() => {
                    root.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }

            const updateSwitch = (power) => {
                console.log(power);
                UpdatePower(power).then(function (response) {
                        console.log(response);
                        loadData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            const handleCurrentChange = val => {
                pagination.pageIndex = val;
                loadData();
            }
            const handlePageSizeChange = val => {
                pagination.pageSize = val;
                console.log(val)
                loadData();
            }

            onMounted(() => {
                loadData()
            })

            return {
                form,
                table,
                pagination,
                powerDialog,

                loadData,
                openDiaog,
                submitPower,
                deleteData,

                updateSwitch,

                handleCurrentChange,
                handlePageSizeChange
            }
        }
    }
</script>

<style scoped>
    #power {
        background-color: #fff;
        height: 100%;
    }

    .toolbar {
        background-color: #FFFFFF;
        padding: 8px;
    }

    .el-table thead.is-group th {
        background: white;
    }

    .el-form-item--small.el-form-item {
        margin-bottom: 0px !important;
    }
</style>