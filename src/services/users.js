const Sequelize = require('sequelize');
const SequelizeInstance = require('../../config/db'); // sequelize的实例
const User = require('../models/users')(SequelizeInstance, Sequelize);
const rp = require('request-promise');
const appId = 'wx41c96c5164123d00';
const sessionKey = 'bb98994ecf3958592dae22183c987580';
const usersService = {
  /**
   * [getopenid 微信小程序授权]
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  async getopenid (param) {
    const res = {}
    var options = {
      uri: 'https://api.weixin.qq.com/sns/jscode2session',
      qs: {
        access_token: 'xxxxx xxxxx', // -> uri + '?access_token=xxxxx%20xxxxx'
        appid: appId,
        secret: sessionKey,
        js_code: param.code,
        grant_type: 'authorization_code'
      },
      headers: {
        "Content-Type": 'application/json',
        'User-Agent': 'Request-Promise'
      },
      json: true
    };
    await rp(options).then(function (response) {
      console.log('res', response)
      res.data = response;
      res.code = 0;
      res.msg = '获取openid成功';
    }).catch(function (err) {
      console.log('err', err)
      res.code = 2002;
      res.msg = '获取openid失败';
    });
    return res;
  },
  async getUsers () {
    const res = {}
    const result = await User.findAll({
    })
    res.code = 0;
    res.data = result;
    res.msg = '查询成功'
    return res;
  }
}
module.exports = usersService