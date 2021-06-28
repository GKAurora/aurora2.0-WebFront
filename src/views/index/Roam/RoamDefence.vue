<template>
  <div id="RoamDefence" style="width: 950px; height: 250px"></div>
</template>
<script>
var data = [
  ["00:00", 34],
  ["01:00", 56],
  ["02:00", 98],
  ["03:00", 12],
  ["04:00", 43],
  ["05:00", 43],
  ["06:00", 86],
  ["07:00", 27],
  ["08:00", 92],
  ["09:00", 30],
  ["10:00", 45],
  ["11:00", 75],
  ["12:00", 15],
  ["13:00", 97],
  ["14:00", 63],
  ["15:00", 21],
  ["16:00", 37],
  ["17:00", 35],
  ["18:00", 27],
  ["19:00", 94],
  ["20:00", 71],
  ["21:00", 78],
  ["22:00", 84],
  ["23:00", 93],
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
      this.$echarts
        .init(document.getElementById("RoamDefence"))
        .setOption({
          // Make gradient line here
          visualMap: [
            {
              show: false, //颜色栏
              type: "continuous", //连续型
              seriesIndex: 0, //渐变
              min: 0, //最小值
              max: 100, //最大值
              range: [0, 100],
              color: ["#5385F5"],
              // color: ['orangered','yellow','lightskyblue']  //线颜色渐变
            },
          ],
          title: [
            {
              left: "8%",
              text: "漫游达标率",
              textStyle: {
                color: "#fff",
              },
            },
          ],
          toolbox: {
            feature: {
              saveAsImage: {}, //这样子就具备了下载图片功能
              dataZoom: {}, //区域缩放
              magicType: {
                //多种图表切换
                type: ["bar", "line"],
              },
            },
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: [
            {
              data: dateList,
            },
          ],
          yAxis: [{}
          ],
          grid: [
            {
              show: true,
              bottom: "20%", //大小
              height: "auto",
              width: "auto",
              backgroundColor: "transparent",
              borderColor: "#ccc",
            },
          ],
          series: [
            {
              type: "line",
              showSymbol: false, //是否显示节点
              data: valueList,
              smooth:true,    //是否平滑
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
                      color: 'rgba(157,163,179,.8)', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(157,163,179,.2)', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              }, //区域颜色
            },
          ],
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>