<template>
  <!-- canvas 挂载节点 -->
  <div id="graph">
  </div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  data() {
    return {
      graph: null,
      images: [
        "./equipment/Yun.png",
        "./equipment/Controller.png",
        "./equipment/Firewall.png",
        "./equipment/Server.png",
        "./equipment/Switch.png",
        "./equipment/Switch2.png",
        "./equipment/AP.png",
      ],
    };
  },
  mounted() {
    // 创建画布
    this.$nextTick(() => {
      this.createGraphic();
    });
  },
  beforeDestroy() {
    this.graph.destroy();
  },
  methods: {
    createGraphic() {
      const graph = new G6.Graph({
        groupByTypes: false,
        container: document.getElementById("graph"),
        width: 1450,
        height: 950,
        fitView: true,
        fitViewPadding: [50],
        layout: {
          type: "dagre",
        },
        defaultNode: {
          type: "image",
          label: "AntV Team",

          style: {
            opacity: 0.9,
            fill: "#EDF5FF",
          },
          labelCfg: {
            style: {
              // stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
              fontSize: 60,
              fill: "#F8F2F2",
            },
          },
        },
        defaultEdge: {
          type: "line",
          style: {
            lineWidth: 10,
            startArrow:{
              path:G6.Arrow.circle(10, 25),
              d:25,
              fill: "#f00",
              stroke: "#0f0",
            },
            endArrow: {
              path:G6.Arrow.circle(10, 25),
              d:25,
              fill: "#f00",
              stroke: "#0f0",
              // opacity: 0.9,
              // lineWidth: 3,
            },
          },
          labelCfg: {
            style: {
              // stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
              fontSize: 50,
              fill: "#fff",
            },
          },
        },
        fitView: true,
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue",
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: "steelblue",
            lineWidth: 3,
          },
        },
        modes: {
          default: ["drag-node", "drag-canvas", "zoom-canvas", "brush-select"],
        },
      });
      const data = {
        nodes: [
          {
            id: "0",
            img: this.images[0],
            size: [300, 250],
            type: "image",
            label: "ISP",
          },
          {
            id: "1",
            img: this.images[2],
            size: [200, 200],
            type: "image",
            label: "防火墙",
          },
          {
            id: "2",
            img: this.images[4],
            size: [200, 200],
            type: "image",
            label: "核心层交换机",
          },
          {
            id: "3",
            img: this.images[3],
            size: [200, 200],
            type: "image",
            label: "服务器",
          },
          {
            id: "4",
            img: this.images[1],
            size: [200, 200],
            type: "image",
            label: "AC控制器",
          },
          {
            id: "5",
            img: this.images[4],
            size: [200, 200],
            type: "image",
            label: "核心层交换机1",
          },
          {
            id: "6",
            img: this.images[4],
            size: [200, 200],
            type: "image",
            label: "核心层交换机2",
          },
          {
            id: "7",
            img: this.images[5],
            size: [200, 200],
            type: "image",
            label: "POE交换机1",
          },
          {
            id: "8",
            img: this.images[5],
            size: [200, 200],
            type: "image",
            label: "POE交换机2",
          },
          {
            id: "9",
            img: this.images[5],
            size: [200, 200],
            type: "image",
            label: "POE交换机3",
          },
          {
            id: "10",
            img: this.images[5],
            size: [200, 200],
            type: "image",
            label: "POE交换机4",
          },
          {
            id: "11",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点1",
          },
          {
            id: "12",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点2",
          },
          {
            id: "13",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点3",
          },
          {
            id: "14",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点4",
          },
          {
            id: "15",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点5",
          },
          {
            id: "16",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点6",
          },
          {
            id: "17",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点7",
          },
          {
            id: "18",
            img: this.images[6],
            size: [200, 200],
            type: "image",
            label: "站点8",
          },
        ],
        edges: [
          {
            source: "0",
            target: "1",
            label: "",
          },
          {
            source: "1",
            target: "2",
            label: "GE 0/0/0",
          },
          {
            source: "1",
            target: "3",
            label: "GE 0/0/1",
          },
          {
            source: "2",
            target: "4",
            label: "GE 1/0/3",
          },
          {
            source: "2",
            target: "5",
            label: "GE 1/0/0",
          },
          {
            source: "2",
            target: "6",
            label: "GE 1/0/2",
          },
          {
            source: "5",
            target: "6",
            label: "GE 1/0/3",
          },
          {
            source: "5",
            target: "7",
            label: "GE 1/0/1",
          },
          {
            source: "5",
            target: "8",
            label: "GE 1/0/2",
          },
          {
            source: "6",
            target: "9",
            label: "GE 1/0/1",
          },
          {
            source: "6",
            target: "10",
            label: "GE 1/0/2",
          },
          {
            source: "7",
            target: "11",
            label: "Ethernet 0/0/2",
          },
          {
            source: "7",
            target: "12",
            label: "Ethernet 0/0/3",
          },
          {
            source: "8",
            target: "13",
            label: "Ethernet 0/0/2",
          },
          {
            source: "8",
            target: "14",
            label: "Ethernet 0/0/3",
          },
          {
            source: "9",
            target: "15",
            label: "Ethernet 0/0/2",
          },
          {
            source: "9",
            target: "16",
            label: "Ethernet 0/0/3",
          },
          {
            source: "10",
            target: "17",
            label: "Ethernet 0/0/2",
          },
          {
            source: "10",
            target: "18",
            label: "Ethernet 0/0/3",
          },
        ],
      };
      this.graph = graph;
      this.graph.read(data); // 读取数据

      // canvas 点击事件
      this.graph.on("canvas:click", (e) => {
        const nodes = this.graph.findAllByState("node", "click");
        nodes.forEach((node) => {
          this.graph.setItemState(node, "click", false);
        });
      });

      // 节点点击事件
      this.graph.on("node:click", (e) => {
        const nodes = this.graph.findAllByState("node", "click");
        nodes.forEach((node) => {
          this.graph.setItemState(node, "click", false);
        });
        this.graph.setItemState(e.item, "click", true);
      });

      // 节点鼠标事件
      this.graph.on("node:mouseenter", (e) => {
        this.graph.setItemState(e.item, "hover", true);
      });
      this.graph.on("node:mouseleave", (e) => {
        this.graph.setItemState(e.item, "hover", false);
      });
    },
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 80px;
  margin-left: 570px;
}
#graph {
  margin-left: 240px;
  /* background-image: url(../../assets/img/about/bg.gif); */
  background-color: darkgrey;
}
</style>