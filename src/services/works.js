const Sequelize = require('sequelize');
const SequelizeInstance = require('../../config/db'); // sequelize的实例
const Works = require('../models/works')(SequelizeInstance, Sequelize);
const qs = require('qs');
require('../utils/dateTools')
const worksService = {
  /**
   * [getWorks 查询作品列表]
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  async getWorks (param) {
    // mysql数据库识别‘年-月-日’识别到的日期是‘年-月-日 00:00:00’
    param.etime = param.etime.replace(/-/g,'/');
    const endTimestamp = new Date(param.etime).getTime() + 24*60*60*1000;
    param.etime = new Date(endTimestamp).format("yyyy-MM-dd");
    param.page = param.page || 1
    param.listrows = param.listrows || 20
    const res = {}
    const result = await Works.findAll({
      'attributes': [['id', 'works_id'], 'works_title', 'works_img', 'works_desc', 'works_status'],
      'where': {
        'works_status': param.status || 2,
        'create_time': {
          '$between': [param.stime, param.etime]
        }
      },
      'limit': Number(param.listrows),
      'offset': Number(param.page - 1) * Number(param.listrows)
    })
    const queryCount = await Works.findAll({
      'attributes': [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      'where': {
        'works_status': param.status || 2,
        'create_time': {
          '$between': [param.stime, param.etime]
        }
      }
    })
    res.code = 0;
    res.result = {
      data: result,
      count: queryCount[0]
    };
    res.msg = '查询成功'
    return res;
  },
  /**
   * [getWorkDetail 获取作品详情接口]
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  async getWorkDetail (param) {
    const res = {}
    await Works.findOne({
      'where': {
        'id': param.works_id
      }
    }).then(result => {
      if (result) {
        res.code = 0
        res.data = result
        res.msg = `查询成功`
      } else {
        res.code = 0
        res.msg = `无此条数据`
      }
    }).catch(err => {
      res.code = 2001
      res.msg = `查询失败 ${err.message}`
    })
    return res
  }
}
module.exports = worksService;