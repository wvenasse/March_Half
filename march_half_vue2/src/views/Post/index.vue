<template>
    <div id="post">
        <el-container style="height: 100%">
            <el-header style="height: auto">
                <el-row class="toolbar" style="height: auto;">
                    <el-col :span="20">
                        <el-form :inline="true" size="small">
                            <el-form-item style="width:120px;">
                                <el-select size="small" v-model="form.userId" placeholder="选择用户" clearable filterable @change="loadData">
                                    <el-option v-for="user in optionList.userData" :key="user.userId"
                                        :label="user.userName" :value="user.userId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="width:120px;">
                                <el-select size="small" v-model="form.typeId" placeholder="选择类别" clearable filterable @change="loadData">
                                    <el-option v-for="type in optionList.typeData" :key="type.typeId"
                                        :label="type.typeName" :value="type.typeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="4" style="text-align: right">
                        <el-button type="primary" size="small" @click="openDiaog(0)">新增</el-button>
                        <el-button title="刷新表格" icon="el-icon-refresh" size="small" circle @click="loadData">
                        </el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="height: 100%">
                <el-table v-loading="table.loading" size="small" :data="table.tableData" stripe highlight-current-row
                    style="margin: 0px 0px" key="1" height="100%" width="100%">
                    <el-table-column prop="postId" label="序号" width="50"></el-table-column>
                    <el-table-column prop="userName" label="发表用户" width="100" align="center"></el-table-column>
                    <el-table-column prop="postType" label="有关类别"  width="150" align="center"></el-table-column>
                    <el-table-column prop="postTitle" label="讨论题目" width="80" align="center"></el-table-column>
                    <el-table-column prop="postDetail" label="讨论内容" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.postDetail" placement="bottom-start">
                                <span class="postDetail">{{scope.row.postDetail}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="postTime" label="讨论时间" width="150" align="center"></el-table-column>
                    <el-table-column prop="isNoName" label="是否匿名" width="100"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isNoName === 'false'" class="isNoName">否</span>
                            <span v-else-if="scope.row.isNoName === 'true'" class="isNoName">是</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="150px">
                        <template slot-scope="scope">
                            <el-button size="small" type="text" @click="openDiaog(scope.row)">修改信息</el-button>
                            <el-button @click="deleteData(scope.row)" size="small" type="text" class="danger"
                                style="color: red">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer style="height: 34px">
                <el-pagination small background @size-change="handlePageSizeChange"
                    @current-change="handleCurrentChange" :current-page="pagination.pageIndex"
                    :page-sizes="[5, 10, 20, 30, 40]" :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalRecordCount">
                </el-pagination>
            </el-footer>
        </el-container>
        <el-dialog :title="postDialog.title" :visible.sync="postDialog.visible" :append-to-body="true">
            <el-form :model="postDialog.form">
                <el-form-item>
                    <el-col :span="12">
                        <el-form-item label="用户" prop="orderUser" :label-width="postDialog.formLabelWidth">
                             <el-select v-if="postDialog.flag" disabled  v-model="postDialog.form.userId" clearable placeholder="请选择用户" @change="handleUserChange">
                                <el-option v-for="user in optionList.userData" :key="user.userId" :label="user.userName"
                                :value="user.userId">
                                </el-option>
                            </el-select>
                            <el-select v-else v-model="postDialog.form.userId" clearable filterable  placeholder="请选择用户" @change="handleUserChange">
                                <el-option v-for="user in optionList.userData" :key="user.userId" :label="user.userName"
                                :value="user.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="服务订单" prop="orderId" :label-width="postDialog.formLabelWidth">
                            
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item  label="服务结果" prop="PostStatus" :label-width="postDialog.formLabelWidth">
                             
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="服务星级" prop="PostStar" :label-width="postDialog.formLabelWidth">
                            
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item  label="服务照片" prop="PostImg" :label-width="postDialog.formLabelWidth">
                            <form action="" name="file" class="file">
                                上传文件
                                <input type="file" id="saveImage" name="myphoto" multiple="multiple" @change="tirggerFile($event)" accept="image/*"
                                ref="new_image" v-if="postDialog.visible">
                            </form>
                            <div class="fileName">{{imgName}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="PostDetail" label="服务评价" :label-width="postDialog.formLabelWidth">
                            <el-input type="textarea" placeholder="请输入评价" v-model="postDialog.form.PostDetail" maxlength="50" show-word-limit>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item  label="" prop="isNoName" :label-width="postDialog.formLabelWidth">
                            <el-switch
                            style="display: block"
                            v-model="postDialog.form.isNoName"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="匿名"
                            inactive-text="实名">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="postDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitPost">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="预览" :visible.sync="imgPreDialog.visible" width="30%" center>
            <el-carousel >
                <el-carousel-item v-for="(img,index) in imgPreDialog.imgList" :key="index">
                <div class="imgsPre">
                    <img class="imgPre" :src="require('../../assets/imgs/Upload/'+ img)" alt="" srcset="">
                </div>
                </el-carousel-item>
            </el-carousel>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="imgPreDialog.visible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        onMounted,
        reactive,
        ref
    } from "@vue/composition-api";
    import {
        UpdatePost,
        AddPost,
        DelPost,
        FindAllPost,
        FindAllPostByUser
    } from "@/api/Post";
    import {
        ShowAllUser
    } from "@/api/User";
    import {
        ShowAllType
    } from "@/api/Type";
    import {
        addImage
    } from "@/api/System"
    export default {
        name: "post",
        setup(props, {
            refs,
            root
        }) {
            let form = reactive({
                userId:"",
                typeId: "",
                postTitle:""
            });
            let postDialog = reactive({
                visible: false,
                title: "",
                flag: false,
                form: {
                    PostId:"",
                    PostStatus:"",
                    PostStar:"",
                    PostImg:"",
                    PostDetail:"",
                    PostTime:"",
                    isNoName:"",

                    userId:"",
                    PostUser:"",

                    PostModel:"",

                    serviceId:"",
                    PostService:"",
                    institutionId:"",
                    PostInstitution:"",
                    typeId:"",
                    PostType:"",
                    orderId:""
                },
                formLabelWidth: "120px",
            });
            let table = reactive({
                loading: false,
                tableData: [],
            });
            const loadData = () => {
                table.loading = true;
                let data = {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                    postName: form.postName
                };
                table.loading = false;
                if (form.userId === '' && form.typeId === '') {
                    FindAllPost(data)
                    .then(function (response) {
                        console.log(response.data);
                        table.loading = false;
                        table.tableData = response.data.pageInfo.list;
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else if (form.userId !== '' && form.typeId === ''){
                    data['userId'] = form.userId;
                    FindAllPostByUser(data)
                    .then(function (response) {
                        console.log(response.data);
                        table.loading = false;
                        table.tableData = response.data.pageInfo.list;
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else if (form.typeId !== '' && form.userId === ''){
                    data['typeId'] = form.typeId;
                    FindAllPostByType(data)
                    .then(function (response) {
                        console.log(response.data);
                        table.loading = false;
                        table.tableData = response.data.pageInfo.list;
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            };
            const openDiaog = (Post) => {
                console.log(Post)
                if (Post !== 0) {
                    postDialog.title = "修改评价";
                    postDialog.flag = true;
                    postDialog.form = Post;
                    imgName.value = Post.PostImg.join(',');
                    if (postDialog.form.isNoName === 'true') {
                        postDialog.form.isNoName = true;
                    }
                    else {
                        postDialog.form.isNoName = false;
                    }
                    loadEvaOrder(Post.userId);
                } else {
                    postDialog.title = "新增评价";
                    postDialog.flag = false;
                    postDialog.form = {};
                    imgName.value = "未选择任何文件";
                }
                postDialog.visible = true;
            };
            const submitPost = () => {
                if (postDialog.form.serviceArea) {
                    postDialog.form.serviceArea = postDialog.form.serviceArea[0] + '/' + postDialog.form.serviceArea[1] + '/' + postDialog.form.serviceArea[2];
                }
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth()<10 ? '0'+new Date().getMonth() : new Date().getMonth();
                let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
                postDialog.form.PostTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
                if (imgName.value == '未选择任何文件') {
                    imgName.value = '';
                }
                if (postDialog.form.isNoName != true) {
                    postDialog.form.isNoName = false;
                }
                else if (postDialog.form.isNoName == true) {
                    postDialog.form.isNoName = true;
                }
                let data = {
                    PostStatus: postDialog.form.PostStatus,
                    PostStar: postDialog.form.PostStar,
                    PostImg: imgName.value,
                    PostDetail: postDialog.form.PostDetail,
                    PostTime: postDialog.form.PostTime,
                    isNoName: postDialog.form.isNoName,
                    userId: postDialog.form.userId,
                    PostUser: postDialog.form.PostUser,
                    serviceId: postDialog.form.serviceId,
                    PostService: postDialog.form.PostService,
                    institutionId: postDialog.form.institutionId,
                    PostInstitution: postDialog.form.PostInstitution,
                    typeId: postDialog.form.typeId,
                    PostType: postDialog.form.PostType,
                    orderId: postDialog.form.orderId
                };
                if (postDialog.flag) {
                    data['PostId'] = postDialog.form.PostId;
                    UpdatePost(data)
                        .then(function (response) {
                            console.log(response);
                            root.$message({
                                type: "success",
                                message: response.data.msg,
                            });
                            loadData();
                            updateEvaStsr(data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    AddPost(data)
                        .then(function (response) {
                            console.log(response);
                            root.$message({
                                type: "success",
                                message: response.data.msg,
                            });
                            loadData();
                            updateOrderStatus(data.orderId,'4');
                            updateEvaStsr(data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                postDialog.visible = false;
            };
            const deleteData = (Post) => {
                let data = {
                    PostId: Post.PostId,
                };
                root
                    .$confirm("此操作将永久删除该评价, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        DelPost(data)
                            .then(function (response) {
                                console.log(response);
                                loadData();
                                updateOrderStatus(Post.orderId,'3');
                                updateEvaStsr(Post);
                                root.$message({
                                    type: "success",
                                    message: response.data.msg,
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    })
                    .catch(() => {
                        root.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            };

            
            //用户、订单
            let optionList = reactive({
                userData: [],
                typeData: []
            });
            const loadUser = () => {
                ShowAllUser().then(function (response) {
                        console.log(response);
                        optionList.userData = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const handleUserChange = (val) => {
                for (let i = 0; i < optionList.userData.length; i++) {
                    if (optionList.userData[i].userId === val) {
                        postDialog.form.userName = optionList.userData[i].userName;
                        postDialog.form.PostUser = optionList.userData[i].nickName;
                    }
                }
            }
            const loadType = () => {
                ShowAllType().then(function (response) {
                        console.log(response);
                        optionList.typeData = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const handleTypeChange = (val) => {
                for (let i = 0; i < optionList.typeData.length; i++) {
                    if (optionList.typeData[i].typeId === val) {
                        postDialog.form.postType = optionList.typeData[i].typeName;
                    }
                }
            }

            //页数
            let pagination = reactive({
                pageIndex: 1,
                totalRecordCount: 0,
                pageSize: 5,
            });
            const handleCurrentChange = (val) => {
                pagination.pageIndex = val;
                loadData();
            };
            const handlePageSizeChange = (val) => {
                pagination.pageSize = val;
                loadData();
            };

            //图片
            let formData = new FormData();
            let imgName = ref("未选择任何文件");
            let imgUrl = ref("http://localhost:8088/image/");
            const tirggerFile = (event) => {
                console.log(event)
                if (event.target.files.length !== 0) {
                    let imgs = [];
                    let formImgData = [];
                    for (let i=0;i<event.target.files.length;i++) {
                        formImgData[i] = new FormData();
                        formImgData[i].append('image_data', event.target.files[i]);
                        imgs[i] = event.target.files[i].name;
                        addImage(formImgData[i]).then(response => {
                            console.log(response.data.fileName);
                            root.$message({
                                type: 'info',
                                message: response.data.msg
                            });
                        })
                    }
                    imgName.value = imgs.join(',');
                    console.log(formImgData);
                    console.log(imgName.value);
                }
            }

            //预览图片
            let openImgPreDialog = (imgList) => {
                imgPreDialog.visible = true;
                imgPreDialog.imgList = imgList;
            }
            let imgPreDialog = reactive({
                visible: false,
                imgList: [],
            })

            onMounted(() => {
                loadData();
                loadUser();
                loadType();
            });

            return {
                form,
                table,
                pagination,
                postDialog,

                loadData,
                openDiaog,
                submitPost,
                deleteData,

                optionList,
                loadUser,
                handleUserChange,
                loadType,
                handleTypeChange,

                handleCurrentChange,
                handlePageSizeChange,

                formData,
                imgName,
                imgUrl,
                tirggerFile,

                openImgPreDialog,
                imgPreDialog
            };
        },
    };
</script>

<style scoped>
    #post {
        background-color: #fff;
        height: 100%;
    }

    .toolbar {
        background-color: #ffffff;
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

    .fileName {
        font-weight: bold;
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

    .PostImgs {
        height: 40px;
    }

    .PostImg {
        height: 40px;
        width: 40px;
        max-height: 100%;
        max-width: 100%;
    }

    .imgsPre {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .imgPre {
        max-height: 100%;
    }

    .imgNum {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.3);
        position: relative;
        top: -47px;
        color: #C0C4CC;
        cursor: pointer;
        font-weight: bold;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .PostUser {
        font-weight: bold;
    }

    .PostUser,
    .PostDetail,
    .PostObject {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>