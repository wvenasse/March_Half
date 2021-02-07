<template>
  <div id="institution">
    <el-container style="height: 100%">
      <el-header style="height: auto">
        <el-row class="toolbar" style="height: auto">
          <el-col :span="20">
            <el-form :inline="true" size="small">
              <el-form-item>
                <el-input placeholder="请输入服务机构名称" v-model="form.institutionName" clearable>
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
          <el-table-column prop="institutionId" label="序号" width="50"></el-table-column>
          <el-table-column prop="institutionName" label="机构名称" width="200" align="center"></el-table-column>
          <el-table-column prop="institutionImg" label="机构图片" width="100" align="center">
            <template slot-scope="scope">
              <img class="institutionImg" :src="require('../../assets/imgs/Upload/'+scope.row.institutionImg)"
                :alt="scope.row.institutionImg" v-if="scope.row.institutionImg">
            </template>
          </el-table-column>
          <el-table-column prop="institutionType" label="服务类别" width="100" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.institutionType" placement="bottom-start">
                <span class="institutionType">{{scope.row.institutionType}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="institutionPhone" label="联系电话" width="100" align="center"></el-table-column>
          <el-table-column prop="institutionAddress" label="地址" width="200" align="center"></el-table-column>
          <el-table-column prop="institutionIntro" label="介绍" min-width="150" align="center">
            <template slot-scope="scope">
              <span class="institutionIntro">{{scope.row.institutionIntro}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionService" label="人员" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.institutionService ? scope.row.institutionService:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionOrder" label="订单" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.institutionOrder ? scope.row.institutionOrder:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionStar" label="满意" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.institutionStar ? scope.row.institutionStar:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionEva" label="评价" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.institutionEva ? scope.row.institutionEva:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionLike" label="点赞" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.institutionLike ? scope.row.institutionLike:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionLove" label="收藏" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.institutionLove ? scope.row.institutionLove:0}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="150px">
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
    <el-dialog :title="institutionDialog.title" :visible.sync="institutionDialog.visible" :append-to-body="true">
      <el-form :model="institutionDialog.form">
        <el-form-item label="服务机构名称" :label-width="institutionDialog.formLabelWidth">
          <el-input disabled v-model="institutionDialog.form.institutionName" autocomplete="off"
            v-if="institutionDialog.flag"></el-input>
          <el-input v-model="institutionDialog.form.institutionName" autocomplete="off" v-else></el-input>
        </el-form-item>
        <el-form-item label="服务机构昵称" :label-width="institutionDialog.formLabelWidth">
          <el-input v-model="institutionDialog.form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务机构密码" :label-width="institutionDialog.formLabelWidth">
          <el-input type="password" v-model="institutionDialog.form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="institutionDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitInstitution">确 定</el-button>
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
    UpdateInstitution,
    AddInstitution,
    DelInstitution,
    FindAllInstitution
  } from "@/api/Institution";
  export default {
    name: "institution",
    setup(props, {
      refs,
      root
    }) {
      let form = reactive({
        institutionName: "",
        nickname: "",
      });
      let institutionDialog = reactive({
        visible: false,
        title: "",
        flag: false,
        form: {
          institutionName: "",
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
        pageSize: 5,
      });

      const loadData = () => {
        table.loading = true;
        let data = {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          keyWord: form.typeName,
        };
        table.loading = false;
        table.tableData = [{
          institutionId: 1,
          institutionName: 'wsh',
          nickname: '小王'
        }, ]
        pagination.totalRecordCount = 1;
        //   FindAllAser(data)
        //     .then(function (response) {
        //       console.log(response.data);
        //       table.loading = false;
        //       table.tableData = response.data.pageInfo.list;
        //       pagination.totalRecordCount = response.data.pageInfo.total;
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
      };
      const openDiaog = (institution) => {
        if (institution !== 0) {
          institutionDialog.title = "修改服务机构";
          institutionDialog.flag = true;
          institutionDialog.form = institution;
        } else {
          institutionDialog.title = "新增服务机构";
          institutionDialog.flag = false;
          institutionDialog.form = {};
        }
        institutionDialog.visible = true;
      };
      const submitInstitution = () => {
        if (institutionDialog.flag) {
          let data = {
            institutionName: institutionDialog.form.institutionName,
            nickname: institutionDialog.form.nickname,
            password: institutionDialog.form.password,
          };
          UpdateInstitution(data)
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
            institutionName: institutionDialog.form.institutionName,
            nickname: institutionDialog.form.nickname,
            password: institutionDialog.form.password,
          };
          AddInstitution(data)
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
        institutionDialog.visible = false;
      };
      const deleteData = (institution) => {
        let data = {
          rootId: institution.rootId,
        };
        root
          .$confirm("此操作将永久删除该服务机构, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            DelInstitution(data)
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
        institutionDialog,

        loadData,
        openDiaog,
        submitInstitution,
        deleteData,

        handleCurrentChange,
        handlePageSizeChange,
      };
    },
  };
</script>

<style scoped>
  #institution {
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

  .institutionImg {
    height: 40px;
    width: 40px;
    max-height: 100%;
    max-width: 100%;
    border-radius: 50%;
  }


  .institutionIntro,
  .institutionType {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>