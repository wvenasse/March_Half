<template>
    <div id="type">
        <el-container style="height: 100%;">
            <el-header style="height: auto;">
                <el-row class="toolbar " style="height: auto; ">
                    <el-col :span="20">
                        <el-form :inline="true" size="small">
                            <el-form-item>
                                <el-input placeholder="请输入类型名称" v-model="form.typeName" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item style="margin-left: 10px;">
                                <el-button icon="el-icon-search" size="small" type="primary" @click="loadData">查询
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="4" style="    text-align: right;">
                        <el-button type="primary" size="small" @click="openDiaog">新增</el-button>
                        <el-button title="刷新表格" icon="el-icon-refresh" size="small" circle @click="loadData">
                        </el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="height: 100%;">
                <el-table v-loading="table.loading" size="small" :data="table.tableData" border highlight-current-row
                    style="margin: 0px 0px" key="1" height="100%">
                    <el-table-column prop="typeId" label="类型序号"></el-table-column>
                    <el-table-column prop="typeName" label="类型名称"></el-table-column>

                    <el-table-column label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <el-button size="small" type="text"  @click="openDiaog(scope.row)">修改</el-button>
                            <el-button @click="deleteData(scope.row)" size="small" type="text" class="danger"
                                style="color:red">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer style="height: 34px;">
                <el-pagination small background @size-change="handlePageSizeChange"
                    @current-change="handleCurrentChange" :current-page="pagination.pageIndex"
                    :page-sizes="[20,100,200,500,1000]" :page-size="pagination.pagesize"
                    layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalRecordCount">
                </el-pagination>
            </el-footer>
        </el-container>
        <el-dialog :title="typeDialog.title" :visible.sync="typeDialog.visible">
            <el-form :model="typeDialog.form">
                <el-form-item label="类别名称" :label-width="typeDialog.formLabelWidth">
                    <el-input v-model="typeDialog.form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitType">确 定</el-button>
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
    export default {
        name: 'type',
        setup(props, {
            refs,
            root
        }) {
            let form = reactive({
                typeName: ''
            })
            let table = reactive({
                loading: false,
                tableData: []
            })
            let pagination = reactive({
                pageIndex: 1,
                totalRecordCount: 0,
                pagesize: 20,
            })
            let typeDialog = reactive({
                visible:false,
                title:'',
                flag:false,
                form: {
                    typeName: '',
                },
                formLabelWidth: '120px'
            })

            const loadData = () => {
                table.loading = true;
                request.request({
                        method: "get",
                        url: "/showAllType",
                    })
                    .then(function (response) {
                        table.loading = false;
                        console.log(response);
                        table.tableData = response.data;
                        table.tableData = table.tableData.filter(function (item) {
                            if (form.typeName != '') return item.typeName == form.typeName;
                            return item;
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const openDiaog = (type) => {
                if (type) {
                    typeDialog.title = '修改类别';
                    typeDialog.flag = true;
                    typeDialog.form = type;
                }
                else {
                    typeDialog.title = '新增类别';
                    typeDialog.flag = false;
                    typeDialog.form = {};
                }
                typeDialog.visible = true;
            }
            const submitType = ()=>{
                if (typeDialog.flag) {
                    console.log('修改成功')
                }
                else {
                    console.log('新增成功')
                }
                typeDialog.visible = false;
            }
            const handleCurrentChange = val => {
                pagination.pageIndex = val;
                loadData();
            }
            const handlePageSizeChange = val => {
                pagination.pagesize = val;
                loadData();
            }

            onMounted(() => {
                loadData()
            })

            return {
                form,
                table,
                pagination,
                typeDialog,

                loadData,
                openDiaog,
                submitType,
                handleCurrentChange,
                handlePageSizeChange
            }
        }
    }
    //table.loading = true;
    // setTimeout(function () {
    //     table.loading = false;
    //     var temp = [{
    //             projectName: '测斜',
    //             dotNumNow: 'p17(17.5m)',
    //             variationNow: '1.45(mm)',
    //             dotNumTotal: 'P11(11.5m)',
    //             variationTotal: '63.42(mm)',
    //             data: '2020-10-01'
    //         },
    //         {
    //             projectName: '地表沉降',
    //             dotNumNow: 'D08-2',
    //             variationNow: '-0.78(mm)',
    //             dotNumTotal: 'D02-2',
    //             variationTotal: '-11.86(mm)',
    //             data: '2020-10-02'
    //         }
    //     ]
    //     table.tableData = temp.filter(function (item) {
    //         if (form.projectVal != '') return item.projectName == form.projectVal;
    //         return item;
    //     }).filter(function (item) {
    //         if (form.dataVal != '') return item.data == form.dataVal;
    //         return item;
    //     });
    //     pagination.totalRecordCount = table.tableData.length;
    // }, 1000);
</script>

<style scoped>
    #type {
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