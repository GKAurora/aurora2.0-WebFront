<template>
  <div id="Radarmap"></div>
</template>
<script>
const buildSeries = function (data) {
  const helper = data.map((item, index) => {
    const arr = new Array(data.length);
    arr.splice(index, 1, item);
    return arr;
  });
  return [data, ...helper].map((item, index) => {
    return {
      type: "radar",
      symbol: index === 0 ? "circle" : "none",
      symbolSize: 6,
      itemStyle: {
        color: "#fff",
      },
      lineStyle: {
        color: index === 0 ? "#ff77d2" : "transparent",
      },
      areaStyle: {
        color: index === 0 ? "#ff77d2" : "transparent",
        opacity: 0.5,
      },
      tooltip: {
        show: index === 0 ? false : true,
        formatter: function () {
          return (
            source.indicator[index - 1].name + "：" + source.data[index - 1]
          );
        },
      },
      z: index === 0 ? 1 : 2,
      data: [item],
    };
  });
};
export default {
  name: "page",
  mounted() {
    this.getRadarmap();
  },
  methods: {
    getRadarmap() {
      this.$echarts.init(document.getElementById("Radarmap")).setOption({
        color: ["#FFE434"],
        title: {
          text: "设备健康度",
          textStyle: {
            color: "#212222",
            fontSize: 16,
          },
          left:'33%',
          top:'0.3%'
        },
        legend: {
          data: ["健康度"],
        },
        tooltip: {},
        radar: [
          {
            indicator: [
              { text: "接入成功率", max: 100 },
              { text: "吞吐达标率", max: 100},
              { text: "容量健康度", max: 100},
              { text: "信号和干扰", max: 100 },
              { text: "漫游达标率", max: 100 },
              { text: "接入耗时", max: 100 },
            ],
            center: ["40%", "45%"], //位置
            radius: 100, //大小
            startAngle: 90, //旋转角度
            splitNumber: 4, //环数
            shape: "circle",
            name: {
              //字体样式
              formatter: "{value}",
              textStyle: {
                color: "#000",
              },
            },
            splitArea: {
              areaStyle: {
                color: ["#afd8ed", "#9dc9e0", "#88b7ce", "#74a4bc"], //四个环样式
                shadowColor: "rgba(160, 206, 229, 0.9)", //透明度
                shadowBlur: 10,
              },
            },
            axisLine: {
              //线样式
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)", //圆环之间的边界
              },
            },
          },
        ],
        series: [
          {
            name: "设备健康度",
            type: "radar",
            Symbol: "circle",
            symbolSize: 5,
            emphasis: {
              lineStyle: {
                width: 4,
              },
            },
            data: [
              {
                value: [90, 88, 50, 50, 40, 70],
                itemStyle: {
                  normal: {
                    color: "rgba(255,255,255,.6)",
                    lineStyle: {
                      color: "rgba(255,255,255,.6)",
                    },
                  },
                },

                areaStyle: {
                  color: this.$echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                    //颜色遮盖
                    {
                      color: "rgba(179, 192, 198, 0.9)",
                      offset: 0,
                    },
                    {
                      color: "rgba(179, 192, 198, 0.9)",
                      offset: 1,
                    },
                  ]),
                },
              },
            ],
          },
        ],
      });
    },
  },
};
</script>
<style lang="css" scoped>
#Radarmap {
  width: 600px;
  height: 400px;
}
</style>