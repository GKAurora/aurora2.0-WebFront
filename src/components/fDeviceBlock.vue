<template>
  <el-col :span="8" :xs="24" :sm="24" :md="12">

      <el-card
        class="device-count"
        v-bind:style="cardData.style"
      >
        <span class="device-font">
            <strong>{{ cardData.total }}</strong>
        </span>
        <p class="device-title">{{ cardData.title }}</p>
        <a
        class="device-message"
        @click="handlerClick"
        >
          <span>详细信息</span>
          <i class="el-icon-video-play"></i>
        </a>
      </el-card>

  </el-col>
</template>

<script>
export default {
    props: ['cardData'],
    methods: {
        handlerClick(){
            console.log('click')
        }
    }
}
</script>

<style>
.device-count {
  width: 150px;
  border-radius: 20px;
  /* background-color: rgb(241, 179, 63); */
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-between;
}
.device-title {
    /* font-size: 20px; */
    font-weight: 500;
    padding: 0 0 10px;
}
.device-font {
  font-size: 30px;
  color: aliceblue;
}
.device-message {
  color: aliceblue;
  cursor: pointer;

}
</style>
