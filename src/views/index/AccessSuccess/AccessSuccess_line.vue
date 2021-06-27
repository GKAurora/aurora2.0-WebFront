<template>
  <div id="AccessSuccess_line" style="width:950px;height:340px;"></div>
</template>
<script>
var data = [
  ["2000-06-05", 86],
  ["2000-06-06", 85],
  ["2000-06-07", 68],
  ["2000-06-08", 86],
  ["2000-06-09", 73],
  ["2000-06-10", 85],
  ["2000-06-11", 73],
  ["2000-06-12", 68],
  ["2000-06-13", 92],
  ["2000-06-14", 30],
  ["2000-06-15", 45],
  ["2000-06-16", 39],
  ["2000-06-17", 15],
  ["2000-06-18", 11],
  ["2000-06-19", 9],
  ["2000-06-20", 6],
  ["2000-06-21", 37],
  ["2000-06-22", 28],
  ["2000-06-23", 85],
  ["2000-06-24", 94],
  ["2000-06-25", 71],
  ["2000-06-26", 6],
  ["2000-06-27", 84],
  ["2000-06-28", 93],
  ["2000-06-29", 85],
  ["2000-06-30", 73],
  ["2000-07-01", 83],
  ["2000-07-02", 15],
  ["2000-07-03", 17],
  ["2000-07-04", 82],
  ["2000-07-05", 44],
  ["2000-07-06", 72],
  ["2000-07-07", 16],
  ["2000-07-08", 7],
  ["2000-07-09", 66],
  ["2000-07-10", 91],
  ["2000-07-11", 92],
  ["2000-07-12", 13],
  ["2000-07-13", 7],
  ["2000-07-14", 11],
  ["2000-07-15", 11],
  ["2000-07-16", 64],
  ["2000-07-17", 69],
  ["2000-07-18", 88],
  ["2000-07-19", 77],
  ["2000-07-20", 83],
  ["2000-07-21", 11],
  ["2000-07-22", 57],
  ["2000-07-23", 55],
  ["2000-07-24", 60],
];

var dateList = data.map(function (item) {
  return item[0];
});
var valueList = data.map(function (item) {
  return item[1];
});

export default {
  name: "page",
  mounted() {
    this.getAccessSuccess();
  },
  methods: {
    getAccessSuccess() {
      this.$echarts.init(document.getElementById("AccessSuccess_line")).setOption({
        // Make gradient line here
        visualMap: [
          {
            show: false,       //颜色栏
            type: "continuous",
            seriesIndex: 0,      //渐变
            min: 0,     //最小值
            max: 100,   //最大值
          },
        ],
        title: [
          {
            left: "8%",
            text: "接入成功率",
          },
        ],
        tooltip: {
          trigger: "axis",
          saveAsImage:{},         //这样子就具备了下载图片功能
          dataZoom:{},        //区域缩放
          magicType:{            //多种图表切换
            type:['continuous','line']     
          }
        },
        xAxis: [
          {
            data: dateList,
            
          },
        ],
        yAxis: [{}],
        grid: [
          {
            bottom: "10%",   //大小
          },
        ],
        series: [
          {
            type: "line",
            showSymbol: false,      //是否显示节点
            data: valueList,
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>