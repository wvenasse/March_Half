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
                    <el-table-column prop="noticeImg" label="公告图片">
                        <template slot-scope="scope">
                            <img class="noticeImg" :src=imgUrl+scope.row.noticeImg alt="公告图片" v-if="scope.row.noticeImg">
                        </template>
                    </el-table-column>
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
                <el-form-item label="公告图片" :label-width="noticeDialog.formLabelWidth" prop="pictureAddress">
                    <form action="" name="file" class="file">
                        上传文件
                        <input type="file" id="saveImage" name="myphoto" @change="tirggerFile($event)" accept="image/*"
                            ref="new_image" v-if="noticeDialog.visible">
                    </form>
                    <div>{{imgName}}</div>
                </el-form-item>
                <el-form-item label="公告内容" :label-width="noticeDialog.formLabelWidth">
                    <tinymce-editor ref="editor" v-model="noticeDialog.form.noticeDetail" @onClick="onClick" v-if="noticeDialog.visible">
                    </tinymce-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="noticeDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitNotice">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import TinymceEditor from '../../components/System/tinymce'
    import {
        onMounted,
        reactive,
        ref,
        computed,
        set
    } from "@vue/composition-api";
    import request from "@/utils/request";
    import {
        showAllNotice,
        addNotice,
        updateNotice,
        delNotice,
        FindAllNotice,
        addImage
    } from "@/api/Notice"
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

            //数据操作
            const loadData = () => {
                table.loading = true;
                let data = {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                    keyWord: form.typeName
                }
                table.loading = false;
                table.tableData = [{noticeId:1,noticeName:'公告',noticeImg:'/Users/weidian/Documents/WechatIMG17.jpeg',noticeDetail:'123456'}];
                pagination.totalRecordCount = 1;
                // FindAllNotice(data).then(function (response) {
                //         table.loading = false;
                //         console.log(response);
                //         table.tableData = response.data.pageInfo.list;
                //         pagination.totalRecordCount = response.data.pageInfo.total;
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            }
            const openDiaog = (type) => {
                if (type !== 0) {
                    noticeDialog.title = '修改公告';
                    noticeDialog.flag = true;
                    noticeDialog.form = type;
                    imgName.value = type.noticeImg;
                } else {
                    noticeDialog.title = '新增公告';
                    noticeDialog.flag = false;
                    noticeDialog.form = {};
                    imgName.value = "未选择任何文件";
                }
                noticeDialog.visible = true;
            }
            const submitNotice = () => {
                    let data = {
                            noticeId: noticeDialog.form.noticeId,
                            noticeName: noticeDialog.form.noticeName,
                            noticeImg: imgName.value,
                            noticeDetail: noticeDialog.form.noticeDetail
                    }
                    if (noticeDialog.flag) {
                        updateNotice(data)
                            .then(function (response) {
                                console.log(response);
                                loadData();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
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

            //文件上传
            let formData = new FormData();
            let imgName = ref("未选择任何文件");
            let imgUrl = ref("http://localhost:8088/image/");
            const tirggerFile = (event) => {
                console.log(event)
                if (event.target.files.length !== 0) {
                    formData.append('image_data', event.target.files[0]);
                    console.log(formData)
                    imgName.value = event.target.files[0].name;
                    addImage(formData).then(response => {
                        console.log(response.data.fileName);
                        root.$message({
                            type: 'info',
                            message: response.data.msg
                        });
                    })
                }
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

                loadData,
                openDiaog,
                submitNotice,
                deleteData,

                handleCurrentChange,
                handlePageSizeChange,

                formData,
                imgName,
                imgUrl,
                tirggerFile
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

    .file {
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        cursor: pointer;
        background-color: #409eff;
        border-radius: 3px;
        float: left;
    }

    .file input {
        width: 80px;
        height: 40px;
        opacity: 0;
        filter: alpha(opacity=0);
        position: absolute;
        left: 0;
        top: 0;
    }

    .noticeImg {
        height: 40px;
        max-height: 100%;
        max-width: 100%;
    }
</style>