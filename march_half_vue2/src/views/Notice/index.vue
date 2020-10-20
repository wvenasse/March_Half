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
                    <el-table-column prop="noticeId" label="公告序号"></el-table-column>
                    <el-table-column prop="noticeName" label="公告名称"></el-table-column>
                    <el-table-column prop="noticeImg" label="公告图片"></el-table-column>
                    <el-table-column prop="noticeDetail" label="公告内容"></el-table-column>
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
                    :page-sizes="[20,100,200,500,1000]" :page-size="pagination.pagesize"
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
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/addFile'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess" 
                    :before-upload="beforeAvatarUpload">
                    <img v-if="noticeDialog.form.noticeImg" :src="noticeDialog.form.noticeImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                    <!-- <el-upload action="#" list-type="picture-card" :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!imgDialog.disabled" class="el-upload-list__item-delete"
                                    @click="handleDownload(file)">
                                    <i class="el-icon-download"></i>
                                </span>
                                <span v-if="!imgDialog.disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="imgDialog.visible">
                        <img width="100%" :src="noticeDialog.form.noticeImg" alt="">
                    </el-dialog> -->
                    
                </el-form-item>
                <el-form-item label="公告内容" :label-width="noticeDialog.formLabelWidth">
                    <el-input v-model="noticeDialog.form.noticeDetail" autocomplete="off"></el-input>
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
                noticeName: ''
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

            let imgDialog = reactive({
                visible: false,
                disabled:false
            })
            

            const loadData = () => {
                table.loading = true;
                request.request({
                        method: "get",
                        url: "/showAllNotice",
                    })
                    .then(function (response) {
                        table.loading = false;
                        // console.log(response);
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
                if (noticeDialog.flag) {
                    let data = {
                        noticeId: noticeDialog.form.typeId,
                        noticeName: noticeDialog.form.typeName,
                        noticeImg: noticeDialog.form.noticeImg,
                        noticeDetail: noticeDialog.form.noticeDetail
                    }
                    console.log(data);
                    // request.request({
                    //         method: "get",
                    //         url: "/updateNotice",
                    //         params: data
                    //     })
                    //     .then(function (response) {
                    //         console.log(response);
                    //         loadData();
                    //     })
                    //     .catch(function (error) {
                    //         console.log(error);
                    //     });
                } else {
                    let data = {
                        noticeName: noticeDialog.form.noticeName,
                        noticeImg: noticeDialog.form.noticeImg,
                        noticeDetail: noticeDialog.form.noticeDetail
                    }
                    console.log(data);
                    // request.request({
                    //         method: "get",
                    //         url: "/addNotice",
                    //         params: data
                    //     })
                    //     .then(function (response) {
                    //         console.log(response);
                    //         loadData();
                    //     })
                    //     .catch(function (error) {
                    //         console.log(error);
                    //     });
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
                    // request.request({
                    //         method: "get",
                    //         url: "/delNotice",
                    //         params: data
                    //     })
                    //     .then(function (response) {
                    //         console.log(response);
                    //         loadData();
                    //         root.$message({
                    //             type: 'success',
                    //             message: response.data.msg
                    //             //'删除成功!'
                    //         });
                    //     })
                    //     .catch(function (error) {
                    //         console.log(error);
                    //     });
                }).catch(() => {
                    root.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
            
            const handleRemove = (file) => {
                console.log(file);
            }
            const handlePictureCardPreview = (file) => {
                imgDialog.dialogImageUrl = file.url;
                imgDialog.visible = true;
            }
            const handleDownload = (file) => {
                console.log(file);
            }

            const handleAvatarSuccess = (res, file) => {
                console.log(res)
                console.log(file)
                noticeDialog.form.noticeImg = URL.createObjectURL(file.raw);
                console.log(noticeDialog.form.noticeImg)
            }
            const beforeAvatarUpload = (file) => {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                root.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                root.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
                noticeDialog,
                imgDialog,

                loadData,
                openDiaog,
                submitType,
                deleteData,

                handleRemove,
                handlePictureCardPreview,
                handleDownload,

                handleAvatarSuccess,
                beforeAvatarUpload,

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