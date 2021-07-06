<template>
  <div class="block">
    <span>时间范围: </span>
    <el-date-picker
      v-model="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="timestamp"
      @change="handlClick"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default: "",
      value: '',
      default: "",
    };
  },
  computed: {
  },
  methods: {
    getDefaultTime() {
      const endTime = new Date().getTime()
      const startTime = endTime - (1000 * 60 * 60 * 24 * 7)
      return [startTime, endTime]
    },
    handlClick(e){
      this.$emit('dateStamp', e)
    }
  },
  mounted() {
    // this.getNowTime()
    this.value = this.getDefaultTime();
    this.$emit('dateStamp', this.getDefaultTime())
  },
};
</script>