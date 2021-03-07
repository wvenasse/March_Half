<template>
  <div id="service">
    <el-container style="height: 100%">
      <el-header style="height: auto">
        <el-row class="toolbar" style="height: auto;">
          <el-col :span="20">
            <el-form :inline="true" size="small">
              <el-form-item style="width:120px;">
                <el-select size="small" v-model="form.serviceType" placeholder="服务类别" clearable @change="loadData">
                  <el-option v-for="type in optionList.typeData" :key="type.typeId" :label="type.typeName"
                    :value="type.typeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-left: 10px; width:150px;">
                <el-input placeholder="请输入服务人员名称" v-model="form.serviceName" clearable>
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
          <el-table-column prop="serviceId" label="序号" width="50"></el-table-column>
          <el-table-column prop="serviceName" label="人员姓名" width="100" align="center">
            <template slot-scope="scope">
              <span class="serviceName">{{scope.row.serviceName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceIcon" label="人员图片" width="100" align="center">
            <template slot-scope="scope">
              <!-- ../../assets/imgs/Upload/ -->
              <img class="serviceIcon" :src="require('../../../../march_half_wx/pages/image/'+scope.row.serviceIcon)"
                :alt="scope.row.serviceIcon" v-if="scope.row.serviceIcon">
            </template>

            <template slot-scope="scope">
              <div style="display:flex;justify-content: center;">
                <div class="serviceIcons" v-for="(img,index) in scope.row.serviceIcon" :key="index">
                  <img class="serviceIcon" :src="require('../../../../march_half_wx/pages/image/'+ img)"
                  :alt="img" v-if="index<2" @click="openImgPreDialog(scope.row.serviceIcon)">
                  <div class="imgNum" v-if="index===1 && scope.row.serviceIcon.length>2">+{{scope.row.serviceIcon.length}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="serviceType" label="服务类别" width="80" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.serviceType" placement="bottom-start">
                <span class="serviceType">{{scope.row.serviceType}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="serviceInstitution" label="所属机构" width="80" align="center">
             <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.serviceInstitution" placement="bottom-start">
                <span class="serviceInstitution">{{scope.row.serviceInstitution}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="serviceSfz" label="身份证" width="150" align="center"></el-table-column>
          <el-table-column prop="servicePhone" label="电话号码" width="100" align="center"></el-table-column>
          <el-table-column prop="serviceAddress" label="户籍" width="120" align="center"></el-table-column>
          <el-table-column prop="serviceIntro" label="介绍" min-width="150" align="center">
             <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.serviceIntro" placement="bottom-start">
                <span class="serviceIntro">{{scope.row.serviceIntro}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="servicePrice" label="时薪" width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.servicePrice ? scope.row.servicePrice:0}}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceYear" label="经验" width="50" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.serviceYear ? scope.row.serviceYear:0}}年</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceOrder" label="订单" width="50" align="center">
            <template slot-scope="scope">
              <span class="serviceChange">{{scope.row.serviceOrder ? scope.row.serviceOrder:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceStar" label="星级" width="150" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" :content="scope.row.serviceStar+''" placement="bottom">
                <el-rate
                  v-model="scope.row.serviceStar"
                  disabled
                  text-color="#ff9900">
                </el-rate>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="serviceEva" label="评价" width="50" align="center">
            <template slot-scope="scope">
              <span class="serviceChange">{{scope.row.serviceEva ? scope.row.serviceEva:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceLike" label="点赞" width="50" align="center">
            <template slot-scope="scope">
              <span class="serviceChange">{{scope.row.serviceLike ? scope.row.serviceLike:0}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceLove" label="收藏" width="50" align="center">
            <template slot-scope="scope">
              <span class="serviceChange">{{scope.row.serviceLove ? scope.row.serviceLove:0}}</span>
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
    <el-dialog :title="serviceDialog.title" :visible.sync="serviceDialog.visible" :append-to-body="true"
      @close="closeDialog">
      <el-form :model="serviceDialog.form">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="服务人员姓名" prop="serviceName" :label-width="serviceDialog.formLabelWidth">
              <el-input v-model="serviceDialog.form.serviceName" clearable autocomplete="off" style="width:217px;">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务人员图片" prop="serviceIcon" :label-width="serviceDialog.formLabelWidth">
              <form action="" name="file" class="file">
                上传文件
                <input type="file" id="saveImage" name="myphoto" multiple="multiple" @change="tirggerFile($event)" accept="image/*"
                  ref="new_image" v-if="serviceDialog.visible">
              </form>
              <div class="fileName">{{imgName}}</div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="服务类别" prop="typeId" :label-width="serviceDialog.formLabelWidth">
              <el-select v-model="serviceDialog.form.typeId" clearable multiple collapse-tags placeholder="请选择">
                <el-option v-for="type in optionList.typeData" :key="type.typeId" :label="type.typeName"
                  :value="type.typeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属机构" prop="institutionId" :label-width="serviceDialog.formLabelWidth">
              <el-select v-model="serviceDialog.form.institutionId" clearable placeholder="请选择">
                <el-option v-for="institution in optionList.institutionData" :key="institution.institutionId" :label="institution.institutionName"
                  :value="institution.institutionId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="身份证" prop="serviceSfz" :label-width="serviceDialog.formLabelWidth">
              <el-input v-model="serviceDialog.form.serviceSfz" clearable autocomplete="off" style="width:217px;">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码" prop="servicePhone" :label-width="serviceDialog.formLabelWidth">
              <el-input v-model="serviceDialog.form.servicePhone" clearable autocomplete="off" style="width:217px;">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="服务区域" prop="serviceAddress" :label-width="serviceDialog.formLabelWidth">
              <el-cascader v-model="serviceDialog.form.serviceAddress" clearable :options="cityList"
                @change="handleCityChange">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经验" prop="serviceYear" :label-width="serviceDialog.formLabelWidth">
              <el-input-number v-model="serviceDialog.form.serviceYear" :min="0" :max="50"></el-input-number>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="时薪" prop="servicePrice" :label-width="serviceDialog.formLabelWidth">
              <el-input-number v-model="serviceDialog.form.servicePrice" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="serviceIntro" label="介绍" :label-width="serviceDialog.formLabelWidth">
              <el-input type="textarea" placeholder="请输入介绍" v-model="serviceDialog.form.serviceIntro" maxlength="50"
                show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="serviceDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitService">确 定</el-button>
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
  import request from "@/utils/request";
  import city from "@/utils/city"
  import {
    UpdateService,
    AddService,
    DelService,
    FindAllService
  } from "@/api/Service";
  import {
    ShowAllType
  } from "@/api/Type";
  import {
    ShowAllInstitution,
    UpdateInstitutionServiceNum
  } from "@/api/Institution";
  import {
    addImage
  } from "@/api/System"

  export default {
    name: "service",
    setup(props, {
      refs,
      root
    }) {
      let form = reactive({
        serviceName: "",
        serviceType: "",
      });
      let serviceDialog = reactive({
        visible: false,
        title: "",
        flag: false,
        form: {
          serviceName: "",
          serviceIcon: "",
          typeId: [],
          serviceType: [],
          institutionId: "",
          serviceInstitution: "",
          serviceSfz: "",
          servicePhone: "",
          serviceAddress: "",
          serviceIntro: "",
          serviceYear: 0,
          servicePrice:0
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
          keyWord: form.serviceName,
        };
        table.loading = false;
        FindAllService(data)
          .then(function (response) {
            console.log(response.data);
            table.loading = false;
            table.tableData = response.data.pageInfo.list;
            if (form.serviceType) {
              table.tableData = table.tableData.filter(service => {
                let type = service.typeId;
                type = type.split(',');
                return type.indexOf(form.serviceType.toString()) !== -1
              });
            }
            for (let i = 0; i < table.tableData.length; i++) {
              table.tableData[i].typeId = table.tableData[i].typeId.split(",");
              if (table.tableData[i].serviceIcon) {
                table.tableData[i].serviceIcon = table.tableData[i].serviceIcon.split(",");
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
      const openDiaog = (service) => {
        console.log(service)
        if (service !== 0) {
          serviceDialog.title = "修改服务人员";
          serviceDialog.flag = true;
          serviceDialog.form = service;
          imgName.value = service.serviceIcon;
          if (service.serviceIcon) {
            imgName.value = service.serviceIcon.join(',');
          }
          if (serviceDialog.form.serviceAddress.indexOf("/") != -1) {
            serviceDialog.form.serviceAddress = serviceDialog.form.serviceAddress.split('/');
          }
        } else {
          serviceDialog.title = "新增服务人员";
          serviceDialog.flag = false;
          serviceDialog.form = {};
          imgName.value = "未选择任何文件";
        }
        serviceDialog.visible = true;
      };
      const closeDialog = () => {
        if (serviceDialog.form.serviceAddress.indexOf("/") == -1) {
          serviceDialog.form.serviceAddress = serviceDialog.form.serviceAddress.join('/');
        }
      }
      const submitService = () => {
        if (serviceDialog.form.serviceAddress) {
          serviceDialog.form.serviceAddress = serviceDialog.form.serviceAddress[0] + '/' + serviceDialog.form
            .serviceAddress[1] + '/' + serviceDialog.form.serviceAddress[2];
        }
        if (serviceDialog.form.typeId) {
          let names = []
          for (let j = 0; j < serviceDialog.form.typeId.length; j++) {
            for (let i = 0; i < optionList.typeData.length; i++) {
              if (optionList.typeData[i].typeId === serviceDialog.form.typeId[j]) {
                names.push(optionList.typeData[i].typeName);
              }
            }
          }
          serviceDialog.form.serviceType = names;
        }
        serviceDialog.form.typeId = serviceDialog.form.typeId.join(',');
        serviceDialog.form.serviceType = serviceDialog.form.serviceType.join(',');
        if (serviceDialog.form.institutionId) {
          for (let i = 0; i < optionList.institutionData.length; i++) {
            if (optionList.institutionData[i].institutionId === serviceDialog.form.institutionId) {
              serviceDialog.form.serviceInstitution = optionList.institutionData[i].institutionName;
            }
          }
        }
        if (imgName.value == '未选择任何文件') {
          imgName.value = '';
        }
        let yy = new Date().getFullYear();
        let m = new Date().getMonth() + 1;
        let mm = m < 10 ? '0' + m : m;
        let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
        let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
		    serviceDialog.form.serviceTime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        let data = {
          serviceName: serviceDialog.form.serviceName,
          serviceIcon: imgName.value,
          typeId: serviceDialog.form.typeId,
          serviceType: serviceDialog.form.serviceType,
          institutionId: serviceDialog.form.institutionId,
          serviceInstitution: serviceDialog.form.serviceInstitution,
          serviceSfz: serviceDialog.form.serviceSfz,
          servicePhone: serviceDialog.form.servicePhone,
          serviceAddress: serviceDialog.form.serviceAddress,
          serviceIntro: serviceDialog.form.serviceIntro,
          serviceYear: serviceDialog.form.serviceYear,
          servicePrice:  serviceDialog.form.servicePrice,
          serviceTime: serviceDialog.form.serviceTime
        };
        if (serviceDialog.flag) {
          data['serviceId'] = serviceDialog.form.serviceId;
          UpdateService(data)
            .then(function (response) {
              console.log(response);
              root.$message({
                type: "success",
                message: response.data.msg,
              });
              loadData();
              updateInstitutionService(data);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          AddService(data)
            .then(function (response) {
              console.log(response);
              root.$message({
                type: "success",
                message: response.data.msg,
              });
              loadData();
              updateInstitutionService(data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        serviceDialog.visible = false;
      };
      const deleteData = (service) => {
        let data = {
          serviceId: service.serviceId,
        };
        root
          .$confirm("此操作将永久删除该服务人员, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            DelService(data)
              .then(function (response) {
                console.log(response);
                loadData();
                updateInstitutionService(service);
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

      //类别、机构
      let optionList = reactive({
        typeData: [],
        institutionData:[]
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
      const loadInstitution = () => {
        ShowAllInstitution().then(function (response) {
            console.log(response);
            optionList.institutionData = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      const updateInstitutionService = (service) => {
        let data = {
          institutionId:service.institutionId
        };
        UpdateInstitutionServiceNum(data)
            .then(function (response) {
              console.log(response.data);
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
        loadInstitution();
      });

      return {
        form,
        table,
        pagination,
        serviceDialog,

        loadData,
        openDiaog,
        closeDialog,
        submitService,
        deleteData,

        optionList,
        loadType,
        loadInstitution,
        updateInstitutionService,

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
  #service {
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

  .serviceChange {
    font-style: oblique;
  }

  .serviceName {
    font-weight: bold;
  }

  .serviceIcons {
    height: 40px;
  }

  .serviceIcon {
    height: 40px;
    width: 40px;
    max-height: 100%;
    max-width: 100%;
    border-radius: 50%;
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
    border-radius: 50%;
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

  .serviceIntro,
  .serviceType,
  .serviceInstitution {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>