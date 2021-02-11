<template>
  <div id="user">
    <el-container style="height: 100%">
      <el-header style="height: auto">
        <el-row class="toolbar" style="height: auto">
          <el-col :span="20">
            <el-form :inline="true" size="small">
              <el-form-item>
                <el-input placeholder="请输入用户名称" v-model="form.userName" clearable>
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
        <el-table
          v-loading="table.loading"
          size="small"
          :data="table.tableData"
          stripe
          highlight-current-row
          style="margin: 0px 0px"
          key="1"
          height="100%"
          width="100%"
        >
          <el-table-column prop="userId" label="序号" width="50"></el-table-column>
          <el-table-column prop="nickName" label="用户昵称" align="center"></el-table-column>
          <el-table-column prop="userIcon" label="用户头像" width="80" align="center">
            <template slot-scope="scope">
              <img class="userIcon" :src="require('../../assets/imgs/Upload/'+scope.row.userIcon)" :alt="scope.row.userIcon" v-if="scope.row.userIcon">
            </template>
          </el-table-column>
          <el-table-column prop="openid" label="openId" width="250" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户姓名" width="80" align="center">
            <template slot-scope="scope">
              <span class="userName">{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userSfz" label="身份证" width="150" align="center"></el-table-column>
          <el-table-column prop="userPhone" label="电话号码" width="100" align="center"></el-table-column>
          <el-table-column prop="userAddress" label="地址" width="50" align="center">
            <template slot-scope="scope">
              <span class="userClick" @click="openUserDialog(0,scope.row.userId)">{{scope.row.userAddress ? scope.row.userAddress:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userLike" label="点赞" width="50" align="center">
            <template slot-scope="scope">
              <span class="userClick" @click="openUserDialog(1,scope.row.userId)">{{scope.row.userLike ? scope.row.userLike:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userLove" label="收藏" width="50" align="center">
            <template slot-scope="scope">
              <span class="userClick" @click="openUserDialog(2,scope.row.userId)">{{scope.row.userLove ? scope.row.userLove:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userOrder" label="订单" width="50" align="center">
            <template slot-scope="scope">
              <span class="userChange" @click="openUserDialog(3,scope.row.userId)">{{scope.row.userOrder ? scope.row.userOrder:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userEva" label="评价" width="50" align="center">
            <template slot-scope="scope">
              <span class="userChange" @click="openUserDialog(4,scope.row.userId)">{{scope.row.userEva ? scope.row.userEva:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userPost" label="讨论" width="50" align="center">
            <template slot-scope="scope">
              <span class="userChange" @click="openUserDialog(5,scope.row.userId)">{{scope.row.userPost ? scope.row.userPost:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userCom" label="评论" width="50" align="center">
            <template slot-scope="scope">
              <span class="userChange" @click="openUserDialog(6,scope.row.userId)">{{scope.row.userCom ? scope.row.userCom:0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="180px">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="openDiaog(scope.row)">修改信息</el-button>
              <el-button @click="deleteData(scope.row)" size="small" type="text" class="danger" style="color: red">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer style="height: 34px">
        <el-pagination small background @size-change="handlePageSizeChange" @current-change="handleCurrentChange"
          :current-page="pagination.pageIndex" :page-sizes="[5, 10, 20, 30, 40]" :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalRecordCount">
        </el-pagination>
      </el-footer>
    </el-container>
    <!-- 用户 -->
    <el-dialog :title="userDialog.title" :visible.sync="userDialog.visible" :append-to-body="true">
      <el-form :model="userDialog.form" >
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="用户昵称" :label-width="userDialog.formLabelWidth">
              <el-input v-model="userDialog.form.nickName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户头像" :label-width="userDialog.formLabelWidth" prop="serviceIcon">
              <form action="" name="file" class="file">
                  上传文件
                  <input type="file" id="saveImage" name="myphoto" @change="tirggerFile($event)" accept="image/*" ref="new_image" v-if="userDialog.visible">
              </form>
              <div class="fileName">{{imgName}}</div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="openId" :label-width="userDialog.formLabelWidth">
              <el-input v-model="userDialog.form.openid" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户姓名" :label-width="userDialog.formLabelWidth">
              <el-input v-model="userDialog.form.userName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="身份证" :label-width="userDialog.formLabelWidth">
              <el-input v-model="userDialog.form.userSfz" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码" :label-width="userDialog.formLabelWidth">
              <el-input v-model="userDialog.form.userPhone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 地址 -->
    <el-dialog title="地址管理" :visible.sync="userAddressDialog.visible" :append-to-body="true">
      <el-container>
        <el-header style="height:auto;text-align: right;">
          <el-button type="primary" size="small" @click="openAddressDiaog(0)">新增</el-button>
        </el-header>
        <el-main>
          <el-table :data="userAddressDialog.table.tableData">
            <el-table-column property="contactName" label="联系人" width="150"></el-table-column>
            <el-table-column property="contactPhone" label="联系电话" width="150"></el-table-column>
            <el-table-column property="addressArea" label="地区" width="150"></el-table-column>
            <el-table-column property="addressDetail" label="详细地址">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.addressDetail" placement="bottom-start">
                  <span class="addressDetail">{{scope.row.addressDetail}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="150px">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="openAddressDiaog(scope.row)">修改地址</el-button>
              <el-button @click="deleteAddress(scope.row)" size="small" type="text" class="danger" style="color: red">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-main>
      </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAddressDialog.visible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="addressDialog.title" :visible.sync="addressDialog.visible" :append-to-body="true" @close="closeAddressDialog">
      <el-form :model="addressDialog.form" >
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="联系人" :label-width="addressDialog.formLabelWidth">
              <el-input v-model="addressDialog.form.contactName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" :label-width="addressDialog.formLabelWidth">
              <el-input v-model="addressDialog.form.contactPhone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="地区" :label-width="addressDialog.formLabelWidth">
              <el-cascader
                v-model="addressDialog.form.addressArea" clearable
                :options="cityList"
                @change="handleCityChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址" :label-width="addressDialog.formLabelWidth">
              <el-input v-model="addressDialog.form.addressDetail" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addressDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddress">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 点赞、收藏 -->
    <el-dialog :title="userFavorDialog.title" :visible.sync="userFavorDialog.visible" :append-to-body="true">
      <el-container>
        <el-header style="height:auto;text-align: right;">
          <el-button type="primary" size="small" @click="openFavorDiaog">新增</el-button>
        </el-header>
        <el-main>
          <el-table :data="userFavorDialog.table.tableData">
            <el-table-column property="favorType" :label="userFavorDialog.favorType === 1 ? '点赞类型':'收藏类型'">
              <template slot-scope="scope">
                <span v-if="scope.row.serviceId">服务人员</span>
                <span v-else-if="scope.row.institutionId">服务机构</span>
                <span v-else-if="scope.row.postId">帖子</span>
              </template>
            </el-table-column>
            <el-table-column property="serviceId" :label="userFavorDialog.favorType === 1 ? '点赞对象':'收藏对象'">
              <template slot-scope="scope">
                <span v-if="scope.row.serviceId">{{scope.row.serviceName}}</span>
                <span v-else-if="scope.row.institutionId">{{scope.row.institutionName}}</span>
                <span v-else-if="scope.row.postId">{{scope.row.postName}}</span>
              </template>
            </el-table-column>
            <el-table-column property="favorTime" :label="userFavorDialog.favorType === 1 ? '点赞时间':'收藏时间'"></el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="150px">
            <template slot-scope="scope">
              <el-button @click="deleteFavor(scope.row)" size="small" type="text" class="danger" style="color: red">{{scope.row.favorType===1 ? '取消点赞':'取消收藏'}}</el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-main>
      </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFavorDialog.visible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="favorDialog.title" :visible.sync="favorDialog.visible" :append-to-body="true">
      <el-form :model="favorDialog.form" >
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="" :label-width="favorDialog.formLabelWidth">
              <el-select v-model="favorDialog.form.favorType" placeholder="请选择类型" clearable @change="handleFavorTypeChange">
                <el-option
                  v-for="item in FavorTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="" :label-width="favorDialog.formLabelWidth" v-if="!FavorObjectOptions.favorData[0]">
              <el-select v-model="favorDialog.form.FAVOR" placeholder="请选择" clearable @change="handleFavorIDChange">
                <el-option
                  v-for="service in FavorObjectOptions.favorData"
                  :key="service.serviceId"
                  :label="service.serviceName"
                  :value="{ value: service.serviceId, label: service.serviceName }">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" :label-width="favorDialog.formLabelWidth" v-else-if="FavorObjectOptions.favorData[0] && FavorObjectOptions.favorData[0].serviceId">
              <el-select v-model="favorDialog.form.FAVOR" placeholder="请选择服务人员" clearable @change="handleFavorIDChange">
                <el-option
                  v-for="service in FavorObjectOptions.favorData"
                  :key="service.serviceId"
                  :label="service.serviceName"
                  :value="{ value: service.serviceId, label: service.serviceName }">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" :label-width="favorDialog.formLabelWidth" v-else-if="FavorObjectOptions.favorData[0] && FavorObjectOptions.favorData[0].institutionId">
              <el-select v-model="favorDialog.form.FAVOR" placeholder="请选择服务机构" clearable @change="handleFavorIDChange">
                <el-option
                  v-for="institution in FavorObjectOptions.favorData"
                  :key="institution.institutionId"
                  :label="institution.institutionName"
                  :value="{ value: institution.institutionId, label: institution.institutionName }">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="favorDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitFavor">确 定</el-button>
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
  import request from "@/utils/request";
  import city from "@/utils/city"
  import {addImage} from "@/api/System"
  import {
    UpdateUser,
    AddUser,
    DelUser,
    FindAllUser,
    UpdateUserAddressNum,
    UpdateUserLikeNum,
    UpdateUserLoveNum
  } from "@/api/User";
    import {
    ShowAllAddress,
    AddAddress,
    DelAddress,
    UpdateAddress
  } from "@/api/Address";
  import {
    ShowAllFavor,
    AddFavor,
    DelFavor
  } from "@/api/Favor";
  import { ShowAllService,UpdateServiceLikeNum,UpdateServiceLoveNum } from "@/api/Service";
  import { ShowAllInstitution,UpdateInstitutionLikeNum,UpdateInstitutionLoveNum } from "@/api/Institution";
  export default {
    name: "user",
    setup(props, {
      refs,
      root
    }) {
      let form = reactive({
        userName: "",
        nickname: "",
      });
      let userDialog = reactive({
        visible: false,
        title: "",
        flag: false,
        form: {
          userId:"",
          nickName: "",
          userIcon:"",
          openid:"",
          userName: "",
          userSfz:"",
          userPhone:""
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
          keyWord: form.userName,
        };
        table.loading = false;
        FindAllUser(data)
          .then(function (response) {
            console.log(response.data);
            table.loading = false;
            table.tableData = response.data.pageInfo.list;
            pagination.totalRecordCount = response.data.pageInfo.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      const openDiaog = (user) => {
        if (user !== 0) {
          userDialog.title = "修改用户";
          userDialog.flag = true;
          userDialog.form = user;
          imgName.value = user.userIcon;
        } else {
          userDialog.title = "新增用户";
          userDialog.flag = false;
          userDialog.form = {};
          imgName.value = "未选择任何文件";
        }
        userDialog.visible = true;
      };
      const submitUser = () => {
        let data = {
          nickName: userDialog.form.nickName,
          userIcon: imgName.value,
          openid: userDialog.form.openid,
          userName: userDialog.form.userName,
          userSfz: userDialog.form.userSfz,
          userPhone: userDialog.form.userPhone,
        };

        if (imgName.value == '未选择任何文件') {
          imgName.value = '';
        }
        if (userDialog.flag) {
          data['userId'] = userDialog.form.userId;
          UpdateUser(data)
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
          
          AddUser(data)
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
        }
        userDialog.visible = false;
      };
      const deleteData = (user) => {
        let data = {
          userId: user.userId,
        };
        root
          .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            DelUser(data)
              .then(function (response) {
                console.log(response);
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
      const updateUserAddress = (userId) => {
        let data = {
          userId:userId
        };
        table.loading = true;
        UpdateUserAddressNum(data)
          .then(function (response) {
            console.log(response.data);
            table.loading = false;
            loadUserAddress(userId);
            loadData();
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      //更新点赞、收藏
      const updateUserFavor = (favorType,userId) => {
        let data = {
          userId:userId
        };
        table.loading = true;
        if (favorType === 1 ) {
          UpdateUserLikeNum(data)
            .then(function (response) {
              console.log(response.data);
              table.loading = false;
              loadUserFavor(favorType,userId);
              loadData();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else if (favorType === 2 ) {
          UpdateUserLoveNum(data)
            .then(function (response) {
              console.log(response.data);
              table.loading = false;
              loadUserFavor(favorType,userId);
              loadData();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        
      }
      const updateServiceFavor = (type,favorType,favor) => {
        let data;
        if (type === 1 ) {
          data = {
            serviceId: favor.serviceId
          };
          if (favorType === 1 ) {
            UpdateServiceLikeNum(data)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          }
          else if (favorType === 2 ) {
            UpdateServiceLoveNum(data)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        }
        else if (type === 2) {
          data = {
            institutionId: favor.institutionId
          };
          if (favorType === 1 ) {
            UpdateInstitutionLikeNum(data)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          }
          else if (favorType === 2 ) {
            UpdateInstitutionLoveNum(data)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        }
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

      //地址、收藏/点赞
      const openUserDialog = (type,userId) => {
        if (type === 0) {
          userAddressDialog.visible = true;
          loadUserAddress(userId);
          addressDialog.userId = userId;
        }
        else if (type === 1) {
          userFavorDialog.visible = true;
          userFavorDialog.title = '点赞管理';
          userFavorDialog.favorType = 1;
          loadUserFavor(1,userId);
          favorDialog.userId = userId;
        }
        else if (type === 2) {
          userFavorDialog.visible = true;
          userFavorDialog.title = '收藏管理';
          userFavorDialog.favorType = 2;
          loadUserFavor(2,userId);
          favorDialog.userId = userId;
        }
      }

      //地址
      let userAddressDialog = reactive({
        visible: false,
        table: {
          loading: false,
          tableData: []
        }
      });
      const loadUserAddress = (userId) => {
        userAddressDialog.table.loading = true;
        let data = {
          userId:userId
        };
        userAddressDialog.table.loading = false;
        ShowAllAddress(data)
          .then(function (response) {
            console.log(response.data);
            userAddressDialog.table.loading = false;
            userAddressDialog.table.tableData = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      } 
      let addressDialog = reactive({
        visible: false,
        title: "",
        flag: false,
        userId: "",
        form: {
          addressId:"",
          contactName:"",
          contactPhone:"",
          addressArea: "",
          addressDetail:"",
          addressName:""
        },
        formLabelWidth: "120px",
      });
      const openAddressDiaog = (address) => {
        if (address !== 0) {
          addressDialog.title = "修改地址";
          addressDialog.flag = true;
          addressDialog.form = address;
          addressDialog.form.addressArea = addressDialog.form.addressArea.split('/');
        } else {
          addressDialog.title = "新增地址";
          addressDialog.flag = false;
          addressDialog.form = {};
        }
        addressDialog.visible = true;
      };
      const closeAddressDialog = () => {
        if (addressDialog.form.addressArea.indexOf("/") === -1) {
          addressDialog.form.addressArea = addressDialog.form.addressArea.join('/');
        }
      }
      const submitAddress  = () => {
        addressDialog.form.addressArea = addressDialog.form.addressArea[0] +'/'+ addressDialog.form.addressArea[1] +'/'+ addressDialog.form.addressArea[2];
        addressDialog.form.addressName = addressDialog.form.contactName + ',' + addressDialog.form.contactPhone + ',' + addressDialog.form.addressArea + ',' + addressDialog.form.addressDetail;
        let data = {
          addressId: addressDialog.form.addressId,
          contactName: addressDialog.form.contactName,
          contactPhone: addressDialog.form.contactPhone,
          addressArea: addressDialog.form.addressArea,
          addressDetail: addressDialog.form.addressDetail,
          addressName: addressDialog.form.addressName
        };
        if (addressDialog.flag) {
          data['addressId'] = addressDialog.form.addressId,
          UpdateAddress(data)
            .then(function (response) {
              console.log(response);
              root.$message({
                type: "success",
                message: response.data.msg,
              });
              loadUserAddress(addressDialog.userId);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          AddAddress(data)
            .then(function (response) {
              console.log(response);
              root.$message({
                type: "success",
                message: response.data.msg,
              })
              updateUserAddress(addressDialog.userId);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        addressDialog.visible = false;
      };
      const deleteAddress = (address) => {
        let data = {
          addressId: address.addressId,
        };
        root
          .$confirm("此操作将永久删除该地址, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            DelAddress(data)
              .then(function (response) {
                console.log(response);
                updateUserAddress(addressDialog.userId);
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

      //收藏/点赞
      let userFavorDialog = reactive({
        visible: false,
        title:"",
        favorType:0,
        table: {
          loading: false,
          tableData: []
        }
      });
      const loadUserFavor = (favorType,userId) => {
        userFavorDialog.table.loading = true;
        let data = {
          favorType:favorType,
          userId:userId
        };
        userFavorDialog.table.loading = false;
        ShowAllFavor(data)
          .then(function (response) {
            console.log(response.data);
            userFavorDialog.table.loading = false;
            userFavorDialog.table.tableData = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      } 
      let favorDialog = reactive({
        visible: false,
        title: "",
        userId: "",
        form: {
          favorId:"",
          favorType:1,
          FAVOR:"",
          favorTime:""
        },
        formLabelWidth: "120px",
      });
      const openFavorDiaog = () => {
        if (userFavorDialog.favorType === 1) {
          favorDialog.title = "新增点赞";
        }
        else if (userFavorDialog.favorType === 2) {
          favorDialog.title = "新增收藏";
        }
        favorDialog.form = {};
        FavorObjectOptions.favorData = [];
        favorDialog.visible = true;
      };
      const submitFavor  = () => {
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()<10 ? '0'+new Date().getMonth() : new Date().getMonth();
        let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
        let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
		    favorDialog.form.favorTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        let data = {
          userId: favorDialog.userId,
          favorType: userFavorDialog.favorType,
          favorTime: favorDialog.form.favorTime,
        };
        if (favorDialog.form.favorType === 1) {
          data['serviceId'] = favorDialog.form.FAVOR.value;
          data['serviceName'] = favorDialog.form.FAVOR.label;
        }
        else if (favorDialog.form.favorType === 2) {
          data['institutionId'] = favorDialog.form.FAVOR.value;
          data['institutionName'] = favorDialog.form.FAVOR.label;
        }
        else if (favorDialog.form.favorType === 3) {
          data['postId'] = favorDialog.form.FAVOR.value;
          data['postName'] = favorDialog.form.FAVOR.label;
        }
          AddFavor(data)
            .then(function (response) {
              console.log(response);
              root.$message({
                type: "success",
                message: response.data.msg,
              })
              updateUserFavor(userFavorDialog.favorType,favorDialog.userId);
              updateServiceFavor(favorDialog.form.favorType,userFavorDialog.favorType,data);
              favorDialog.visible = false;
            })
            .catch(function (error) {
              console.log(error);
            });
      };
      const deleteFavor = (favor) => {
        let data = {
          favorId: favor.favorId,
        };
        root.$confirm("此操作将永久删除该收藏, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            DelFavor(data)
              .then(function (response) {
                console.log(response);
                updateUserFavor(userFavorDialog.favorType,favorDialog.userId);
                updateServiceFavor(favorDialog.form.favorType,userFavorDialog.favorType,favor);
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

      //点赞、收藏对象
      const FavorTypeOptions = reactive([{
          value: 1,
          label: '服务人员'
        }, {
          value: 2,
          label: '服务机构'
        }, {
          value: 3,
          label: '讨论贴'
        }])
      const FavorObjectOptions = reactive({
        favorData:[]
      })
      const handleFavorTypeChange = (type) => {
        if (type === 1) {
          loadService();
        }
        else if (type === 2) {
          loadInstitution();
        }
      }
      const handleFavorIDChange = (val) => {
        console.log(val);
      }
      const loadService = () => {
        ShowAllService().then(function (response) {
          console.log(response);
          FavorObjectOptions.favorData = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
      }
      const loadInstitution = () => {
        ShowAllInstitution().then(function (response) {
          console.log(response);
          FavorObjectOptions.favorData = response.data;
          console.log(FavorObjectOptions.favorData[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
      }


      //地区选择
      const cityList = city;
      const handleCityChange = (val) => {
        console.log(val);
      }
      //页码
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

      onMounted(() => {
        loadData();
      });

      return {
        form,
        table,
        userDialog,

        loadData,
        openDiaog,
        submitUser,
        deleteData,

        updateUserAddress,
        updateUserFavor,
        updateServiceFavor,

        formData,
        imgName,
        imgUrl,
        tirggerFile,

        openUserDialog,
        userAddressDialog,
        loadUserAddress,

        addressDialog,
        openAddressDiaog,
        closeAddressDialog,
        submitAddress,
        deleteAddress,

        userFavorDialog,
        favorDialog,
        openFavorDiaog,
        submitFavor,
        deleteFavor,

        FavorTypeOptions,
        FavorObjectOptions,
        handleFavorTypeChange,
        handleFavorIDChange,

        loadService,
        loadInstitution,

        cityList,
        handleCityChange,

        pagination,
        handleCurrentChange,
        handlePageSizeChange,
      };
    },
  };
</script>

<style scoped>
  #user {
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

  .file input {
    width: 80px;
    height: 40px;
    opacity: 0;
    filter: alpha(opacity=0);
    position: absolute;
    left: 0;
    top: 0;
  }

  .userName {
    font-weight: bold;
  }

  .userIcon {
    height: 40px;
    width: 40px;
    max-height: 100%;
    max-width: 100%;
    border-radius: 50%;
  }

  .userClick {
    cursor: pointer;
    color: #409EFF;
  }

  .userChange {
    font-style: oblique;
  }

  .addressDetail {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-dialog /deep/ .el-dialog__header {
    border-bottom: 1px solid #ebebeb;
  }
</style>