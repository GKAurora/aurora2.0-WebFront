const sdn = {
  prefix: '/sdn',
  getErr (acc_type = 0, end_time = null, start_time = null, site_id = null, level = 0) {
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
  getFloorDevice (site_id, level) {
    return {
      url: `${this.prefix}/get_floor_device`,
      method: 'get',
      params: {
        site_id: site_id,
        level: level
      }
    }
  },
  getSitesMessage (site_id = '/') {
    return {
      url: `${this.prefix}/get_sdn_info`,
      method: 'get',
      params: {
        site_id: site_id
      }
    }
  },
  /**
     * 质量评估体系健康度趋势
     * 获取总速率、健康度、成功率、漫游达标率等信息
     * @param {int} start_time 开始时间戳
     * @param {int} end_time 截止时间戳
     * @param {int} level 层级
     * @param {string} site_id 站点id
     * @returns axios conf
     */
  qualityHealth (start_time, end_time, level, site_id) {
    return {
      url: `${this.prefix}/get_sdn_info`,
      method: 'post',
      data: {
        start_time: start_time,
        end_time: end_time,
        level: level,
        site_id: site_id
      }
    }
  },
  /**
     * 多维度数据汇总
     * @param {int} start_time
     * @param {int} end_time
     * @param {int} level
     * @param {string} site_id 站点id
     * @returns axios conf
     */
  getDeviceTotalMsg (start_time, end_time, level, site_id) {
    return {
      url: `${this.prefix}/get_total_data`,
      method: 'post',
      data: {
        start_time: start_time,
        end_time: end_time,
        level: level,
        site_id: site_id
      }
    }
  },
  /**
     * 查询质量评估体系单个维度评估结果趋势
     * @param {*} start_time
     * @param {*} end_time
     * @param {*} level
     * @param {*} site_id
     * @returns axios conf
     */
  getQualitySingleData (start_time, end_time, level, site_id) {
    return {
      url: `${this.prefix}/get_trend_single`,
      method: 'post',
      data: {
        start_time: start_time,
        end_time: end_time,
        level: level,
        site_id: site_id
      }
    }
  },
  /**
     * 质量评估体系单个维度评估结果趋势图
     * @param {*} start_time
     * @param {*} end_time
     * @param {*} level
     * @param {*} site_id
     * @returns axios conf
     */
  qualitySingleData (start_time, end_time, level, site_id) {
    return {
      url: `${this.prefix}/get_trend_single`,
      method: 'put',
      data: {
        start_time: start_time,
        end_time: end_time,
        level: level,
        site_id: site_id
      }
    }
  },
  /**
     * 获取手机位置
     * 默认站点: 深圳;
     * 默认level: 3;
     * @param {*} level
     * @param {*} site_id
     * @returns axios conf
     */
  getUserLocation (level, site_id) {
    return {
      url: `${this.prefix}/get_user_location`,
      method: 'get',
      params: {
        level: level,
        site_id: site_id
      }
    }
  },
  /**
     * 获取用户路径
     * 传入用户mac号
     * @param {integer} level
     * @param {string} site_id
     * @param {string} user_mac
     * @returns axios conf
     */
  getUserRoute (level = 1, site_id = '/', user_mac) {
    return {
      url: `${this.prefix}/get_user_route`,
      method: 'post',
      data: {
        level: level,
        site_id: site_id,
        user_mac: user_mac
      }
    }
  },
  /**
     * 获取用户列表
     * @param {integer} level
     * @param {string} site_id
     * @param {integer} page
     * @param {integer} page_size
     * @returns axios conf
     */
  getUserList (level = 1, site_id = '/', page = 1, page_size = 100) {
    return {
      url: `${this.prefix}/get_user_route`,
      method: 'put',
      data: {
        level: level,
        site_id: site_id,
        page: page,
        page_size: page_size
      }
    }
  },
  /**
     * 热力图接口
     * @returns axios conf
     */
  heatmap () {
    return {
      url: `${this.prefix}/heatmap`,
      method: 'get'
    }
  }

}

export default sdn
