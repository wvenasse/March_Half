<template>
    <div id="order">
        <el-container style="height: 100%">
            <el-header style="height: auto">
                <el-row class="toolbar" style="height: auto;">
                    <el-col :span="20">
                        <el-form :inline="true" size="small">
                            <el-form-item style="width:120px;">
                                <el-select size="small" v-model="form.orderStatus" placeholder="订单状态" clearable
                                    @change="loadData">
                                    <el-option key='0' label="待确定" value='0'></el-option>
                                    <el-option key='1' label="已接单" value='1'></el-option>
                                    <el-option key='2' label="进行中" value='2'></el-option>
                                    <el-option key='3' label="已完成" value='3'></el-option>
                                    <el-option key='4' label="已评价" value='4'></el-option>
                                    <el-option key='5' label="已完成" value='5'></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="width:120px;">
                                <el-select size="small" v-model="form.orderType" placeholder="订单类别" clearable
                                    @change="loadData">
                                    <el-option v-for="type in optionList.typeData" :key="type.typeId"
                                        :label="type.typeName" :value="type.typeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="margin-left: 10px; width:150px;">
                                <el-input placeholder="请输入用户名称" v-model="form.OrderUser" clearable>
                                </el-input>
                            </el-form-item>
                            <el-form-item style="margin-left: 10px">
                                <el-button icon="el-icon-search" size="small" type="primary" @click="loadData">查询
                                </el-button>
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
                    <el-table-column prop="orderId" label="序号" width="50"></el-table-column>
                    <el-table-column prop="orderUser" label="用户姓名" width="80" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.orderUser"
                                placement="bottom-start">
                                <span class="orderUser">{{scope.row.orderUser}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderContactName" label="服务对象" width="80" align="center"></el-table-column>
                    <el-table-column prop="orderContactPhone" label="联系电话" width="100" align="center"></el-table-column>
                    <el-table-column prop="orderDate" label="服务时间" width="200" align="center"></el-table-column>
                    <el-table-column prop="orderAddressDtail" label="服务地址" width="130" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.orderAddressDetail"
                                placement="bottom-start">
                                <span
                                    class="orderAddressDetail">{{scope.row.orderArea}}-{{scope.row.orderAddressDetail}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderType" label="服务类别" width="80" align="center"></el-table-column>
                    <el-table-column prop="orderService" label="服务人员" width="150" align="center"></el-table-column>
                    <el-table-column prop="orderInstitution" label="服务企业" width="150" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.orderInstitution"
                                placement="bottom-start">
                                <span class="orderInstitution">{{scope.row.orderInstitution}}</span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderTime" label="订单时间" width="150" align="center"></el-table-column>
                    <el-table-column prop="orderStatus" label="订单状态" width="150" align="center">
                        <template slot-scope="scope">
                            <span class="orderStatus" v-if="scope.row.orderStatus == '0'">
                                <el-popover placement="top" width="160" trigger="hover">
                                    <p style="color:red;"><i class="el-icon-info"></i>确定已接单吗？</p>
                                    <div style="text-align: right; margin: 0;">
                                        <el-button type="primary" size="mini"
                                            @click="handleOrderStatus(scope.row.orderId,'1')">确定</el-button>
                                    </div>
                                    <el-button type="danger" plain size="mini" slot="reference">待确定</el-button>
                                </el-popover>
                            </span>
                            <span class="orderStatus" v-else-if="scope.row.orderStatus == '1'">
                                <el-popover placement="top" width="160" trigger="hover">
                                    <p style="color:red;"><i class="el-icon-info"></i>确定已进行吗？</p>
                                    <div style="text-align: right; margin: 0;">
                                        <el-button type="primary" size="mini"
                                            @click="handleOrderStatus(scope.row.orderId,'2')">确定</el-button>
                                    </div>
                                    <el-button type="info" plain size="mini" slot="reference">已接单</el-button>
                                </el-popover>
                            </span>
                            <span class="orderStatus" v-else-if="scope.row.orderStatus == '2'">
                                <el-popover placement="top" width="160" trigger="hover">
                                    <p style="color:red;"><i class="el-icon-info"></i>确定已完成吗？</p>
                                    <div style="text-align: right; margin: 0;">
                                        <el-button type="primary" size="mini"
                                            @click="handleOrderStatus(scope.row.orderId,'3')">确定</el-button>
                                    </div>
                                    <el-button type="primary" plain size="mini" slot="reference">进行中</el-button>
                                </el-popover>
                            </span>
                            <span class="orderStatus" v-else-if="scope.row.orderStatus == '3'">
                                <el-popover placement="top" width="160" trigger="hover">
                                    <p style="color:red;"><i class="el-icon-info"></i>确定已评价吗？</p>
                                    <div style="text-align: right; margin: 0;">
                                        <el-button type="primary" size="mini"
                                            @click="handleOrderStatus(scope.row.orderId,'4')">确定</el-button>
                                    </div>
                                    <el-button type="warning" plain size="mini" slot="reference">已完成</el-button>
                                </el-popover>
                            </span>
                            <span class="orderStatus" v-else-if="scope.row.orderStatus == '4'">
                                <el-popover placement="top" width="160" trigger="hover">
                                    <p style="color:red;"><i class="el-icon-info"></i>确定已结束吗？</p>
                                    <div style="text-align: right; margin: 0;">
                                        <el-button type="primary" size="mini"
                                            @click="handleOrderStatus(scope.row.orderId,'5')">确定</el-button>
                                    </div>
                                    <el-button type="success" plain size="mini" slot="reference">已评价</el-button>
                                </el-popover>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderDetail" label="订单备注" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :content="scope.row.orderDetail"
                                placement="bottom-start">
                                <span class="orderDetail">{{scope.row.orderDetail}}</span>
                            </el-tooltip>
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
        <el-dialog :title="orderDialog.title" :visible.sync="orderDialog.visible" :append-to-body="true"
            @close="closeDialog">
            <el-form :model="orderDialog.form">
                <el-form-item>
                    <el-col :span="12">
                        <el-form-item label="用户" prop="orderUser" :label-width="orderDialog.formLabelWidth">
                            <el-select v-if="orderDialog.flag" disabled v-model="orderDialog.form.userId" clearable
                                placeholder="请选择用户" @change="handleUserChange">
                                <el-option v-for="user in optionList.userData" :key="user.userId" :label="user.userName"
                                    :value="user.userId">
                                </el-option>
                            </el-select>
                            <el-select v-else v-model="orderDialog.form.userId" clearable filterable placeholder="请选择用户"
                                @change="handleUserChange">
                                <el-option v-for="user in optionList.userData" :key="user.userId" :label="user.userName"
                                    :value="user.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="服务地址" prop="addressId" :label-width="orderDialog.formLabelWidth">
                            <el-select v-model="orderDialog.form.addressId" clearable placeholder="请选择地址"
                                @change="handleAddressChange">
                                <el-option v-for="address in optionList.addressData" :key="address.addressId"
                                    :label="address.addressName" :value="address.addressId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="12">
                        <el-form-item label="服务类别" prop="typeId" :label-width="orderDialog.formLabelWidth">
                            <el-select v-model="orderDialog.form.typeId" clearable placeholder="请选择类别"
                                @change="handleTypeChange">
                                <el-option v-for="type in optionList.typeData" :key="type.typeId" :label="type.typeName"
                                    :value="type.typeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="服务人员" prop="serviceId" :label-width="orderDialog.formLabelWidth">
                            <el-select v-model="orderDialog.form.serviceId" clearable placeholder="请选择人员"
                                @change="handleServiceChange">
                                <el-option v-for="service in optionList.serviceData" :key="service.serviceId"
                                    :label="service.serviceName" :value="service.serviceId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item prop="orderDate" label="订单时间" :label-width="orderDialog.formLabelWidth">
                    <el-date-picker v-model="orderDialog.form.orderDate" type="datetime" placeholder="选择订单日期时间"
                    align="right" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="orderDetail" label="订单备注" :label-width="orderDialog.formLabelWidth">
                    <el-input type="textarea" placeholder="请输入备注" v-model="orderDialog.form.orderDetail" maxlength="100"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="orderDialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="submitOrder">确 定</el-button>
            </div>
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
        UpdateOrder,
        AddOrder,
        DelOrder,
        FindAllOrder,
        FindAllOrderByStatus,
        UpdateOrderStatus
    } from "@/api/Order";
    import {
        ShowAllUser,
        UpdateUserOrderNum
    } from "@/api/User";
    import {
        ShowAllAddress
    } from "@/api/Address";
    import {
        ShowAllType
    } from "@/api/Type";
    import {
        ShowAllService,
        UpdateServiceOrderNum
    } from "@/api/Service";
    import {
        UpdateInstitutionOrderNum
    } from "@/api/Institution";
    export default {
        name: "order",
        setup(props, {
            refs,
            root
        }) {
            let form = reactive({
                orderStatus: "",
                orderType: "",
                orderUser: "",
            });
            let orderDialog = reactive({
                visible: false,
                title: "",
                flag: false,
                form: {
                    orderId: "",
                    orderTime: "",
                    orderDate:"",
                    orderDetail: "",
                    userId: "",
                    orderUser: "",
                    typeId: "",
                    orderType: "",
                    serviceId: "",
                    orderService: "",
                    institutionId: "",
                    orderInstitution: "",
                    addressId: "",
                    orderContactName: "",
                    orderContactPhone: "",
                    orderArea: "",
                    orderAddressDetail: "",
                },
                formLabelWidth: "120px",
            });
            let table = reactive({
                loading: false,
                tableData: [],
            });
            let pickerOptions = {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '明天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() + 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周后',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            };
            const loadData = () => {
                table.loading = true;
                let data = {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                    keyWord: form.orderUser
                };
                table.loading = false;
                if (form.orderStatus !== '') {
                    data['orderStatus'] = form.orderStatus;
                    FindAllOrderByStatus(data)
                        .then(function (response) {
                            console.log(response.data);
                            table.loading = false;
                            table.tableData = response.data.pageInfo.list;
                            if (form.orderType) {
                                table.tableData = table.tableData.filter(order => order.typeId === form
                                    .orderType);
                            }
                            pagination.totalRecordCount = response.data.pageInfo.total;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    FindAllOrder(data)
                        .then(function (response) {
                            console.log(response.data);
                            table.loading = false;
                            table.tableData = response.data.pageInfo.list;
                            if (form.orderType) {
                                table.tableData = table.tableData.filter(order => order.typeId === form
                                    .orderType);
                            }
                            pagination.totalRecordCount = response.data.pageInfo.total;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }


            };
            const openDiaog = (order) => {
                console.log(order)
                if (order !== 0) {
                    orderDialog.title = "修改订单";
                    orderDialog.flag = true;
                    orderDialog.form = order;
                    if (orderDialog.form.userId) {
                        loadAddress(orderDialog.form.userId);
                    }
                    if (orderDialog.form.typeId) {
                        loadService(orderDialog.form.typeId);
                    }
                } else {
                    orderDialog.title = "新增订单";
                    orderDialog.flag = false;
                    orderDialog.form = {};
                }
                orderDialog.visible = true;
            };
            const closeDialog = () => {
                // console.log('close');
                // if (orderDialog.form.orderArea.indexOf("/") == -1) {
                //     orderDialog.form.orderArea = orderDialog.form.orderArea.join('/');
                // }
            }
            const submitOrder = () => {
                if (orderDialog.form.serviceArea) {
                    orderDialog.form.serviceArea = orderDialog.form.serviceArea[0] + '/' + orderDialog.form
                        .serviceArea[1] + '/' + orderDialog.form.serviceArea[2];
                }
                let yy = new Date().getFullYear();
                let m = new Date().getMonth() + 1;
                let mm = m < 10 ? '0' + m : m;
                let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                orderDialog.form.orderTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
                orderDialog.form.orderName = orderDialog.form.orderContactName + ',' + orderDialog.form.orderType +
                    ',' + orderDialog.form.orderService + ',' + orderDialog.form.orderInstitution + ',' +
                    orderDialog.form.orderTime;
                let data = {
                    orderName: orderDialog.form.orderName,
                    orderDate: orderDialog.form.orderDate,
                    orderDetail: orderDialog.form.orderDetail,
                    orderTime: orderDialog.form.orderTime,

                    userId: orderDialog.form.userId,
                    orderUser: orderDialog.form.orderUser,
                    typeId: orderDialog.form.typeId,
                    orderType: orderDialog.form.orderType,
                    serviceId: orderDialog.form.serviceId,
                    orderService: orderDialog.form.orderService,
                    institutionId: orderDialog.form.institutionId,
                    orderInstitution: orderDialog.form.orderInstitution,

                    addressId: orderDialog.form.addressId,
                    orderContactName: orderDialog.form.orderContactName,
                    orderContactPhone: orderDialog.form.orderContactPhone,
                    orderArea: orderDialog.form.orderArea,
                    orderAddressDetail: orderDialog.form.orderAddressDetail,
                };
                if (orderDialog.flag) {
                    data['orderId'] = orderDialog.form.orderId;
                    UpdateOrder(data)
                        .then(function (response) {
                            console.log(response);
                            root.$message({
                                type: "success",
                                message: response.data.msg,
                            });
                            loadData();
                            updateOrderNum(data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    data['orderStatus'] = '0';
                    AddOrder(data)
                        .then(function (response) {
                            console.log(response);
                            root.$message({
                                type: "success",
                                message: response.data.msg,
                            });
                            loadData();
                            updateOrderNum(data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                orderDialog.visible = false;
            };
            const deleteData = (order) => {
                let data = {
                    orderId: order.orderId,
                };
                root
                    .$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        DelOrder(data)
                            .then(function (response) {
                                console.log(response);
                                loadData();
                                updateOrderNum(order);
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
            const updateOrderNum = (order) => {
                let userData = {
                    userId: order.userId
                };
                UpdateUserOrderNum(userData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                let serviceData = {
                    serviceId: order.serviceId
                };
                UpdateServiceOrderNum(serviceData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                let institutionData = {
                    institutionId: order.institutionId
                };
                UpdateInstitutionOrderNum(institutionData)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const handleOrderStatus = (orderId, status) => {
                console.log(orderId, status);
                let data = {
                    orderId: orderId,
                    orderStatus: status
                };
                UpdateOrderStatus(data)
                    .then(function (response) {
                        console.log(response.data);
                        loadData();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

            //用户、地址、类别、人员、机构
            let optionList = reactive({
                userData: [],
                addressData: [],
                serviceData: [],
                typeData: [],
                institutionData: []
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
                loadAddress(val);
                for (let i = 0; i < optionList.userData.length; i++) {
                    if (optionList.userData[i].userId === val) {
                        orderDialog.form.orderUser = optionList.userData[i].userName;
                    }
                }
            }
            const loadAddress = (userId) => {
                let data = {
                    userId: userId
                };
                ShowAllAddress(data).then(function (response) {
                        console.log(response);
                        optionList.addressData = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const handleAddressChange = (val) => {
                console.log('add')
                console.log(val)
                if (val) {
                    for (let i = 0; i < optionList.addressData.length; i++) {
                        if (optionList.addressData[i].addressId === val) {
                            let address = optionList.addressData[i].addressVal.split('-')
                            orderDialog.form.orderContactName = address[0];
                            orderDialog.form.orderContactPhone = address[1];
                            orderDialog.form.orderArea = address[2];
                            orderDialog.form.orderAddressDetail = address[3];
                        }
                    }
                } else {
                    orderDialog.form.orderContactName = '';
                    orderDialog.form.orderContactPhone = '';
                    orderDialog.form.orderArea = '';
                    orderDialog.form.orderAddressDetail = '';
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
                if (val) {
                    for (let i = 0; i < optionList.typeData.length; i++) {
                        if (optionList.typeData[i].typeId === val) {
                            orderDialog.form.orderType = optionList.typeData[i].typeName;
                            loadService(val);
                        }
                    }
                } else {
                    orderDialog.form.orderType = '';
                }
            }
            const loadService = (val) => {
                ShowAllService().then(function (response) {
                        console.log(response);
                        optionList.serviceData = response.data;
                        if (val) {
                            optionList.serviceData = optionList.serviceData.filter(service => {
                                let type = service.typeId;
                                type = type.split(',');
                                val = val + '';
                                return type.indexOf(val) !== -1
                            });
                        }
                        console.log(optionList.serviceData);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            const handleServiceChange = (val) => {
                if (val) {
                    for (let i = 0; i < optionList.serviceData.length; i++) {
                        if (optionList.serviceData[i].serviceId === val) {
                            orderDialog.form.orderService = optionList.serviceData[i].serviceName;
                            orderDialog.form.institutionId = optionList.serviceData[i].institutionId;
                            orderDialog.form.orderInstitution = optionList.serviceData[i].serviceInstitution;
                        }
                    }
                } else {
                    orderDialog.form.orderService = '';
                    orderDialog.form.institutionId = '';
                    orderDialog.form.orderInstitution = '';
                }
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

            onMounted(() => {
                loadType();
                loadData();
                loadUser();
                loadAddress();
                loadService();
            });

            return {
                form,
                table,
                pickerOptions,
                pagination,
                orderDialog,

                loadData,
                openDiaog,
                closeDialog,
                submitOrder,
                deleteData,
                updateOrderNum,
                handleOrderStatus,

                optionList,
                loadUser,
                handleUserChange,
                loadAddress,
                handleAddressChange,
                loadType,
                handleTypeChange,
                loadService,
                handleServiceChange,

                handleCurrentChange,
                handlePageSizeChange,

            };
        },
    };
</script>

<style scoped>
    #order {
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

    .serviceIcon {
        height: 40px;
        width: 40px;
        max-height: 100%;
        max-width: 100%;
        border-radius: 50%;
    }

    .orderUser {
        font-weight: bold;
    }

    .orderAddressDetail,
    .orderInstitution,
    .orderDetail {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>