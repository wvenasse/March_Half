<template>
    <div id="inform">
        <el-container style="height: 100%;">
            <el-header style="height: auto;">
                <el-row class="toolbar " style="height: auto; ">
                    <el-col :span="20">
                        <el-form :inline="true" size="small">
                            <el-form-item>
                                <el-input placeholder="请输入通知内容" v-model="form.informDetail" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item style="margin-left: 10px;">
                                <el-button icon="el-icon-search" size="small" type="primary" @click="loadData">查询
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="4" style="text-align: right;">
                        <el-button type="primary" size="small" @click="openDiaog(0)">新增</el-button>
                        <el-button title="刷新表格" icon="el-icon-refresh" size="small" circle @click="loadData">
                        </el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="height: 100%;">
                <el-table v-loading="table.loading" size="small" :data="table.tableData" stripe highlight-current-row
                    style="margin: 0px 0px" key="1" height="100%">
                    <el-table-column prop="informId" label="通知序号"></el-table-column>
                    <el-table-column prop="informTitle" label="通知标题"></el-table-column>
                    <el-table-column prop="informDetail" label="通知内容">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.informDetail" placement="bottom" effect="light">
                               <div class="informDetail">{{scope.row.informDetail}}</div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="informRoot" label="发布者"></el-table-column>
                    <el-table-column prop="informTime" label="发布时间"></el-table-column>
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

        <el-dialog :title="informDialog.title" :visible.sync="informDialog.visible" :append-to-body="true">
            <el-form :model="informDialog.form">
                <el-form-item label="通知题目" :label-width="informDialog.formLabelWidth">
                    <el-input v-model="informDialog.form.informTitle" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="通知内容" :label-width="informDialog.formLabelWidth">
                    <el-input type="textarea" placeholder="请输入内容" maxlength="100" show-word-limit
                    v-model="informDialog.form.informDetail">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="informDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitinform">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        onMounted,
        reactive,
        ref,
        computed,
        set
    } from "@vue/composition-api";
    import request from "@/utils/request";
    import {
        addInform,
        updateInform,
        delInform,
        FindAllInform
    } from "@/api/Inform"
    import {
        addImage
    } from "@/api/System"
    export default {
        name: 'inform',
        setup(props, {
            refs,
            root
        }) {
            let form = reactive({
                informDetail: ''
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
            //表单
            let informDialog = reactive({
                visible: false,
                title: '',
                flag: false,
                form: {
                    informId:'',
                    informTitle: '',
                    informDetail: ''
                },
                formLabelWidth: '120px'
            })

            //数据操作
            const loadData = () => {
                table.loading = true;
                let data = {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                    keyWord: form.informDetail
                }
                table.loading = false;
                FindAllInform(data).then(function (response) {
                        table.loading = false;
                        console.log(response);
                        table.tableData = response.data.pageInfo.list;
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const openDiaog = (inform) => {
                if (inform !== 0) {
                    informDialog.title = '修改通知';
                    informDialog.flag = true;
                    informDialog.form = inform;
                } else {
                    informDialog.title = '新增通知';
                    informDialog.flag = false;
                    informDialog.form = {};
                }
                informDialog.visible = true;
            }
            const submitinform = () => {
                let yy = new Date().getFullYear();
                let m = new Date().getMonth() + 1;
                let mm = m < 10 ? '0' + m : m;
                let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
                informDialog.form.informTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
                let data = {
                    informId: informDialog.form.informId,
                    informTitle: informDialog.form.informTitle,
                    informDetail: informDialog.form.informDetail,
                    informTime: informDialog.form.informTime,
                    rootId: localStorage.getItem('rootId'),
                    informRoot: localStorage.getItem('nickname'),
                }
                if (informDialog.flag) {
                    updateInform(data)
                        .then(function (response) {
                            console.log(response);
                            loadData();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    addInform(data)
                        .then(function (response) {
                            console.log(response);
                            loadData();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                informDialog.visible = false;
            }
            const deleteData = (inform) => {
                let data = {
                    informId: inform.informId
                }
                root.$confirm('此操作将永久删除该通知, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delInform(data)
                        .then(function (response) {
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

            const handleCurrentChange = val => {
                pagination.pageIndex = val;
                loadData();
            }
            const handlePageSizeChange = val => {
                pagination.pageSize = val;
                loadData();
            }

            onMounted(() => {
                loadData()
            })

            return {
                form,
                table,
                pagination,

                informDialog,
                loadData,
                openDiaog,
                submitinform,
                deleteData,

                handleCurrentChange,
                handlePageSizeChange,
            }
        }
    }
</script>

<style scoped>
    #inform {
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

    .informDetail {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>