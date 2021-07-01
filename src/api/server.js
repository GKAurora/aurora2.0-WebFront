const server = {
    prefix: '/server',
    /**
     * 获取cpu利用率; 默认获取物理cpu
     * @param {boolean} percpu 是否获取逻辑处理器
     * @returns axios conf
     */
    getCpuMsg(percpu=false){
        return {
            url: `${this.prefix}/cpu`,
            method: 'get',
            params: {
                percpu: percpu
            }
        }
    },
    /**
     * 获取内存使用情况
     * @param {boolean} swap 是否获取交换分区信息
     * @returns axios conf
     */
    getRamMsg(swap=false){
        return {
            url: `${this.prefix}/memory`,
            method: 'get',
            params: {
                swap: swap
            }
        }
    }

}