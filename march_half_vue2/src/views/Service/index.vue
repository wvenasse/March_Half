<template>
  <div id="service">
    <el-container style="height: 100%">
      <el-header style="height: auto">
        <el-row class="toolbar" style="height: auto">
          <el-col :span="20">
            <el-form :inline="true" size="small">
              <el-form-item>
                <el-input
                  placeholder="请输入服务人员名称"
                  v-model="form.serviceName"
                  clearable
                >
                </el-input>
              </el-form-item>
              <el-form-item style="margin-left: 10px">
                <el-button
                  icon="el-icon-search"
                  size="small"
                  type="primary"
                  @click="loadData"
                  >查询
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button type="primary" size="small" @click="openDiaog(0)"
              >新增</el-button
            >
            <el-button
              title="刷新表格"
              icon="el-icon-refresh"
              size="small"
              circle
              @click="loadData"
            >
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
          <el-table-column prop="serviceId" label="序号" width="50"></el-table-column>
          <el-table-column prop="serviceName" label="人员名称" width="100" align="center"></el-table-column>
          <el-table-column prop="serviceIcon" label="人员图片" width="80" align="center">
            <template slot-scope="scope">
              <img class="serviceIcon" :src=imgUrl+scope.row.serviceIcon alt="人员图片" v-if="scope.row.serviceIcon">
            </template>
          </el-table-column>
          <el-table-column prop="serviceType" label="服务类别" min-width="80" align="center"></el-table-column>
          <el-table-column prop="serviceSfz" label="身份证" width="120" align="center"></el-table-column>
          <el-table-column prop="servicePhone" label="电话号码" width="100" align="center"></el-table-column>
          <el-table-column prop="serviceAddress" label="地址" width="150" align="center"></el-table-column>
          <el-table-column prop="serviceIntro" label="介绍" width="150" align="center">
            <template slot-scope="scope">
              <span class="serviceIntro">{{scope.row.serviceIntro}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="serviceYear" label="经验" width="80" align="center"></el-table-column>
          <el-table-column prop="serviceLike" label="点赞" width="80" align="center"></el-table-column>
          <el-table-column prop="serviceLove" label="收藏" width="80" align="center"></el-table-column>
          <el-table-column prop="serviceEva" label="评价" width="80" align="center"></el-table-column>
          <el-table-column prop="serviceStar" label="星级" width="80" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="180px">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="openDiaog(scope.row)"
                >修改信息</el-button
              >
              <el-button
                @click="deleteData(scope.row)"
                size="small"
                type="text"
                class="danger"
                style="color: red"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer style="height: 34px">
        <el-pagination
          small
          background
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageIndex"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalRecordCount"
        >
        </el-pagination>
      </el-footer>
    </el-container>
    <el-dialog
      :title="serviceDialog.title"
      :visible.sync="serviceDialog.visible"
      :append-to-body="true"
    >
      <el-form :model="serviceDialog.form">
        serviceType: "",
        serviceAddress:"",

        serviceSfz:"",
        servicePhone:"",
        
        serviceIntro:"",
        serviceYear:0,
        serviceLike:0,
        serviceLove:0,

        serviceEva:0,
        serviceStar:0
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="服务人员名称"  >
              <el-input disabled v-model="serviceDialog.form.serviceName" autocomplete="off" v-if="serviceDialog.flag"></el-input>
              <el-input v-model="serviceDialog.form.serviceName" autocomplete="off" v-else ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告图片"  prop="serviceIcon">
              <form action="" name="file" class="file">
                  上传文件
                  <input type="file" id="saveImage" name="myphoto" @change="tirggerFile($event)" accept="image/*" ref="new_image" v-if="serviceDialog.visible">
              </form>
              <div>{{imgName}}</div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="服务人员类别" >
              <el-select v-model="serviceDialog.form.serviceType" clearable multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
                <el-option
                  v-for="type in typeList"
                  :key="type.typeId"
                  :label="type.typeName"
                  :value="type.typeName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务人员地址" prop="serviceIcon">
             
            </el-form-item>
          </el-col>
        </el-form-item>

        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="serviceDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitService">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "@vue/composition-api";
import request from "@/utils/request";
import { UpdateService, AddService, DelService, FindAllService } from "@/api/Service";
export default {
  name: "service",
  setup(props, { refs, root }) {
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
        serviceIcon:"",
        serviceType: "",
        serviceSfz:"",
        servicePhone:"",
        serviceAddress:"",
        serviceIntro:"",
        serviceYear:0,
        serviceLike:0,
        serviceLove:0,
        serviceEva:0,
        serviceStar:0
      },
      formLabelWidth: "120px",
    });
    let typeList = [{typeId:1,typeName:'月嫂服务'},
                    {typeId:2,typeName:'保姆服务'},
                    {typeId:3,typeName:'母乳服务'},
                    {typeId:4,typeName:'育婴服务'},
                    {typeId:5,typeName:'综合维修'},
                    {typeId:6,typeName:'钟点工'},
                    {typeId:7,typeName:'衣物清洗'},
                    {typeId:8,typeName:'保洁服务'},
                    {typeId:9,typeName:'空气检测'},
                    {typeId:10,typeName:'助老服务'},
                    {typeId:11,typeName:'心理服务'},
                    {typeId:12,typeName:'装修装饰'},
                    {typeId:13,typeName:'花卉养殖'},
                    {typeId:14,typeName:'涉外服务'},
                    {typeId:15,typeName:'按摩保健'},
                    {typeId:16,typeName:'陪护服务'},
                    {typeId:17,typeName:'家电清洗'},
                    {typeId:18,typeName:'养老机构'},
                    {typeId:19,typeName:'高端服务'},
                    {typeId:20,typeName:'其他'}];
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
        table.tableData = [
          {serviceId:1,
        serviceName:'wsh',
        serviceIcon:"",
        serviceType: "月嫂服务",
        serviceSfz:"33068119981224",
        servicePhone:"17342018223",
        serviceAddress:"浙江省杭州市拱墅区",
        serviceIntro:"从业多年，经验丰富，素质良好",
        serviceYear:10,
        serviceLike:10,
        serviceLove:5,
        serviceEva:100,
        serviceStar:10},
        ]
        pagination.totalRecordCount = 1;
    };
    const openDiaog = (service) => {
      if (service !== 0) {
        serviceDialog.title = "修改服务人员";
        serviceDialog.flag = true;
        serviceDialog.form = service;
      } else {
        serviceDialog.title = "新增服务人员";
        serviceDialog.flag = false;
        serviceDialog.form = {};
      }
      serviceDialog.visible = true;
    };
    const submitService = () => {
      if (serviceDialog.flag) {
        let data = {
          serviceName: serviceDialog.form.serviceName,
          serviceType: serviceDialog.form.serviceType,
        };
        UpdateService(data)
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
          serviceName: serviceDialog.form.serviceName,
          serviceType: serviceDialog.form.serviceType,
        };
        AddService(data)
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
      serviceDialog.visible = false;
    };
    const deleteData = (service) => {
      let data = {
        rootId: service.rootId,
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

    

    onMounted(() => {
      loadData();
    });

    return {
      form,
      table,
      pagination,
      serviceDialog,

      loadData,
      openDiaog,
      submitService,
      deleteData,

      handleCurrentChange,
      handlePageSizeChange,

      formData,
      imgName,
      imgUrl,
      tirggerFile
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
  max-height: 100%;
  max-width: 100%;
}


.serviceIntro {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>