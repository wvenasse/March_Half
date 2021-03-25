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
                    <el-table-column prop="postUser" label="发表用户" width="100" align="center">
                        <template slot-scope="scope">
                            <span class="postUser">{{scope.row.postUser}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="postType" label="有关类别"  width="150" align="center"></el-table-column>
                    <el-table-column prop="postTitle" label="讨论题目" width="80" align="center"></el-table-column>
                    <el-table-column prop="postImg" label="有关图片" width="100" align="center">
                        <template slot-scope="scope">
                        <div style="display:flex;justify-content: center;">
                            <div class="postImgs" v-for="(img,index) in scope.row.postImg" :key="index">
                                <img class="postImg" :src="require('../../../../march_half_wx/pages/image/'+ img)"
                                :alt="img" v-if="index<2" @click="openImgPreDialog(scope.row.postImg)">
                                <div class="imgNum" v-if="index===1 && scope.row.postImg.length>2">+{{scope.row.postImg.length}}</div>
                            </div>
                        </div>
                        </template>
                    </el-table-column>
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
                    <el-table-column prop="postLike" label="点赞" width="50" align="center">
                        <template slot-scope="scope">
                        <span class="postChange">{{scope.row.postLike ? scope.row.postLike:0}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="postLove" label="收藏" width="50" align="center">
                        <template slot-scope="scope">
                            <span class="postChange">{{scope.row.postLove ? scope.row.postLove:0}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="postCom" label="评论" width="50" align="center">
                        <template slot-scope="scope">
                            <span class="postCom" @click="openPostCommentDialog(scope.row.postId)">{{scope.row.postCom ? scope.row.postCom:0}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="250px">
                        <template slot-scope="scope">
                            <el-popover
                            placement="top"
                            width="200"
                            trigger="hover">
                                <p v-if="scope.row.postTop === 'f'">确定将该讨论取消置顶吗？</p>
                                <p v-else>确定将该讨论设置为置顶吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button type="primary" size="mini" @click="updatePostTop(scope.row)">确定</el-button>
                                </div>
                                <el-button size="mini" v-if="scope.row.postTop === 'f'" type="success" plain slot="reference" style="margin-right: 10px;">已置顶</el-button>
                                <el-button size="mini" v-else type="info" plain slot="reference" style="margin-right: 10px;">置顶</el-button>
                            </el-popover>
                            <el-popover
                            placement="top"
                            width="200"
                            trigger="hover">
                                <p v-if="scope.row.postPop === 'true'">确定将该讨论取消热门吗？</p>
                                <p v-else>确定将该讨论设置为热门吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button type="primary" size="mini" @click="updatePostPop(scope.row)">确定</el-button>
                                </div>
                                <el-button size="mini" v-if="scope.row.postPop === 'true'" type="success" plain slot="reference" style="margin-right: 10px;">已热门</el-button>
                                <el-button size="mini" v-else type="info" plain slot="reference" style="margin-right: 10px;">热门</el-button>
                            </el-popover>
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

        <!-- 帖子 -->
        <el-dialog :title="postDialog.title" :visible.sync="postDialog.visible" :append-to-body="true" @close="closePostDialog">
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
                        <el-form-item  label="讨论类别" prop="typeId" :label-width="postDialog.formLabelWidth">
                             <el-select v-model="postDialog.form.typeId" clearable filterable  placeholder="请选择类别" @change="handleTypeChange">
                                <el-option v-for="type in optionList.typeData" :key="type.typeId" :label="type.typeName"
                                :value="type.typeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item prop="postTitle" label="讨论标题" :label-width="postDialog.formLabelWidth">
                            <el-input placeholder="请输入标题" v-model="postDialog.form.postTitle" maxlength="20" show-word-limit>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="讨论照片" prop="postImg" :label-width="postDialog.formLabelWidth">
                            <form action="" name="file" class="file">
                                上传文件
                                <input type="file" id="saveImage" name="myphoto" multiple="multiple" @change="tirggerFile($event)" accept="image/*"
                                ref="new_image" v-if="postDialog.visible">
                            </form>
                            <div class="fileName">{{imgName}}</div>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item prop="postDetail" label="讨论内容" :label-width="postDialog.formLabelWidth">
                            <el-input type="textarea" placeholder="请输入内容" v-model="postDialog.form.postDetail" maxlength="100" show-word-limit>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="是否匿名" prop="isNoName" :label-width="postDialog.formLabelWidth">
                            <div style="height: 40px; display: flex; align-items: center;">
                                <el-switch
                                style="display: block"
                                v-model="postDialog.form.isNoName"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="匿名"
                                inactive-text="实名">
                                </el-switch>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <!-- <el-form-item >
                    <tinymce-editor ref="editor" v-model="postDialog.form.postDetail" @onClick="onClick" v-if="postDialog.visible">
                    </tinymce-editor>
                </el-form-item> -->
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
                    <img class="imgPre" :src="require('../../../../march_half_wx/pages/image/'+ img)" alt="" srcset="">
                </div>
                </el-carousel-item>
            </el-carousel>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="imgPreDialog.visible = false">关 闭</el-button>
            </span>
        </el-dialog>

        <!-- 评论 -->
        <el-dialog title="评论管理" :visible.sync="postCommentDialog.visible" :append-to-body="true">
            <el-container>
                <el-header style="height:auto;text-align: right;">
                    <el-button type="primary" size="small"  @click="openCommentDiaog(0)">新增</el-button>
                </el-header>
                <el-main>
                    <el-table :data="postCommentDialog.table.tableData">
                        <el-table-column property="commentId" label="序号" width="50" align="center"></el-table-column>
                        <el-table-column property="commentUser" label="用户" width="100" align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.commentUser" placement="bottom-start">
                                    <span class="commentUser">{{scope.row.commentUser}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                            <el-table-column property="commentDetail" label="评论内容" align="center">
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" :content="scope.row.commentDetail" placement="bottom-start">
                                        <span class="commentDetail">{{scope.row.commentDetail}}</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column property="commentTime" label="评论时间" width="180" align="center"></el-table-column>
                            <el-table-column property="commentNum" label="子评论" width="80" align="center">
                                <template slot-scope="scope">
                                    <span class="commentNum"  @click="openComCommentDialog(scope.row.commentId)">{{scope.row.commentNum ? scope.row.commentNum:0}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" align="center" width="150px">
                                <template slot-scope="scope">
                                    <el-button size="small" type="text" @click="openCommentDiaog(scope.row)">修改评论</el-button>
                                    <el-button @click="deleteComment(scope.row)" size="small" type="text" class="danger" style="color: red">删除</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                </el-main>
                <el-footer style="height: 34px">
                <el-pagination small background @size-change="handleComPageSizeChange"
                    @current-change="handleComCurrentChange" :current-page="postCommentDialog.pagination.pageIndex"
                    :page-sizes="[5, 10, 20, 30, 40]" :page-size="postCommentDialog.pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="postCommentDialog.pagination.totalRecordCount">
                </el-pagination>
            </el-footer>
            </el-container>
            <div slot="footer" class="dialog-footer">
                <el-button @click="postCommentDialog.visible = false">关 闭</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="commentDialog.title" :visible.sync="commentDialog.visible" :append-to-body="true">
            <el-form :model="commentDialog.form" >
                <el-form-item>
                    <el-col :span="12">
                        <el-form-item label="用户" :label-width="commentDialog.formLabelWidth">
                            <el-select v-model="commentDialog.form.userId" clearable filterable  placeholder="请选择用户" @change="handleComUserChange">
                                <el-option v-for="user in optionList.userData" :key="user.userId" :label="user.userName"
                                :value="user.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="评论内容" :label-width="commentDialog.formLabelWidth">
                            <el-input v-model="commentDialog.form.commentDetail" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="commentDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitComment">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 子评论 -->
        <el-dialog title="子评论管理" :visible.sync="comCommentDialog.visible" :append-to-body="true">
            <el-container>
                <el-header style="height:auto;text-align: right;">
                    <el-button type="primary" size="small"  @click="openComCommentDiaog(0)">新增</el-button>
                </el-header>
                <el-main>
                    <el-table :data="comCommentDialog.table.tableData">
                        <el-table-column property="commentId" label="序号" width="50" align="center"></el-table-column>
                        <el-table-column property="commentUser" label="用户" width="100" align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.commentUser" placement="bottom-start">
                                    <span class="commentUser">{{scope.row.commentUser}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column property="toNickName" label="@" width="100" align="center"></el-table-column>
                        <el-table-column property="commentDetail" label="评论内容" align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.commentDetail" placement="bottom-start">
                                    <span class="commentDetail">{{scope.row.commentDetail}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column property="commentTime" label="评论时间" width="180" align="center"></el-table-column>
                        <el-table-column label="操作" fixed="right" align="center" width="150px">
                            <template slot-scope="scope">
                                <el-button size="small" type="text" @click="openComCommentDiaog(scope.row)">修改评论</el-button>
                                <el-button @click="deleteComment(scope.row)" size="small" type="text" class="danger" style="color: red">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
                <el-footer style="height: 34px">
                <el-pagination small background @size-change="handleComComPageSizeChange"
                    @current-change="handleComComCurrentChange" :current-page="comCommentDialog.pagination.pageIndex"
                    :page-sizes="[5, 10, 20, 30, 40]" :page-size="comCommentDialog.pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="comCommentDialog.pagination.totalRecordCount">
                </el-pagination>
            </el-footer>
            </el-container>
            <div slot="footer" class="dialog-footer">
                <el-button @click="comCommentDialog.visible = false">关 闭</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import TinymceEditor from '../../components/System/tinymce'
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
        FindAllPostByUser,
        FindAllPostByType,
        UpdatePostTop,
        UpdatePostPop,
        UpdatePostComNum
    } from "@/api/Post";
    import {
        ShowAllUser,
        UpdateUserPostNum,
        UpdateUserComNum
    } from "@/api/User";
    import {
        ShowAllType
    } from "@/api/Type";
    import {
        UpdateComment,
        AddComment,
        DelComment,
        FindAllCommentFirst,
        FindAllCommentSecond,
        ShowComment,
        UpdateCommentNum
    } from "@/api/Comment";
    import {
        addImage
    } from "@/api/System"
    export default {
        name: "post",
        components: {
            TinymceEditor
        },
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
                    postId:"",
                    postTitle:"",
                    postImg:"",
                    postDetail:"",
                    postTime:"",
                    isNoName:"",
                    postName:"",
                    postTop:"",
                    postPop:"",

                    userId:"",
                    userIcon:"",
                    postUser:"",
                    typeId:"",
                    postType:""
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
                    keyWord: form.postName
                };
                table.loading = false;
                if (form.userId === '' && form.typeId === '') {
                    FindAllPost(data)
                    .then(function (response) {
                        console.log(response.data);
                        table.loading = false;
                        table.tableData = response.data.pageInfo.list;
                        for (let i = 0; i < table.tableData.length; i++) {
                            if (table.tableData[i].postImg) {
                                table.tableData[i].postImg = table.tableData[i].postImg.split(",");
                            }
                        }
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
                        for (let i = 0; i < table.tableData.length; i++) {
                            table.tableData[i].postImg = table.tableData[i].postImg.split(",");
                        }
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
                        for (let i = 0; i < table.tableData.length; i++) {
                            table.tableData[i].postImg = table.tableData[i].postImg.split(",");
                        }
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            };
            const openDiaog = (post) => {
                if (post !== 0) {
                    postDialog.title = "修改讨论";
                    postDialog.flag = true;
                    postDialog.form = post;
                    if (post.postImg) {
                        imgName.value = post.postImg.join(',');
                    }
                    if (postDialog.form.isNoName === 'true') {
                        postDialog.form.isNoName = true;
                    }
                    else {
                        postDialog.form.isNoName = false;
                    }
                } else {
                    postDialog.title = "新增讨论";
                    postDialog.flag = false;
                    postDialog.form = {};
                    imgName.value = "未选择任何文件";
                }
                postDialog.visible = true;
            };
            const closePostDialog =  () => {
                if (postDialog.form.isNoName === true) {
                    postDialog.form.isNoName = 'true';
                }
                else {
                    postDialog.form.isNoName = 'false';
                }
            }
            const submitPost = () => {
                let yy = new Date().getFullYear();
                let m = new Date().getMonth() + 1;
                let mm = m < 10 ? '0' + m : m;
                let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
                postDialog.form.postTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
                if (imgName.value == '未选择任何文件') {
                    imgName.value = '';
                }
                if (postDialog.form.isNoName != true) {
                    postDialog.form.isNoName = false;
                }
                else if (postDialog.form.isNoName == true) {
                    postDialog.form.isNoName = true;
                }
                postDialog.form.postName = postDialog.form.postUser + ',' + postDialog.form.postType + ',' + postDialog.form.postTitle;
                let data = {
                    postTitle: postDialog.form.postTitle,
                    postImg: imgName.value,
                    postDetail: postDialog.form.postDetail,
                    postTime: postDialog.form.postTime,
                    isNoName: postDialog.form.isNoName,
                    postName: postDialog.form.postName,
                    postTop: 't',
                    postPop: 'false',
                    userId: postDialog.form.userId,
                    userIcon: postDialog.form.userIcon,
                    postUser: postDialog.form.postUser,
                    typeId: postDialog.form.typeId,
                    postType: postDialog.form.postType,
                };
                if (postDialog.flag) {
                    data['postId'] = postDialog.form.postId;
                    UpdatePost(data)
                        .then(function (response) {
                            console.log(response);
                            root.$message({
                                type: "success",
                                message: response.data.msg,
                            });
                            loadData();
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
                            updatePostNum(data);
                            loadData();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                postDialog.visible = false;
            };
            const deleteData = (post) => {
                let data = {
                    postId: post.postId,
                };
                root
                    .$confirm("此操作将永久删除该讨论, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        DelPost(data)
                            .then(function (response) {
                                console.log(response);
                                updatePostNum(post);
                                loadData();
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

            //置顶、热门
            let postPopover = reactive({
                topVisible:false,
                popVisible:false
            })
            const updatePostTop = (post) => {
                let top = 'f';
                if (post.postTop === 't') {
                    top = 'f';
                }
                else if (post.postTop === 'f') {
                    top = 't';
                }
                let data = {
                    postTop: top,
                    postId: post.postId
                }
                UpdatePostTop(data)
                    .then(function (response) {
                        console.log(response);
                        loadData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const updatePostPop = (post) => {
                let pop = 'false';
                if (post.postPop == 'true') {
                    pop = 'false';
                }
                else if (post.postPop == 'false') {
                    pop = 'true';
                }
                console.log(pop)
                let data = {
                    postPop: pop,
                    postId: post.postId
                }
                UpdatePostPop(data)
                    .then(function (response) {
                        console.log(response);
                        loadData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            
            //更新帖子
            const updatePostNum = (post) => {
                let data = {
                    userId: post.userId
                };
                UpdateUserPostNum(data)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            
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
                        postDialog.form.userIcon = optionList.userData[i].userIcon;
                        postDialog.form.postUser = optionList.userData[i].nickName;
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

            //评论
            const openPostCommentDialog = (postId) => {
                // postCommentDialog.visible = true;
                postCommentDialog.postId = postId;
                loadCommentData(postId);
            }
            let postCommentDialog = reactive({
                visible: false,
                postId:'',
                table: {
                    loading: false,
                    tableData: []
                },
                pagination: {
                    pageIndex: 1,
                    totalRecordCount: 0,
                    pageSize: 5,
                }
            });
            const loadCommentData = (postId) => {
                postCommentDialog.table.loading = true;
                let data = {
                    pageIndex: postCommentDialog.pagination.pageIndex,
                    pageSize: postCommentDialog.pagination.pageSize,
                    postId: postId
                };
                postCommentDialog.table.loading = false;
                FindAllCommentFirst(data)
                    .then(function (response) {
                        console.log(response.data);
                        postCommentDialog.table.loading = false;
                        postCommentDialog.table.tableData = response.data.pageInfo.list;
                        postCommentDialog.pagination.totalRecordCount = response.data.pageInfo.total;
                        postCommentDialog.visible = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            //子评论
            const openComCommentDialog = (toCommentId) => {
                // comCommentDialog.visible = true;
                comCommentDialog.toCommentId = toCommentId;
                loadComCommentData(toCommentId);
                loadComComment(toCommentId);
            }
            let comCommentDialog = reactive({
                visible: false,
                toCommentId:'',
                toUserId:'',
                toNickName:'',
                table: {
                    loading: false,
                    tableData: []
                },
                pagination: {
                    pageIndex: 1,
                    totalRecordCount: 0,
                    pageSize: 5,
                }
            });
            const loadComCommentData = (toCommentId) => {
                comCommentDialog.table.loading = true;
                let data = {
                    pageIndex: comCommentDialog.pagination.pageIndex,
                    pageSize: comCommentDialog.pagination.pageSize,
                    postId: postCommentDialog.postId,
                    toCommentId: toCommentId
                };
                comCommentDialog.table.loading = false;
                FindAllCommentSecond(data)
                    .then(function (response) {
                        console.log(response.data);
                        comCommentDialog.table.loading = false;
                        comCommentDialog.table.tableData = response.data.pageInfo.list;
                        comCommentDialog.pagination.totalRecordCount = response.data.pageInfo.total;
                        comCommentDialog.visible = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };
            const loadComComment = (toCommentId) => {
                let data =  {
                    commentId: toCommentId
                }
                ShowComment(data)
                    .then(function (response) {
                        console.log(response.data);
                        comCommentDialog.toUserId = response.data.userId;
                        comCommentDialog.toNickName = response.data.commentUser;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            //总评论
            let commentDialog = reactive({
                visible: false,
                title:"",
                flag:false,
                type:'first',
                form: {
                    commentId:'',
                    postId:'',
                    userId:'',
                    userIcon:'',
                    commentUser:'',

                    commentDetail:'',
                    commentTime:'',

                    commentType:'',
                    toUserId:'',
                    toNickName:'',
                    toCommentId:''
                },
                formLabelWidth: "120px",
            });
            const openCommentDiaog = (comment) => {
                if (comment !== 0) {
                    commentDialog.title = "修改评论";
                    commentDialog.flag = true;
                    commentDialog.form = comment;
                } else {
                    commentDialog.title = "新增评论";
                    commentDialog.flag = false;
                    commentDialog.form = {};
                }
                commentDialog.type = 'first';
                commentDialog.visible = true;
            };
            const openComCommentDiaog = (comment) => {
                if (comment !== 0) {
                    commentDialog.title = "修改评论";
                    commentDialog.flag = true;
                    commentDialog.form = comment;
                } else {
                    commentDialog.title = "新增评论";
                    commentDialog.flag = false;
                    commentDialog.form = {};
                }
                commentDialog.type = 'second';
                commentDialog.visible = true;
            };
            const submitComment  = () => {
                let yy = new Date().getFullYear();
                let m = new Date().getMonth() + 1;
                let mm = m < 10 ? '0' + m : m;
                let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
		        commentDialog.form.commentTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
                let data = {
                    postId: postCommentDialog.postId,
                    userId: commentDialog.form.userId,
                    userIcon: commentDialog.form.userIcon,
                    commentUser: commentDialog.form.commentUser,
                    commentDetail: commentDialog.form.commentDetail,
                    commentTime: commentDialog.form.commentTime,
                    commentType: commentDialog.type,
                    toUserId: comCommentDialog.toUserId,
                    toNickName: comCommentDialog.toNickName,
                    toCommentId: comCommentDialog.toCommentId,
                };
                console.log(data);
                if (commentDialog.flag) {
                    data['commentId'] = commentDialog.form.commentId,
                    UpdateComment(data)
                        .then(function (response) {
                            console.log(response);
                            root.$message({
                                type: "success",
                                message: response.data.msg,
                            });
                            loadCommentData(postCommentDialog.postId);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    AddComment(data)
                        .then(function (response) {
                            console.log(response);
                            updateCommentFirst(data);
                            updateCommentSecond(data);
                            root.$message({
                                type: "success",
                                message: response.data.msg,
                            })
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                commentDialog.visible = false;
            };
            const deleteComment = (comment) => {
                let data = {
                    commentId: comment.commentId,
                };
                root
                .$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    DelComment(data)
                    .then(function (response) {
                        console.log(response);
                        loadCommentData(postCommentDialog.postId);
                        updateCommentFirst(comment);
                        updateCommentSecond(comment);
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
            const handleComUserChange = (val) => {
                for (let i = 0; i < optionList.userData.length; i++) {
                    if (optionList.userData[i].userId === val) {
                        commentDialog.form.commentUser = optionList.userData[i].nickName;
                        commentDialog.form.userIcon = optionList.userData[i].userIcon;
                    }
                }
            }
            //更新评论
            const updateCommentFirst = (comment) => {
                let postData = {
                    postId: comment.postId
                };
                UpdatePostComNum(postData)
                    .then(function (response) {
                        console.log(response.data);
                        loadCommentData(postCommentDialog.postId);
                        loadData()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                let userData = {
                    userId: comment.userId
                };
                UpdateUserComNum(userData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const updateCommentSecond = (comment) => {
                let commentData = {
                    commentId: comment.toCommentId
                };
                UpdateCommentNum(commentData)
                    .then(function (response) {
                        console.log(response.data);
                        loadComCommentData(comCommentDialog.toCommentId);
                        loadCommentData(postCommentDialog.postId);
                        updateCommentFirst(comment);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                let userData = {
                    userId: comment.userId
                };
                UpdateUserComNum(userData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            

            //页数
            let pagination = reactive({
                pageIndex: 1,
                totalRecordCount: 0,
                pageSize: 10,
            });
            const handleCurrentChange = (val) => {
                pagination.pageIndex = val;
                loadData();
            };
            const handlePageSizeChange = (val) => {
                pagination.pageSize = val;
                loadData();
            };
            const handleComCurrentChange = (val) => {
                commentDialog.pagination.pageIndex = val;
                loadCommentData(commentDialog.postId);
            };
            const handleComPageSizeChange = (val) => {
                commentDialog.pagination.pageSize = val;
                loadCommentData(commentDialog.postId);
            };
            const handleComComCurrentChange = (val) => {
                comCommentDialog.pagination.pageIndex = val;
                loadComCommentData(comCommentDialog.toCommentId);
            };
            const handleComComPageSizeChange = (val) => {
                comCommentDialog.pagination.pageSize = val;
                loadComCommentData(comCommentDialog.toCommentId);
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
                closePostDialog,
                submitPost,
                deleteData,

                //置顶、热门
                postPopover,
                updatePostTop,
                updatePostPop,

                //更新帖子数量
                updatePostNum,

                //用户、类别
                optionList,
                loadUser,
                handleUserChange,
                loadType,
                handleTypeChange,

                //评论
                openPostCommentDialog,
                postCommentDialog,
                loadCommentData,
                //子评论
                openComCommentDialog,
                comCommentDialog,
                loadComCommentData,
                loadComComment,
                //总评论
                commentDialog,
                openCommentDiaog,
                openComCommentDiaog,
                submitComment,
                deleteComment,

                //更新评论
                handleComUserChange,
                updateCommentFirst,
                updateCommentSecond,

                //页码
                handleCurrentChange,
                handlePageSizeChange,
                handleComCurrentChange,
                handleComPageSizeChange,
                handleComComCurrentChange,
                handleComComPageSizeChange,

                //图片
                formData,
                imgName,
                imgUrl,
                tirggerFile,

                //预览
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
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

    .postImgs {
        height: 40px;
    }

    .postImg {
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

    .postUser {
        font-weight: bold;
    }

    .postDetail,
    .commentDetail,
    .commentUser {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .postChange  {
        font-style: oblique;
    }

    .postCom,
    .commentNum {
        cursor: pointer;
        color: #409EFF;
    }
</style>