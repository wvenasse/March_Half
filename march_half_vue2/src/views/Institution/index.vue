<template>
  <div id="institution">
    <el-container style="height: 100%">
      <el-header style="height: auto">
        <el-row class="toolbar" style="height: auto;">
          <el-col :span="20">
            <el-form :inline="true" size="small">
              <el-form-item style=" width:150px;">
                <el-input placeholder="请输入服务人员名称" v-model="form.institutionName" clearable>
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
          <el-table-column prop="institutionName" label="机构名称" width="200" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.institutionName" placement="bottom-start">
                <span class="institutionName">{{scope.row.institutionName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="institutionImg" label="机构图片" width="100" align="center">
            <template slot-scope="scope">
              <div style="display:flex;justify-content: center;">
                <div class="institutionImgs" v-for="(img,index) in scope.row.institutionImg" :key="index">
                  <img class="institutionImg" :src="require('../../assets/imgs/Upload/'+ img)"
                  :alt="img" v-if="index<2" @click="openImgPreDialog(scope.row.institutionImg)">
                  <div class="imgNum" v-if="index===1 && scope.row.institutionImg.length>2">+{{scope.row.institutionImg.length}}</div>
                </div>
              </div>
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
          <el-table-column prop="institutionAddress" label="地址" width="130" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.institutionAddress" placement="bottom-start">
                <span class="institutionAddress">{{scope.row.institutionArea}}-{{scope.row.institutionAddress}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="institutionIntro" label="介绍" min-width="150" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.institutionIntro" placement="bottom-start">
                <span class="institutionIntro">{{scope.row.institutionIntro}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="institutioninstitution" label="人员" width="50" align="center">
            <template slot-scope="scope">
              <span class="institutionChange">{{scope.row.institutionService ? scope.row.institutionService:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionOrder" label="订单" width="50" align="center">
            <template slot-scope="scope">
              <span class="institutionChange">{{scope.row.institutionOrder ? scope.row.institutionOrder:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionStar" label="满意" width="150" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" :content="scope.row.institutionStar+''" placement="bottom">
                <el-rate
                  v-model="scope.row.institutionStar"
                  disabled
                  text-color="#ff9900">
                </el-rate>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="institutionEva" label="评价" width="50" align="center">
            <template slot-scope="scope">
              <span class="institutionChange">{{scope.row.institutionEva ? scope.row.institutionEva:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionLike" label="点赞" width="50" align="center">
            <template slot-scope="scope">
              <span class="institutionChange">{{scope.row.institutionLike ? scope.row.institutionLike:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="institutionLove" label="收藏" width="50" align="center">
            <template slot-scope="scope">
              <span class="institutionChange">{{scope.row.institutionLove ? scope.row.institutionLove:0}}</span>
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
    <el-dialog :title="institutionDialog.title" :visible.sync="institutionDialog.visible" :append-to-body="true"
      @close="closeDialog">
      <el-form :model="institutionDialog.form">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="服务机构名称" prop="institutionName" :label-width="institutionDialog.formLabelWidth">
              <el-input v-model="institutionDialog.form.institutionName" clearable autocomplete="off" style="width:217px;">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务机构图片" prop="institutionImg" :label-width="institutionDialog.formLabelWidth">
              <form action="" name="file" class="file">
                上传文件
                <input type="file" id="saveImage" name="myphoto" multiple="multiple" @change="tirggerFile($event)" accept="image/*"
                  ref="new_image" v-if="institutionDialog.visible">
              </form>
              <div class="fileName">{{imgName}}</div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="服务类别" prop="typeId" :label-width="institutionDialog.formLabelWidth">
              <el-select v-model="institutionDialog.form.typeId" clearable multiple collapse-tags placeholder="请选择">
                <el-option v-for="type in optionList.typeData" :key="type.typeId" :label="type.typeName"
                  :value="type.typeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="institutionPhone" :label-width="institutionDialog.formLabelWidth">
              <el-input v-model="institutionDialog.form.institutionPhone" clearable autocomplete="off" style="width:217px;">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="机构地址" prop="institutionArea" :label-width="institutionDialog.formLabelWidth">
              <el-cascader v-model="institutionDialog.form.institutionArea" clearable :options="cityList"
                @change="handleCityChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址详情" prop="institutionAddress" :label-width="institutionDialog.formLabelWidth">
              <el-input v-model="institutionDialog.form.institutionAddress" style="width:217px;"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="institutionIntro" label="介绍" :label-width="institutionDialog.formLabelWidth">
          <el-input type="textarea" placeholder="请输入介绍" v-model="institutionDialog.form.institutionIntro" maxlength="50"
            show-word-limit>
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="institutionDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitInstitution">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="预览"
      :visible.sync="imgPreDialog.visible"
      width="30%"
      center>
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
  import request from "@/utils/request";
  import city from "@/utils/city"
  import {
    UpdateInstitution,
    AddInstitution,
    DelInstitution,
    FindAllInstitution
  } from "@/api/Institution";
  import {
    ShowAllType
  } from "@/api/Type";
  import {
    addImage
  } from "@/api/System"

  export default {
    name: "institution",
    setup(props, {
      refs,
      root
    }) {
      let form = reactive({
        institutionName: "",
      });
      let institutionDialog = reactive({
        visible: false,
        title: "",
        flag: false,
        form: {
          institutionName: "",
          institutionImg: "",
          typeId: [],
          institutionType: [],
          institutionPhone: "",
          institutionArea: "",
          institutionAddress: "",
          institutionIntro: "",
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
          keyWord: form.institutionName,
        };
        table.loading = false;
        FindAllInstitution(data)
          .then(function (response) {
            console.log(response.data);
            table.loading = false;
            table.tableData = response.data.pageInfo.list;
            if (form.institutionType) {
              table.tableData = table.tableData.filter(institution => institution.typeId === form.institutionType);
            }
            for (let i = 0; i < table.tableData.length; i++) {
              table.tableData[i].typeId = table.tableData[i].typeId.split(",");
              if (table.tableData[i].institutionImg) {
                table.tableData[i].institutionImg = table.tableData[i].institutionImg.split(",");
              }
              table.tableData[i].typeId.forEach(function (item, index, arr) {
                table.tableData[i].typeId[index] = parseInt(table.tableData[i].typeId[index]);
              });
            }
            pagination.totalRecordCount = response.data.pageInfo.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      const openDiaog = (institution) => {
        console.log(institution)
        if (institution !== 0) {
          institutionDialog.title = "修改服务机构";
          institutionDialog.flag = true;
          institutionDialog.form = institution;
          if (institution.institutionImg) {
            imgName.value = institution.institutionImg.join(',');
          }
          if (institutionDialog.form.institutionArea.indexOf("/") != -1) {
            institutionDialog.form.institutionArea = institutionDialog.form.institutionArea.split('/');
          }
        } else {
          institutionDialog.title = "新增服务机构";
          institutionDialog.flag = false;
          institutionDialog.form = {};
          imgName.value = "未选择任何文件";
        }
        institutionDialog.visible = true;
      };
      const closeDialog = () => {
        console.log('close');
        if (institutionDialog.form.institutionArea.indexOf("/") == -1) {
          institutionDialog.form.institutionArea = institutionDialog.form.institutionArea.join('/');
        }
      }
      const submitInstitution = () => {
        if (institutionDialog.form.institutionArea) {
          institutionDialog.form.institutionArea = institutionDialog.form.institutionArea[0] + '/' + institutionDialog.form
            .institutionArea[1] + '/' + institutionDialog.form.institutionArea[2];
        }
        if (institutionDialog.form.typeId) {
          let names = []
          for (let j = 0; j < institutionDialog.form.typeId.length; j++) {
            for (let i = 0; i < optionList.typeData.length; i++) {
              if (optionList.typeData[i].typeId === institutionDialog.form.typeId[j]) {
                names.push(optionList.typeData[i].typeName);
              }
            }
          }
          institutionDialog.form.institutionType = names;
        }
        institutionDialog.form.typeId = institutionDialog.form.typeId.join(',');
        institutionDialog.form.institutionType = institutionDialog.form.institutionType.join(',');
        if (imgName.value == '未选择任何文件') {
          imgName.value = '';
        }
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()<10 ? '0'+new Date().getMonth() : new Date().getMonth();
        let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
        let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
		    institutionDialog.form.institutionTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        let data = {
          institutionName: institutionDialog.form.institutionName,
          institutionImg: imgName.value,
          typeId: institutionDialog.form.typeId,
          institutionType: institutionDialog.form.institutionType,
          institutionPhone: institutionDialog.form.institutionPhone,
          institutionArea: institutionDialog.form.institutionArea,
          institutionAddress: institutionDialog.form.institutionAddress,
          institutionIntro: institutionDialog.form.institutionIntro,
          institutionTime: institutionDialog.form.institutionTime
        };
        if (institutionDialog.flag) {
          data['institutionId'] = institutionDialog.form.institutionId;
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
          institutionId: institution.institutionId,
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

      //类别
      let optionList = reactive({
        typeData: [],
      });
      const loadType = () => {
        ShowAllType().then(function (response) {
            console.log(response);
            optionList.typeData = response.data;
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
        loadType();
        loadData();
      });

      return {
        form,
        table,
        pagination,
        institutionDialog,

        loadData,
        openDiaog,
        closeDialog,
        submitInstitution,
        deleteData,

        optionList,
        loadType,

        cityList,
        handleCityChange,

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
    width: 100%;
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

  .institutionChange {
    font-style: oblique;
  }

  .institutionImgs {
    height: 40px;
  }

  .institutionImg {
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

  .institutionIntro,
  .institutionType,
  .institutionAddress,
  .institutionName {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .institutionName {
    font-weight: bold;
  }
</style>