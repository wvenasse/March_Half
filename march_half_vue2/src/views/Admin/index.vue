<template>
  <div id="admin">
    <el-container style="height: 100%">
      <el-header style="height: auto">
        <el-row class="toolbar" style="height: auto">
          <el-col :span="20">
            <el-form :inline="true" size="small">
              <el-form-item>
                <el-input placeholder="请输入管理员名称" v-model="form.userName" clearable>
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
          style="margin: 0px 0px" key="1" height="100%">
          <el-table-column prop="rootId" label="管理员序号"></el-table-column>
          <el-table-column prop="userName" label="管理员名称"></el-table-column>
          <el-table-column prop="nickname" label="管理员昵称"></el-table-column>
          <el-table-column label="操作" align="center" width="180px">
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
    <el-dialog :title="adminDialog.title" :visible.sync="adminDialog.visible" :append-to-body="true">
      <el-form :model="adminDialog.form">
        <el-form-item label="管理员名称" :label-width="adminDialog.formLabelWidth">
          <el-input disabled v-model="adminDialog.form.userName" autocomplete="off" v-if="adminDialog.flag"></el-input>
          <el-input v-model="adminDialog.form.userName" autocomplete="off" v-else></el-input>
        </el-form-item>
        <el-form-item label="管理员昵称" :label-width="adminDialog.formLabelWidth">
          <el-input v-model="adminDialog.form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="adminDialog.formLabelWidth">
          <el-input type="password" v-model="adminDialog.form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adminDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    onMounted,
    reactive,
    ref,
    computed
  } from "@vue/composition-api";
  import request from "@/utils/request";
  import {
    UpdateAdmin,
    AddAdmin,
    DelAdmin,
    FindAllAdmin
  } from "@/api/Admin";
  import {updateNickName} from "@/utils/app.js"
  export default {
    name: "admin",
    setup(props, {
      refs,
      root
    }) {
      let form = reactive({
        userName: "",
        nickname: "",
      });
      let adminDialog = reactive({
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
      let pagination = reactive({
        pageIndex: 1,
        totalRecordCount: 0,
        pageSize: 10,
      });

      const loadData = () => {
        table.loading = true;
        let data = {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          keyWord: form.userName,
        };
        table.loading = false;
        FindAllAdmin(data)
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
      const openDiaog = (admin) => {
        if (admin !== 0) {
          adminDialog.title = "修改管理员";
          adminDialog.flag = true;
          adminDialog.form = admin;
        } else {
          adminDialog.title = "新增管理员";
          adminDialog.flag = false;
          adminDialog.form = {};
        }
        adminDialog.visible = true;
      };
      const submitAdmin = () => {
        let yy = new Date().getFullYear();
        let m = new Date().getMonth() + 1;
        let mm = m < 10 ? '0' + m : m;
        let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
        let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
		    adminDialog.form.rootTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        if (adminDialog.flag) {
          let data = {
            userName: adminDialog.form.userName,
            nickname: adminDialog.form.nickname,
            password: adminDialog.form.password,
            rootTime: adminDialog.form.rootTime
          };
          UpdateAdmin(data)
            .then(function (response) {
              console.log(response);
              root.$message({
                type: "success",
                message: response.data.msg,
              });
              let userName = computed(() => root.$store.state.app.userName);
              if (userName.value == adminDialog.form.userName) {
                root.$store.commit('UPDATE_NICKNAME', adminDialog.form.nickname);
                updateNickName(adminDialog.form.nickname);
              }
              loadData();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          let data = {
            userName: adminDialog.form.userName,
            nickname: adminDialog.form.nickname,
            password: adminDialog.form.password,
            rootTime: adminDialog.form.rootTime
          };
          AddAdmin(data)
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
        adminDialog.visible = false;
      };
      const deleteData = (admin) => {
        let data = {
          rootId: admin.rootId,
        };
        root
          .$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            DelAdmin(data)
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
        pagination,
        adminDialog,

        loadData,
        openDiaog,
        submitAdmin,
        deleteData,

        handleCurrentChange,
        handlePageSizeChange,
      };
    },
  };
</script>

<style scoped>
  #admin {
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
</style>