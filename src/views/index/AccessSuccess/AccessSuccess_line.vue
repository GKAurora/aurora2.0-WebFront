<template>
  <div id="AccessSuccess_line" style="width: 100%; height: 350px"></div>
</template>
<script>
import API from "../../../api";
export default {
  watch:{
    Siteid:{
      listen(NewSiteid,OldSite){
        this.Siteid=NewSiteid=this.$store.state.SiteId
        this.getData()
      }
    }
  },
  name: "page",
  data() {
    return {
      //所有日期、值
      message: [],
      data2: [],
      dateList: [],
      valueList: [],
      Siteid: this.$store.state.siteMsg.siteId,    //当前站点id
    };
  },
  created() {
    this.getData();
    // this.getAccessSuccess();
  },
  mounted() {
    // this.getData();
  },
  methods: {
    async getData() {
      try {
        const conf = API.sdn.qualityHealth(
          Date.now() - 1000 * 60 * 60 * 24 * parseInt(7),
          Date.now(),
          1,
          this.Siteid
        );
        const sitedata = await this.$axios(conf);
        this.message = sitedata.data.data.values;
        if (sitedata.data.code === 200) {
          this.$message({
            message: "获取数据成功",
            type: "success",
          });
          for (let i = 0; i < this.message.length; i++) {
            let successCon = this.message[i].successCon;
            // let timestamp = this.message[i].timestamp
            let timestamp = new Date(parseInt(this.message[i].timestamp))
              .toLocaleString()
              .replace(/:\d{1,2}$/, " ");
            this.dateList.push(timestamp);
            this.valueList.push(successCon);
          }
          this.dateList.sort();
          this.getAccessSuccess();
        }
      } catch (error) {
        this.$message({
          message: "获取接入成功率数据失败",
          type: "error",
        });
      }
    },
    getAccessSuccess() {
      this.$echarts
        .init(document.getElementById("AccessSuccess_line"))
        .setOption(
          {
            // Make gradient line here
            visualMap: [
              {
                show: false, // 颜色栏
                type: "continuous", // 连续型
                seriesIndex: 0, // 渐变
                min: 0, // 最小值
                max: 100, // 最大值
                range: [0, 100],
                color: ["#5385F5"],
                // color: ['orangered','yellow','lightskyblue']  //线颜色渐变
              },
            ],
            title: [
              {
                left: "8%",
                text: "接入成功率",
                textStyle: {
                  color: "#fff",
                },
              },
            ],
            tooltip: {
              trigger: "axis",
            },
            toolbox: {
              feature: {
                saveAsImage: {}, // 这样子就具备了下载图片功能
                dataZoom: {}, // 区域缩放
                magicType: {
                  // 多种图表切换
                  type: ["bar", "line"],
                },
              },
            },
            xAxis: [
              {
                data: this.dateList,
                boundaryGap: false, //第一个值紧挨在Y轴，默认是与Y轴有距离的
              },
            ],
            yAxis: [{}],
            dataZoom: [
              {
                type: "inside",
                start: 0,
                end: 10,
                top:'50%'
              },
              {
                start: 50,
                end: 10,
              },
            ],
            grid: [
              {
                show: true,
                bottom: "20%", // 大小
                height: "auto",
                width: "auto",
                backgroundColor: "transparent",
                borderColor: "#ccc",
              },
            ],
            series: [
              {
                type: "line",
                showSymbol: false, // 是否显示节点
                data: this.valueList,
                smooth: true, // 是否平滑
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(157,163,179,.8)", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(157,163,179,.2)", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                }, // 区域颜色
              },
            ],
          },
          true
        );
    },
  },
};
</script>
