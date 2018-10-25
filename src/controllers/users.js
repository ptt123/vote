const validator = require('validator');
const usersCode = require('./../codes/users');
const usersService = require('./../services/users')
const users = {
  async test (ctx) {
    ctx.body = {
      code: 0,
      data: [],
      msg: '成功'
    }
  },
  async getopenid (ctx) {
    const res = {};
    if (!ctx.request.body.code) {
      res.code = 2001;
      res.msg = '缺少code参数';
      return res;
    }
    const result = await usersService.getopenid(ctx.request.body);
    ctx.body = result;
  },
  async getUsers (ctx) {
    const result = await usersService.getUsers();
    ctx.body = result;
  }
}
module.exports = users