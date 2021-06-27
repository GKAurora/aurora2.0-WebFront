<template>
  <div id="Annular" style="width: 500px; height: 250px;">
  </div>
</template>
<script>
export default {
  name: "page",
  mounted() {
    this.getAnnular();
  },
  methods:{
    getAnnular(){
      this.$echarts.init(document.getElementById("Annular")).setOption({
                  tooltip: {
            trigger: "item",
          },
          legend: {
            top: "17%",
            left: "75%",
          },
          series: [
            {
              name: "设备状态",
              type: "pie",
              radius: ["45%", "75%"],
              avoidLabelOverlap: false,
              selectedMode: "multiple",
              itemStyle: {
                // 阴影
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                // 圆环中数据
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "16",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 40, name: "接入成功数" },
                { value: 50, name: "关联成功数" },
                { value: 28, name: "关联失败数" },
                { value: 19, name: "认证成功数" },
                { value: 30, name: "认证失败数" },
                { value: 27, name: "DHCP 成功数" },
                { value: 42, name: "DHCP 失败数" },
              ],
            },
          ],
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>