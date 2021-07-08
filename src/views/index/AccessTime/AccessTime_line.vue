<template>
  <div id="AccessTime_line" style="width: 100%; height: 350px"></div>
</template>
<script>
import { mapState } from "vuex";
import API from "../../../api";
export default {
  computed: {
    ...mapState(["timeFrame"]),
  },
  //监听父组件修改了时间，得到新的时间戳，更新到子组件的时间戳，重新发起请求
  watch: {
    timeFrame: {
      handler(newtime, oldtime) {
        this.startime = newtime[0];
        this.endtime = newtime[1];
        this.dataList = [];
        this.valueList = [];
        this.getData();
      },
    },
  },
  name: "page",
  data() {
    return {
      message: [],
      dataList: [],
      valueList: [],
      Siteid:
        this.$store.state.siteMsg.siteId == "/"
          ? "857b706e-67d9-49c0-b3cd-4bd1e6963c07"
          : this.$store.state.siteMsg.siteId, //当前站点id
      startime:
        this.$store.state.timeFrame[0] || Date.now() - 1000 * 60 * 60 * 24 * 7,
      endtime: this.$store.state.timeFrame[1] || Date.now(),
    };
  },
  created() {
    // this.getSite();
    // this.getData();
    //自适应
    window.addEventListener("resize", () => {
      this.$echarts.init(document.getElementById("AccessTime_line")).resize();
    });
  },
  mounted() {},
  methods: {
    async getData() {
      try {
        const conf = API.sdn.qualityHealth(
          this.startime,
          this.endtime,
          1,
          this.Siteid
        );
        const sitedata = await this.$axios(conf);
        if (sitedata.data.data == null) {
          return;
        }
        this.message = sitedata.data.data.values;
        console.log(this.message);
        for (let i = 0; i < this.message.length; i++) {
          let timeCon = this.message[i].timeCon;
          let timestamp = new Date(parseInt(this.message[i].timestamp))
            .toLocaleString()
            .replace(/:\d{1,2}$/, " ");
          this.dataList.push(timestamp);
          this.valueList.push(timeCon);
        }
        this.dataList.sort();
        this.getAccessSuccess();
      } catch (error) {
        this.$message({
          message: "获取接入耗时失败",
          type: "error",
        });
      }
    },
    getAccessSuccess() {
      this.$echarts.init(document.getElementById("AccessTime_line")).setOption({
        // Make gradient line here
        visualMap: [
          {
            show: false, // 颜色栏
            type: "continuous", // 连续型
            seriesIndex: 0, // 渐变
            min: 0, // 最小值
            max: 400, // 最大值
            range: [0, 400],
            color: ["rgba(213,72,120,0.7)"], // 线颜色
            // color: ['orangered','yellow','lightskyblue']  //线颜色渐变
          },
        ],
        tooltip: {
          trigger: "axis",
        },
        title: [
          {
            left: "8%",
            text: "接入耗时",
            textStyle: {
              color: "#fff",
            },
          },
        ],
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
            data: this.dataList,
            boundaryGap: false, //第一个值紧挨在Y轴，默认是与Y轴有距离的
          },
        ],
        yAxis: [{}],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
            top: "50%",
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
            // backgroundColor: '#AFC5F7',
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
                    color: "rgba(221,96,115,0.8)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(221,96,115,0.2)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            }, // 区域颜色
          },
        ],
      });
    },
  },
};
</script>
