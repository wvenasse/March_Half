<template>
    <div id="evaluation">
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
                    <el-table-column prop="evaluationId" label="序号" width="50"></el-table-column>
                    <el-table-column prop="evaluationUser" label="用户姓名" width="100" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.evaluationUser" placement="bottom-start">
                                <span class="evaluationUser">{{scope.row.evaluationUser}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="evaluationType" label="评价类别" width="100" align="center"></el-table-column>
                    <el-table-column prop="evaluationObject" label="评价对象"  width="150" align="center">
                        <template slot-scope="scope">
                            <el-tooltip v-if="scope.row.evaluationService" class="item" effect="dark" :content="scope.row.evaluationService" placement="bottom-start">
                                <span class="evaluationObject">{{scope.row.evaluationService}}</span>
                            </el-tooltip>
                            <el-tooltip v-else-if="scope.row.evaluationInstitution" class="item" effect="dark" :content="scope.row.evaluationInstitution" placement="bottom-start">
                                <span class="evaluationObject">{{scope.row.evaluationInstitution}}</span>
                            </el-tooltip>
                            <el-tooltip v-else-if="scope.row.evaluationOrder" class="item" effect="dark" :content="scope.row.evaluationOrder" placement="bottom-start">
                                <span class="evaluationObject">{{scope.row.evaluationOrder}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="evaluationStatus" label="评价结果" width="80" align="center"></el-table-column>
                    <el-table-column prop="evaluationStar" label="评价星级" width="150" align="center">
                        <template slot-scope="scope">
                            <el-rate v-model="scope.row.evaluationStar" disabled text-color="#ff9900" void-icon-class="icon-rate-face-off"></el-rate>
                        </template>
                    </el-table-column>
                    <el-table-column prop="evaluationImg" label="评价图片" width="150" align="center">
                        <template slot-scope="scope">
                            <div style="display:flex;justify-content: center;">
                                <div class="evaluationImgs" v-for="(img,index) in scope.row.evaluationImg" :key="index">
                                <img class="evaluationImg" :src="require('../../../../march_half_wx/pages/image/'+ img)"
                                :alt="img" v-if="index<2" @click="openImgPreDialog(scope.row.evaluationImg)">
                                <div class="imgNum" v-if="index===1 && scope.row.evaluationImg.length>2">+{{scope.row.evaluationImg.length}}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="evaluationDetail" label="评价内容" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.evaluationDetail" placement="bottom-start">
                                <span class="evaluationDetail">{{scope.row.evaluationDetail}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="evaluationTime" label="评价时间" width="150" align="center"></el-table-column>
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
        <el-dialog :title="evaluationDialog.title" :visible.sync="evaluationDialog.visible" :append-to-body="true" @close="closeEvaluationDialog">
            <el-form :model="evaluationDialog.form">
                <el-form-item>
                    <el-col :span="12">
                        <el-form-item label="用户" prop="orderUser" :label-width="evaluationDialog.formLabelWidth">
                             <el-select v-if="evaluationDialog.flag" disabled  v-model="evaluationDialog.form.userId" clearable placeholder="请选择用户" @change="handleUserChange">
                                <el-option v-for="user in optionList.userData" :key="user.userId" :label="user.userName"
                                :value="user.userId">
                                </el-option>
                            </el-select>
                            <el-select v-else v-model="evaluationDialog.form.userId" clearable filterable  placeholder="请选择用户" @change="handleUserChange">
                                <el-option v-for="user in optionList.userData" :key="user.userId" :label="user.userName"
                                :value="user.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="服务订单" prop="orderId" :label-width="evaluationDialog.formLabelWidth">
                             <el-select v-if="evaluationDialog.flag" disabled v-model="evaluationDialog.form.orderId" clearable placeholder="请选择订单" @change="handleOrderChange">
                                <el-option v-for="order in optionList.orderData" :key="order.orderId" :label="order.orderName"
                                :value="order.orderId">
                                </el-option>
                            </el-select>
                            <el-select v-else v-model="evaluationDialog.form.orderId" clearable placeholder="请选择订单" @change="handleOrderChange">
                                <el-option v-for="order in optionList.orderData" :key="order.orderId" :label="order.orderName"
                                :value="order.orderId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item  label="服务结果" prop="evaluationStatus" :label-width="evaluationDialog.formLabelWidth">
                             <el-select v-model="evaluationDialog.form.evaluationStatus" clearable placeholder="请选择订单">
                                <el-option key="好评" label="好评" value="好评"></el-option>
                                <el-option key="中评" label="中评" value="中评"></el-option>
                                <el-option key="差评" label="差评" value="差评"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="服务星级" prop="evaluationStar" :label-width="evaluationDialog.formLabelWidth">
                            <div style="height: 40px;display: flex;align-items: center;">
                                <el-rate
                                v-model="evaluationDialog.form.evaluationStar"
                                show-text>
                                </el-rate>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item  label="服务照片" prop="evaluationImg" :label-width="evaluationDialog.formLabelWidth">
                            <form action="" name="file" class="file">
                                上传文件
                                <input type="file" id="saveImage" name="myphoto" multiple="multiple" @change="tirggerFile($event)" accept="image/*"
                                ref="new_image" v-if="evaluationDialog.visible">
                            </form>
                            <div class="fileName">{{imgName}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="evaluationDetail" label="服务评价" :label-width="evaluationDialog.formLabelWidth">
                            <el-input type="textarea" placeholder="请输入评价" v-model="evaluationDialog.form.evaluationDetail" maxlength="200" show-word-limit>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item  label="" prop="isNoName" :label-width="evaluationDialog.formLabelWidth">
                            <el-switch
                            style="display: block"
                            v-model="evaluationDialog.form.isNoName"
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
                <el-button @click="evaluationDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitEvaluation">确 定</el-button>
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
    </div>
</template>

<script>
    import {
        onMounted,
        reactive,
        ref
    } from "@vue/composition-api";
    import {
        UpdateEvaluation,
        AddEvaluation,
        DelEvaluation,
        FindAllEvaluation,
        FindAllEvaluationByUser
    } from "@/api/Evaluation";
    import {
        ShowAllUser,
        UpdateUserEvaNum
    } from "@/api/User";;
    import {
        ShowAllOrderByStatus,
        ShowOrder,
        UpdateOrderStatus
    } from "@/api/Order";
    import {
        UpdateServiceEvaNum,
        UpdateServiceStar
    } from "@/api/Service";
    import {
        UpdateInstitutionEvaNum,
        UpdateInstitutionStar
    } from "@/api/Institution";
    import {
        addImage
    } from "@/api/System"
    export default {
        name: "evaluation",
        setup(props, {
            refs,
            root
        }) {
            let form = reactive({
                type:'',
                data:'',
                userId:"",
                evaluationModel: "",
            });
            let evaluationDialog = reactive({
                visible: false,
                title: "",
                flag: false,
                form: {
                    evaluationId:"",
                    evaluationStatus:"",
                    evaluationStar:"",
                    evaluationImg:"",
                    evaluationDetail:"",
                    evaluationTime:"",
                    isNoName:"",

                    userId:"",
                    userIcon:"",
                    evaluationUser:"",

                    evaluationModel:"",

                    serviceId:"",
                    evaluationService:"",
                    institutionId:"",
                    evaluationInstitution:"",
                    typeId:"",
                    evaluationType:"",
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
                    pageSize: pagination.pageSize
                };
                table.loading = false;
                if (form.userId === '') {
                    FindAllEvaluation(data)
                    .then(function (response) {
                        console.log(response.data);
                        table.loading = false;
                        table.tableData = response.data.pageInfo.list;
                        for (let i = 0; i < table.tableData.length; i++) {
                            if (table.tableData[i].evaluationImg) {
                                table.tableData[i].evaluationImg = table.tableData[i].evaluationImg.split(",");
                            }
                        }
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else {
                    data['userId'] = form.userId;
                    FindAllEvaluationByUser(data)
                    .then(function (response) {
                        console.log(response.data);
                        table.loading = false;
                        table.tableData = response.data.pageInfo.list;
                        for (let i = 0; i < table.tableData.length; i++) {
                            table.tableData[i].evaluationImg = table.tableData[i].evaluationImg.split(",");
                        }
                        pagination.totalRecordCount = response.data.pageInfo.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            };
            const openDiaog = (evaluation) => {
                console.log(evaluation)
                if (evaluation !== 0) {
                    evaluationDialog.title = "修改评价";
                    evaluationDialog.flag = true;
                    evaluationDialog.form = evaluation;
                    if (evaluation.evaluationImg) {
                        imgName.value = evaluation.evaluationImg.join(',');
                    }
                    if (evaluationDialog.form.isNoName === 'true') {
                        evaluationDialog.form.isNoName = true;
                    }
                    else {
                        evaluationDialog.form.isNoName = false;
                    }
                    loadEvaOrder(evaluation.userId);
                } else {
                    evaluationDialog.title = "新增评价";
                    evaluationDialog.flag = false;
                    evaluationDialog.form = {};
                    imgName.value = "未选择任何文件";
                }
                evaluationDialog.visible = true;
            };
            const closeEvaluationDialog =  () => {
                if (evaluationDialog.form.isNoName === true) {
                    evaluationDialog.form.isNoName = 'true';
                }
                else {
                    evaluationDialog.form.isNoName = 'false';
                }
            }
            const submitEvaluation = () => {
                if (evaluationDialog.form.serviceArea) {
                    evaluationDialog.form.serviceArea = evaluationDialog.form.serviceArea[0] + '/' + evaluationDialog.form.serviceArea[1] + '/' + evaluationDialog.form.serviceArea[2];
                }
                let yy = new Date().getFullYear();
                let m = new Date().getMonth() + 1;
                let mm = m < 10 ? '0' + m : m;
                let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
                evaluationDialog.form.evaluationTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
                if (imgName.value == '未选择任何文件') {
                    imgName.value = '';
                }
                if (evaluationDialog.form.isNoName != true) {
                    evaluationDialog.form.isNoName = false;
                }
                else if (evaluationDialog.form.isNoName == true) {
                    evaluationDialog.form.isNoName = true;
                }
                let data = {
                    evaluationStatus: evaluationDialog.form.evaluationStatus,
                    evaluationStar: evaluationDialog.form.evaluationStar,
                    evaluationImg: imgName.value,
                    evaluationDetail: evaluationDialog.form.evaluationDetail,
                    evaluationTime: evaluationDialog.form.evaluationTime,
                    isNoName: evaluationDialog.form.isNoName,
                    userId: evaluationDialog.form.userId,
                    userIcon: evaluationDialog.form.userIcon,
                    evaluationUser: evaluationDialog.form.evaluationUser,
                    serviceId: evaluationDialog.form.serviceId,
                    evaluationService: evaluationDialog.form.evaluationService,
                    institutionId: evaluationDialog.form.institutionId,
                    evaluationInstitution: evaluationDialog.form.evaluationInstitution,
                    typeId: evaluationDialog.form.typeId,
                    evaluationType: evaluationDialog.form.evaluationType,
                    orderId: evaluationDialog.form.orderId
                };
                if (evaluationDialog.flag) {
                    data['evaluationId'] = evaluationDialog.form.evaluationId;
                    UpdateEvaluation(data)
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
                    AddEvaluation(data)
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
                evaluationDialog.visible = false;
            };
            const deleteData = (evaluation) => {
                let data = {
                    evaluationId: evaluation.evaluationId,
                };
                root
                    .$confirm("此操作将永久删除该评价, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        DelEvaluation(data)
                            .then(function (response) {
                                console.log(response);
                                loadData();
                                updateOrderStatus(evaluation.orderId,'3');
                                updateEvaStsr(evaluation);
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

            //更新订单评价状态
            const updateOrderStatus = (orderId,status) => {
                console.log(orderId,status);
                let data = {
                    orderId: orderId,
                    orderStatus: status
                };
                UpdateOrderStatus(data)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const updateEvaStsr = (evaluation) => {
                let userData = {
                    userId : evaluation.userId
                }
                UpdateUserEvaNum(userData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                let serviceData = {
                    serviceId : evaluation.serviceId
                }
                UpdateServiceEvaNum(serviceData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                UpdateServiceStar(serviceData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                let institutionData = {
                    institutionId : evaluation.institutionId
                }
                UpdateInstitutionEvaNum(institutionData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                UpdateInstitutionStar(institutionData)
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
                orderData: []
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
                loadOrder(val);
                for (let i = 0; i < optionList.userData.length; i++) {
                    if (optionList.userData[i].userId === val) {
                        evaluationDialog.form.userIcon = optionList.userData[i].userIcon;
                        evaluationDialog.form.evaluationUser = optionList.userData[i].userName;
                    }
                }
            }
            const loadOrder = (userId) => {
                let data ={
                    orderStatus: '3'
                }
                ShowAllOrderByStatus(data).then(function (response) {
                        console.log(response);
                        optionList.orderData = response.data;
                        if (userId) {
                            optionList.orderData = optionList.orderData.filter(order => {
                                return order.userId === userId
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const loadEvaOrder = (userId) => {
                let data ={
                    orderStatus: '4'
                }
                ShowAllOrderByStatus(data).then(function (response) {
                        console.log(response);
                        optionList.orderData = response.data;
                        if (userId) {
                            optionList.orderData = optionList.orderData.filter(order => {
                                return order.userId === userId
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const handleOrderChange = (val) => {
                let data = {
                    orderId : val
                }
                ShowOrder(data).then(function (response) {
                    console.log(response);
                    let orderData = response.data;
                    evaluationDialog.form.typeId = orderData.typeId;
                    evaluationDialog.form.evaluationType = orderData.orderType;
                    evaluationDialog.form.serviceId = orderData.serviceId;
                    evaluationDialog.form.evaluationService = orderData.orderService;
                    evaluationDialog.form.institutionId = orderData.institutionId;
                    evaluationDialog.form.evaluationInstitution = orderData.orderInstitution;
                })
                .catch(function (error) {
                    console.log(error);
                });
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
            });

            return {
                form,
                table,
                pagination,
                evaluationDialog,

                loadData,
                openDiaog,
                closeEvaluationDialog,
                submitEvaluation,
                deleteData,

                updateOrderStatus,
                updateEvaStsr,

                optionList,
                loadUser,
                handleUserChange,
                loadOrder,
                loadEvaOrder,
                handleOrderChange,

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
    #evaluation {
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

    .evaluationImgs {
        height: 40px;
    }

    .evaluationImg {
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

    .evaluationUser {
        font-weight: bold;
    }

    .evaluationUser,
    .evaluationDetail,
    .evaluationObject {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>