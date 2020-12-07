<template>
    <div id="notice">
        <el-container style="height: 100%;">
            <el-header style="height: auto;">
                <el-row class="toolbar " style="height: auto; ">
                    <el-col :span="20">
                        <el-form :inline="true" size="small">
                            <el-form-item>
                                <el-input placeholder="请输入公告名称" v-model="form.noticeName" clearable>
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
                    <el-table-column prop="noticeId" label="公告序号"></el-table-column>
                    <el-table-column prop="noticeName" label="公告名称"></el-table-column>
                    <el-table-column prop="noticeImg" label="公告图片"></el-table-column>
                    <el-table-column prop="noticeDetail" label="公告内容">
                        <template slot-scope="scope">
                            <div v-html="scope.row.noticeDetail"></div>
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

        <el-dialog :title="noticeDialog.title" :visible.sync="noticeDialog.visible" :append-to-body="true">
            <el-form :model="noticeDialog.form">
                <el-form-item label="公告名称" :label-width="noticeDialog.formLabelWidth">
                    <el-input v-model="noticeDialog.form.noticeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告图片" :label-width="noticeDialog.formLabelWidth">
                    <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="公告内容" :label-width="noticeDialog.formLabelWidth">
                    <tinymce-editor ref="editor" v-model="noticeDialog.form.noticeDetail"
                        @onClick="onClick" v-if="noticeDialog.visible">
                    </tinymce-editor>
                    <el-button type="danger" icon="el-icon-delete" circle @click="clear"></el-button>
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
    import TinymceEditor from '../../components/System/tinymce'
    import { onMounted,reactive,ref } from "@vue/composition-api";
    import request from "@/utils/request";
    import {showAllNotice,addNotice,updateNotice,delNotice,FindAllNotice} from "@/api/Notice"
    export default {
        name: 'type',
        components: {
            TinymceEditor
        },
        setup(props, {
            refs,
            root
        }) {
            let form = reactive({
                noticeName: ''
            })
            let table = reactive({
                loading: false,
                tableData: []
            })
            let pagination = reactive({
                pageIndex: 1,
                totalRecordCount: 0,
                pageSize: 5,
            })
            //表单
            let noticeDialog = reactive({
                visible: false,
                title: '',
                flag: false,
                form: {
                    noticeName: '',
                    noticeImg: '',
                    noticeDetail: ''
                },
                formLabelWidth: '120px'
            })
            
            //富文本
            const onClick = ((e, editor) => {
                // console.log('Element clicked')
                // console.log(e)
                // console.log(editor)
            })
            const clear = () => {
                noticeDialog.form.noticeDetail = '';
                // root.$refs.editor.clear()
            }

            const loadData = () => {
                table.loading = true;
                 let data = {
                    pageIndex:pagination.pageIndex,
                    pageSize:pagination.pageSize,
                    keyWord:form.typeName
                }
                FindAllNotice(data).then(function (response) {
                        table.loading = false;
                        console.log(response);
                        table.tableData = response.data.list;
                        pagination.totalRecordCount = response.data.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const openDiaog = (type) => {
                console.log(type);
                if (type !== 0) {
                    noticeDialog.title = '修改公告';
                    noticeDialog.flag = true;
                    noticeDialog.form = type;
                } else {
                    noticeDialog.title = '新增公告';
                    noticeDialog.flag = false;
                    noticeDialog.form = {};
                }
                noticeDialog.visible = true;
            }
            const submitType = () => {
                let data;
                if (noticeDialog.flag) {
                    data = {
                        noticeId: noticeDialog.form.noticeId,
                        noticeName: noticeDialog.form.noticeName,
                        noticeImg: noticeDialog.form.noticeImg,
                        noticeDetail: noticeDialog.form.noticeDetail
                    }
                    updateNotice(data)
                        .then(function (response) {
                            console.log(response);
                            loadData();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    data = {
                        noticeName: noticeDialog.form.noticeName,
                        noticeImg: noticeDialog.form.noticeImg,
                        noticeDetail: noticeDialog.form.noticeDetail
                    }
                    console.log(data);
                    addNotice(data)
                        .then(function (response) {
                            console.log(response);
                            loadData();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                noticeDialog.visible = false;
            }
            const deleteData = (notice) => {
                let data = {
                    noticeId: notice.noticeId
                }
                root.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   delNotice(data)
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
                
                noticeDialog,
               
                onClick,
                clear,

                loadData,
                openDiaog,
                submitType,
                deleteData,

                handleCurrentChange,
                handlePageSizeChange
            }
        }
    }
</script>

<style scoped>
    #notice {
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

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
</style>