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
          <el-table-column prop="userId" label="用户序号" width="80"></el-table-column>
          <el-table-column prop="nickName" label="用户昵称" align="center"></el-table-column>
          <el-table-column prop="userIcon" label="用户头像" width="80" align="center">
            <template slot-scope="scope">
              <img class="userIcon" :src=imgUrl+scope.row.userIcon alt="头像" v-if="scope.row.userIcon">
            </template>
          </el-table-column>
          <el-table-column prop="openid" label="openId" width="250" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="userSfz" label="身份证" width="180" align="center"></el-table-column>
          <el-table-column prop="userPhone" label="电话号码" width="100" align="center"></el-table-column>
          <el-table-column prop="userAddress" label="地址" width="80" align="center">
            <template slot-scope="scope">
              <span class="userClick">{{scope.row.userAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userLike" label="点赞" width="80" align="center">
            <template slot-scope="scope">
              <span class="userClick">{{scope.row.userLike}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userLove" label="收藏" width="80" align="center">
            <template slot-scope="scope">
              <span class="userClick">{{scope.row.userLove}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userEva" label="评价" width="80" align="center">
            <template slot-scope="scope">
              <span class="userClick">{{scope.row.userEva}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userCom" label="讨论" width="80" align="center">
            <template slot-scope="scope">
              <span class="userClick">{{scope.row.userCom}}</span>
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

  </div>
</template>

<script>
  import {
    onMounted,
    reactive,
    ref
  } from "@vue/composition-api";
  import request from "@/utils/request";
  import {
    UpdateUser,
    AddUser,
    DelUser,
    FindAllUser
  } from "@/api/User";
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
          userName: "",
          nickname: "",
          password: "",
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
          keyWord: form.typeName,
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
        } else {
          userDialog.title = "新增用户";
          userDialog.flag = false;
          userDialog.form = {};
        }
        userDialog.visible = true;
      };
      const submitUser = () => {
        if (userDialog.flag) {
          let data = {
            userName: userDialog.form.userName,
            nickname: userDialog.form.nickname,
            password: userDialog.form.password,
          };
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
          let data = {
            userName: userDialog.form.userName,
            nickname: userDialog.form.nickname,
            password: userDialog.form.password,
          };
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
          rootId: user.rootId,
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

        formData,
        imgName,
        imgUrl,
        tirggerFile,

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

  .userIcon {
    height: 40px;
    max-height: 100%;
    max-width: 100%;
  }

  .userClick {
    cursor: pointer;
    color: #409EFF;
  }
</style>