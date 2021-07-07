<template>
  <el-card class="message-card box-card">
    <div slot="header" class="clearfix">
      <span>账号信息</span>
    </div>
    <div v-for="(value, index) in Message" :key="index" class="message-card-content text item">
      <p><i class="el-icon-warning"></i><span>{{ index }}: </span>{{ value }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
    props: ['Message'],

};
</script>

<style lang="scss" scoped>
.message-card {
    .message-card-content {
        p {
            font-size: 15px;
            padding: 5px 0;
        }
        i {
            padding: 5px 8px;
        }
        span {
            color: rgba(0,0,0,.85);
            
            margin: 0 5px;
        }
    }
}
</style>
