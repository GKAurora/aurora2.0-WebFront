const sdn = {
    prefix: '/sdn',
    getErr(acc_type=0, end_time=null, start_time=null, site_id=null, level=0){
        return {
            url: `${this.prefix}/get_err`,
            method: 'post',
            data: {
                acc_type: acc_type,
                site_id: site_id,
                level: level,
                end_time: end_time,
                start_time: start_time
            }
        }
    },
    getFloorDevice(site_id, level){
        return {
            url: `${this.prefix}/get_floor_device`,
            method: 'get',
            params: {
                site_id: site_id,
                level: level
            }
        }
    },
    getSitesMessage(site_id='/'){
        return {
            url: `${this.prefix}/get_sdn_info`,
            method: 'get',
            params: {
                site_id: site_id
            }
        }
    }
    // sdn接口4
}

export default sdn