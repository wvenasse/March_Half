<template>
    <div id="borad">
        <div>
            <el-row :gutter="20">
                <el-col v-for="(d,index) in web_card.data" :key="index" style="width:20%">
                    <el-card shadow="hover">
                        <div slot="header" class="clearfix">
                            <el-tag :type="d.tag_type" effect="dark">{{d.title}}</el-tag>
                        </div>
                        <div>
                            <h2 align="center" style="color: #606266;">{{d.total_num}}</h2>
                            <p align="right" style="color: #909399;"><span>今日</span>：<small>{{d.total_today_num}}</small></p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top:20px">
            <el-card shadow="hover" class="card">
                <div slot="header" class="clearfix">
                    <span>今天数据</span>
                </div>
                <div>
                    <el-row :gutter="20">
                        <el-col :span=16>
                            <div id="myChart" style="width:100%;height:500px"></div>
                        </el-col>
                        <el-col :span=8>
                            <div class="grid-content bg-purple" id="myChart1" style="width:100%;height:500px"></div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div style="margin-top:20px">
            <el-card shadow="hover" class="card">
                <div slot="header" class="clearfix">
                    <span>订单数据</span>
                </div>
                <div>
                    <el-row :gutter="20">
                        <div class="wrapper">
                            <div id="myChart2" class="map-container" style="width: 100%; height: 800px" ref="myEchart">
                            </div>
                        </div>
                    </el-row>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {
        onMounted,
        reactive,
        ref,
        isRef,
        toRefs
    } from "@vue/composition-api";
    import echarts from 'echarts/lib/echarts';
    import "echarts/lib/component/markLine";
    import '@/utils/china.js';
    import {
        ShowAllAdmin
    } from "@/api/Admin";
    import {
        ShowAllUser
    } from "@/api/User";
    import {
        ShowAllService
    } from "@/api/Service";
    import {
        ShowAllInstitution
    } from "@/api/Institution";
    import {
        ShowAllOrder
    } from "@/api/Order";
    export default {
        name: 'borad',
        components: {},
        setup(props, {
            refs,
            root
        }) {
            let web_card = reactive({
                data:[
                    {
                        title:'普通用户',
                        total_num:0,
                        total_today_num:0,
                        tag_type:'success'
                    },
                    {
                        title:'服务人员',
                        total_num:0,
                        total_today_num:0,
                        tag_type:'danger'
                    },
                    {
                        title:'服务机构',
                        total_num:0,
                        total_today_num:0,
                        tag_type:''
                    },
                    {
                        title:'管理人员',
                        total_num:0,
                        total_today_num:0,
                        tag_type:'warning'
                    },
                    {
                        title:'订单数量',
                        total_num:0,
                        total_today_num:0,
                        tag_type:'info'
                    },
                ]
        
            })
            let myChart = reactive({});
            let drawLineData = reactive({
                data:[]
            })
            const drawLine = () => {
                setTimeout(() => {
                    drawLine();
                }, 5000);
                var dataAxis = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
                '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', 
                '20:00', '21:00', '22:00', '23:00'];
                var data = drawLineData.data;
                var yMax = 500;
                var dataShadow = [];

                for (var i = 0; i < data.length; i++) {
                    dataShadow.push(yMax);
                }
                myChart = echarts.init(document.getElementById('myChart'));
                let option = {
                    title: {
                        text: '订单情况'
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "line", // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: dataAxis,
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        },
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        }
                    },
                    dataZoom: [{
                        type: 'inside'
                    }],
                    series: [{
                        type: 'bar',
                        showBackground: false,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [{
                                        offset: 0,
                                        color: '#83bff6'
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#188df0'
                                    },
                                    {
                                        offset: 1,
                                        color: '#188df0'
                                    }
                                ]
                            )
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [{
                                            offset: 0,
                                            color: '#2378f7'
                                        },
                                        {
                                            offset: 0.7,
                                            color: '#2378f7'
                                        },
                                        {
                                            offset: 1,
                                            color: '#83bff6'
                                        }
                                    ]
                                )
                            }
                        },
                        data: data
                    }]
                };

                myChart.setOption(option)

            }
            let myChart1 = reactive({});
            const label_vist = () => {
                myChart1 = echarts.init(document.getElementById('myChart1'));
                myChart1.setOption({
                    title: {
                        text: "用户情况",
                        subtext: "",
                        left: "center",
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                    },
                    legend: {
                        orient: "vertical",
                        left: "left",
                        data: ["管理员", "服务机构", "服务人员", "普通用户"],
                    },
                    series: [{
                        name: "用户类别",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [{
                                value: dataNum.adminToday,
                                name: "管理员"
                            },
                            {
                                value: dataNum.institutionToday,
                                name: "服务机构"
                            },
                            {
                                value: dataNum.serviceToday,
                                name: "服务人员"
                            },
                            {
                                value: dataNum.userToday,
                                name: "普通用户"
                            },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    }, ],
                });
            }
            let myChart2 = reactive({});
            let chinaData = reactive({
                data : [{
                    "name": "北京",
                    "dataCount": [0, 0, 0,0],
                    "id": "247"
                }, {
                    "name": "天津",
                    "dataCount": [0, 0, 0,0],
                    "id": "248"
                }, {
                    "name": "河北",
                    "dataCount": [0, 0, 0,0],
                    "id": "249"
                }, {
                    "name": "山西",
                    "dataCount": [0, 0, 0,0],
                    "id": "250"
                }, {
                    "name": "内蒙古",
                    "dataCount": [0, 0, 0,0],
                    "id": "251"
                }, {
                    "name": "辽宁",
                    "dataCount": [0, 0, 0,0],
                    "id": "252"
                }, {
                    "name": "吉林",
                    "dataCount": [0, 0, 0,0],
                    "id": "253"
                }, {
                    "name": "黑龙江",
                    "dataCount": [0, 0, 0,0],
                    "id": "254"
                }, {
                    "name": "上海",
                    "dataCount": [0, 0, 0,0],
                    "id": "255"
                }, {
                    "name": "江苏",
                    "dataCount": [0, 0, 0,0],
                    "id": "256"
                }, {
                    "name": "浙江",
                    "dataCount": [0, 0, 0,0],
                    "id": "257"
                }, {
                    "name": "安徽",
                    "dataCount": [0, 0, 0,0],
                    "id": "258"
                }, {
                    "name": "福建",
                    "dataCount": [0, 0, 0,0],
                    "id": "259"
                }, {
                    "name": "江西",
                    "dataCount": [0, 0, 0,0],
                    "id": "260"
                }, {
                    "name": "山东",
                    "dataCount": [0, 0, 0,0],
                    "id": "261"
                }, {
                    "name": "河南",
                    "dataCount": [0, 0, 0,0],
                    "id": "262"
                }, {
                    "name": "湖北",
                    "dataCount": [0, 0, 0,0],
                    "id": "263"
                }, {
                    "name": "湖南",
                    "dataCount": [0, 0, 0,0],
                    "id": "264"
                }, {
                    "name": "广东",
                    "dataCount": [0, 0, 0,0],
                    "id": "265"
                }, {
                    "name": "广西",
                    "dataCount": [0, 0, 0,0],
                    "id": "266"
                }, {
                    "name": "海南",
                    "dataCount": [0, 0, 0,0],
                    "id": "267"
                }, {
                    "name": "重庆",
                    "dataCount": [0, 0, 0,0],
                    "id": "268"
                }, {
                    "name": "四川",
                    "dataCount": [0, 0, 0,0],
                    "id": "269"
                }, {
                    "name": "贵州",
                    "dataCount": [0, 0, 0,0],
                    "id": "270"
                }, {
                    "name": "云南",
                    "dataCount": [0, 0, 0,0],
                    "id": "271"
                }, {
                    "name": "西藏",
                    "dataCount": [0, 0, 0,0],
                    "id": "272"
                }, {
                    "name": "陕西",
                    "dataCount": [0, 0, 0,0],
                    "id": "273"
                }, {
                    "name": "甘肃",
                    "dataCount": [0, 0, 0,0],
                    "id": "274"
                }, {
                    "name": "青海",
                    "dataCount": [0, 0, 0,0],
                    "id": "275"
                }, {
                    "name": "宁夏",
                    "dataCount": [0, 0, 0,0],
                    "id": "276"
                }, {
                    "name": "新疆",
                    "dataCount": [0, 0, 0,0],
                    "id": "277"
                }, {
                    "name": "台湾",
                    "dataCount": [0, 0, 0,0],
                    "id": "278"
                }, {
                    "name": "香港",
                    "dataCount": [0, 0, 0,0],
                    "id": "279"
                }, {
                    "name": "澳门",
                    "dataCount": [0, 0, 0,0],
                    "id": "280"
                }]
            })
            const chinaMap = () => {
                let data = chinaData.data;
                console.log(data)
                let chinaGeoCoordMap = {
                    '黑龙江': [127.9688, 45.368, 1],
                    '内蒙古': [110.3467, 41.4899, 1],
                    '吉林': [125.8154, 44.2584, 1],
                    '北京': [116.4551, 40.2539, 2],
                    '辽宁': [123.1238, 42.1216, 1],
                    '河北': [114.4995, 38.1006, 1],
                    '天津': [117.4219, 39.4189, 1],
                    '山西': [112.3352, 37.9413, 1],
                    '陕西': [109.1162, 34.2004, 1],
                    '甘肃': [103.5901, 36.3043, 1],
                    '宁夏': [106.3586, 38.1775, 1],
                    '青海': [101.4038, 36.8207, 1],
                    '新疆': [87.9236, 43.5883, 1],
                    '西藏': [91.11, 29.97, 1],
                    '四川': [103.9526, 30.7617, 1],
                    '重庆': [108.384366, 30.439702, 1],
                    '山东': [117.1582, 36.8701, 1],
                    '河南': [113.4668, 34.6234, 1],
                    '江苏': [118.8062, 31.9208, 1],
                    '安徽': [117.29, 32.0581, 1],
                    '湖北': [114.3896, 30.6628, 1],
                    '浙江': [119.5313, 29.8773, 1],
                    '福建': [119.4543, 25.9222, 1],
                    '江西': [116.0046, 28.6633, 1],
                    '湖南': [113.0823, 28.2568, 1],
                    '贵州': [106.6992, 26.7682, 1],
                    '云南': [102.9199, 25.4663, 1],
                    '广东': [113.12244, 23.009505, 1],
                    '广西': [108.479, 23.1152, 1],
                    '海南': [110.3893, 19.8516, 1],
                    '上海': [121.4648, 31.2891, 1],
                    '台湾': [120.991676054688, 24.7801149726563, 1],
                    '澳门': [113.33, 22.11, 1],
                    '香港': [114.15, 22.15, 1]
                }
                for (let i = 0; i < data.length; i++) {
                    var da = chinaGeoCoordMap[data[i].name];
                    chinaGeoCoordMap[data[i].name] = [...da, ...data[i].dataCount];
                }
                let chinaDatas = [
                    [{
                        name: '北京',
                        value: 2
                    }],
                    [{
                        name: '黑龙江',
                        value: 1
                    }],
                    [{
                        name: '内蒙古',
                        value: 1
                    }],
                    [{
                        name: '吉林',
                        value: 1
                    }],
                    [{
                        name: '辽宁',
                        value: 1
                    }],
                    [{
                        name: '河北',
                        value: 1
                    }],
                    [{
                        name: '天津',
                        value: 1
                    }],
                    [{
                        name: '山西',
                        value: 1
                    }],
                    [{
                        name: '陕西',
                        value: 1
                    }],
                    [{
                        name: '甘肃',
                        value: 1
                    }],
                    [{
                        name: '宁夏',
                        value: 1
                    }],
                    [{
                        name: '青海',
                        value: 1
                    }],
                    [{
                        name: '新疆',
                        value: 1
                    }],
                    [{
                        name: '西藏',
                        value: 1
                    }],
                    [{
                        name: '四川',
                        value: 1
                    }],
                    [{
                        name: '重庆',
                        value: 1
                    }],
                    [{
                        name: '山东',
                        value: 1
                    }],
                    [{
                        name: '河南',
                        value: 1
                    }],
                    [{
                        name: '江苏',
                        value: 1
                    }],
                    [{
                        name: '安徽',
                        value: 1
                    }],
                    [{
                        name: '湖北',
                        value: 1
                    }],
                    [{
                        name: '浙江',
                        value: 1
                    }],
                    [{
                        name: '福建',
                        value: 1
                    }],
                    [{
                        name: '江西',
                        value: 1
                    }],
                    [{
                        name: '湖南',
                        value: 1
                    }],
                    [{
                        name: '贵州',
                        value: 1
                    }],
                    [{
                        name: '广东',
                        value: 1
                    }],
                    [{
                        name: '广西',
                        value: 1
                    }],
                    [{
                        name: '云南',
                        value: 1
                    }],
                    [{
                        name: '海南',
                        value: 1
                    }],
                    [{
                        name: '上海',
                        value: 1
                    }],
                    [{
                        name: '台湾',
                        value: 1
                    }],
                    [{
                        name: '澳门',
                        value: 1
                    }],
                    [{
                        name: '香港',
                        value: 1
                    }]
                ]
                let convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var dataItem = data[i];
                        var fromCoord = [chinaGeoCoordMap[dataItem[0].name][0], chinaGeoCoordMap[dataItem[0]
                            .name][1]];
                        var toCoord = [119.5313, 29.8773];
                        if (fromCoord && toCoord) {
                            res.push([{
                                coord: fromCoord,
                                value: dataItem[0].value
                            }, {
                                coord: toCoord,
                            }]);
                        }
                    }
                    return res;
                };
                let seriesA = []
                seriesA.push({
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.3, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'pin', //箭头图标
                            symbolSize: 8, //图标大小
                            color: '#2a6fd9'
                        },
                        lineStyle: {
                            normal: {
                                color: '#003262',
                                width: 1, //尾迹线条宽度
                                opacity: .9, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        data: convertData(chinaDatas)
                    }, {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: { // 涟漪特效
                            period: 2, // 动画时间，值越小速度越快
                            brushType: 'fill', // 波纹绘制方式 stroke, fill
                            scale: 6, // 波纹圆环最大限制，值越大波纹越大
                            color: '#003262' // 涟漪的颜色，默认为散点的颜色。
                        },
                        label: {
                            normal: {
                                show: true,
                                color: '#ffffff', //283c64
                                position: 'top', // 显示位置
                                offset: [0, 0], // 偏移设置
                                formatter: function (params) { // 圆环显示文字
                                    return params.data.name
                                },
                                fontSize: 15
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'circle',
                        symbolSize: function (val) {
                            return 1 + val[2] * 5 // 圆环大小
                        },
                        itemStyle: {
                            color: "#2a6fd9",
                            shadowBlur: 4,
                            shadowColor: "#2a6fd9",
                        },
                        data: chinaDatas.map(function (dataItem) {
                            return {
                                name: dataItem[0].name,
                                value: chinaGeoCoordMap[dataItem[0].name],
                                itemStyle: {
                                    color: "#2a6fd9",
                                    shadowBlur: 4,
                                    shadowColor: "#2a6fd9",
                                }
                            }
                        })
                    },
                    //被攻击点
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                color: 'red',
                                formatter: '{b}',
                                textStyle: {
                                    color: "red"
                                }
                            },
                            emphasis: {
                                show: true,
                                color: "red"
                            }
                        },
                        symbol: 'pin',
                        symbolSize: 0,
                        data: [{
                            name: '浙江',
                            value: chinaGeoCoordMap['浙江'].concat([10]),
                        }],
                    }
                );

                let option = {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        backgroundColor: '#000', //2e65fd
                        borderColor: '#5ea8ff', //FFFFCC
                        showDelay: 0,
                        hideDelay: 0,
                        enterable: true,
                        transitionDuration: 0,
                        extraCssText: 'z-index:100',
                        formatter: function (params, ticket, callback) {
                            console.log(params)
                            // 根据业务自己拓展要显示的内容
                            var res = ''
                            var name = params.name
                            var value1 = params.value[params.seriesIndex + 2] || 0
                            var value2 = params.value[params.seriesIndex + 3] || 0
                            var value3 = params.value[params.seriesIndex + 4] || 0
                            var value4 = params.value[params.seriesIndex + 5] || 0
                            res = "<span style='color:#fff'>" + name + '</span>' +
                                '<br/>' +
                                '<i class="icon icon-user"></i> 普通用户：' + value1 +
                                '<br/>' +
                                '<i class="icon icon-service"></i> 服务人员：' + value2 +
                                '<br/>' +
                                '<i class="icon icon-institution"></i> 服务机构：' + value3 +
                                '<br/>' +
                                '<i class="icon icon-order"></i> 订单：' + value4
                            return res
                        }
                    },
                    regions: [
                        //隐藏南海
                        {
                            name: "南海诸岛",
                            itemStyle: {
                                normal: {
                                    borderColor: "red",
                                    borderWidth: 20, //设置外层边框
                                    opacity: 0, // 为 0 时不绘制该图形
                                },
                            },
                            label: {
                                show: false, // 隐藏文字
                            },
                        },
                    ],
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    geo: {
                        map: 'china',
                        zoom: 1.2,
                        label: {
                            normal: {
                                color: '#1e2d4c'
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        roam: false, // 是否允许缩放
                        itemStyle: {
                            normal: {
                                //地图便框设置
                                borderColor: "#003262",
                                borderWidth: 11, //设置外层边框
                            },
                            emphasis: {
                                areaColor: "#003262",
                                shadowColor: "#003262",
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#00467F', // 地图背景色
                                borderColor: '#5ea8ff', // 省市边界线00fcff 516a89
                                borderWidth: 1
                            },
                            emphasis: {
                                color: '#031525' // 悬浮背景
                            }
                            // 81acff
                        }
                    },
                    series: seriesA
                }
                myChart2 = echarts.init(document.getElementById('myChart2'));
                myChart2.setOption(option);
            }

            let dataNum = reactive({
                adminNum: 0,
                adminToday: 0,
                userNum: 0,
                userToday: 0,
                serviceNum: 0,
                serviceToday: 0,
                institutionNum: 0,
                institutionToday: 0,
                orderNum: 0,
                orderToday: 0,
            });
            let dataList = reactive({
                adminList: [],
                userList: [],
                serviceList: [],
                institutionList: [],
                orderList: []
            });
            const loadData = () => {
                let yy = new Date().getFullYear();
                let m = new Date().getMonth() + 1;
                let mm = m < 10 ? '0' + m : m;
                let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
                let today = yy + '-' + mm + '-' + dd;
                ShowAllAdmin()
                    .then(function (response) {
                        console.log(response.data);
                        dataList.adminList = response.data;
                        dataNum.adminNum = response.data.length;

                        let todayNum = 0;
                        for (let i = 0; i < response.data.length; i++) {
                            if (response.data[i].rootTime.split(' ')[0] == today) {
                                todayNum++;
                            }
                        }
                        web_card.data[3].total_today_num = todayNum;
                        dataNum.adminToday = todayNum;
                        web_card.data[3].total_num = response.data.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                ShowAllUser()
                    .then(function (response) {
                        console.log(response.data);
                        dataList.userList = response.data;
                        dataNum.userNum = response.data.length;

                        let todayNum = 0;
                        for (let i = 0; i < response.data.length; i++) {
                            for (let j=0;j<chinaData.data.length;j++) {
                                if (chinaData.data[j].name == response.data[i].userArea.split('/')[0]) {
                                    chinaData.data[j].dataCount[0]++;
                                }
                            }
                            if (response.data[i].userTime.split(' ')[0] == today) {
                                todayNum++;
                            }
                        }
                        web_card.data[0].total_today_num = todayNum;
                        dataNum.userToday = todayNum;
                        web_card.data[0].total_num = response.data.length;

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                ShowAllService()
                    .then(function (response) {
                        console.log(response.data);
                        dataList.serviceList = response.data;
                        dataNum.serviceNum = response.data.length;

                        let todayNum = 0;
                        for (let i = 0; i < response.data.length; i++) {
                            for (let j=0;j<chinaData.data.length;j++) {
                                if (chinaData.data[j].name == response.data[i].serviceAddress.split('/')[0]) {
                                    chinaData.data[j].dataCount[1]++;
                                }
                            }
                            if (response.data[i].serviceTime.split(' ')[0] == today) {
                                todayNum++;
                            }
                        }
                        web_card.data[1].total_today_num = todayNum;
                        dataNum.serviceToday = todayNum;
                        web_card.data[1].total_num = response.data.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                ShowAllInstitution()
                    .then(function (response) {
                        console.log(response.data);
                        dataList.institutionList = response.data;
                        dataNum.institutionNum = response.data.length;

                        let todayNum = 0;
                        for (let i = 0; i < response.data.length; i++) {
                            for (let j=0;j<chinaData.data.length;j++) {
                                if (chinaData.data[j].name == response.data[i].institutionArea.split('/')[0]) {
                                    chinaData.data[j].dataCount[2]++;
                                }
                            }
                            if (response.data[i].institutionTime.split(' ')[0] == today) {
                                todayNum++;
                            }
                        }
                        web_card.data[2].total_today_num = todayNum;
                        dataNum.institutionToday = todayNum;
                        web_card.data[2].total_num = response.data.length;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                ShowAllOrder()
                    .then(function (response) {
                        console.log(response.data);
                        dataList.orderList = response.data;
                        dataNum.orderNum = response.data.length;

                        let todayNum = 0;
                        let orderToday = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                        for (let i = 0; i < response.data.length; i++) {
                            for (let j=0;j<chinaData.data.length;j++) {
                                if (chinaData.data[j].name == response.data[i].orderArea.split('/')[0]) {
                                    chinaData.data[j].dataCount[3]++;
                                }
                            }
                            if (response.data[i].orderTime.split(' ')[0] == today) {
                                todayNum++;
                                orderToday[parseInt(response.data[i].orderTime.split('-')[2].split(' ')[1].split(':')[0])]++;
                            }
                            
                        }
                        drawLineData.data = orderToday;

                        web_card.data[4].total_today_num = todayNum;
                        dataNum.orderToday = todayNum;
                        web_card.data[4].total_num = response.data.length;
                        drawLine();
                        label_vist();
                        chinaMap();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            
            }

            onMounted(() => {
                loadData();
                window.onresize = function () {
                    myChart.resize();
                    myChart1.resize();
                    myChart2.resize();
                }
            });
            return {
                web_card,

                myChart,
                drawLine,
                drawLineData,
                myChart1,
                label_vist,
                myChart2,
                chinaData,
                chinaMap,

                dataNum,
                dataList,
                loadData
            }
        }
    }
</script>

<style scoped>
    #borad {
        background-color: transparent;
        height: 100%;
    }

    #cycle {
        width: 30px;
        height: 25px;
        float: right;
        border-radius: 3px;
        color: white;
        padding-left: 10px;
    }

    .card {
        min-height: 50vh;
    }

    #data_show {
        width: 100%;
        min-height: 300px;
    }
</style>