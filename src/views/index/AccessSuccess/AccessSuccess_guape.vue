<template>
  <div
    id="AccessSuccess_guape"
    style="width: 150px; height: 340px;"
  ></div>
</template>
<script>
export default {
  name: "page",
  mounted() {
    this.getAccessSuccess();
  },
  methods: {
    getAccessSuccess() {
      this.$echarts.init(document.getElementById("AccessSuccess_guape")).setOption({
        series: [
          {
            type: "gauge",
            radius: "80%", //大小
            center: ["50%", "45%"], //显示位置
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              // itemStyle: {         //边框
              //   borderWidth: 1,
              //   borderColor: "#464646",
              // },
            },
            axisLine: {
              lineStyle: {
                width: 7, //宽度
              },
            },
            splitLine: {
              show: false, //刻度
            },
            axisTick: {
              show: false, //小刻度
            },
            axisLabel: {
              show: false, //刻度值
            },
            data: [
              {
                value: 87,
                name: "关联成功率",
                title: {
                  offsetCenter: ["0%", "150%"], //标题显示位置
                },
                detail: {
                  offsetCenter: ["0%", "0%"], //数值显示位置
                },
              },
            ],
            title: {
              //标题样式
              fontSize: 16,
            },
            detail: {
              //数值样式
              fontSize: 24,
              color: "auto",
              borderColor: "auto",
              formatter: "{value}%",
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>