<template>
  <div id='Memory' style='height: 400px;'></div>
</template>


<script>
export default {
    props: {
        items: {
            type: Array
        }
    },
    data() {
        return {
            Memory: null
        }
    },
    watch: {
        items: {
            handler(){
                this.init()
            },
            deep: true
        }
    },
    mounted() {
        this.init()
    },
    created() {
        this.$nextTick(() => {
        window.addEventListener('resize', () => {
                this.Memory.resize()
            })
        })
    },
    methods: {
        init() {
            this.Memory = this.$echarts.init(document.querySelector('#Memory'))
            this.Memory.setOption({
                title: {
                    text: 'API服务器内存信息',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '内存信息(MiB)',
                        type: 'pie',
                        radius: '50%',
                        data: this.items,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        }
    }
}
</script>

<style lang='scss' scoped>
#Memory {
  min-width: 500px;
//   overflow: hidden;
}
</style>
