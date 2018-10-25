const validator = require('validator');
const worksService = require('./../services/works')
const works = {
  async test ( ctx ) {
    ctx.body = {
      code: 0,
      data: [],
      msg: '成功'
    }
  },
  /**
   * [getWorks 获取作品列表 默认一页展示20条]
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  async getWorks (ctx) {
    const result = await worksService.getWorks(ctx.request.body)
    ctx.body = result;
  },
  /**
   * [getWorkDetail 获取作品详情]
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  async getWorkDetail (ctx) {
    if (!ctx.request.body.works_id) {
      ctx.body = {
        code: 2001,
        msg: '缺少必要参数'
      }
      return
    }
    const result = await worksService.getWorkDetail(ctx.request.body)
    ctx.body = result;
  }
}
module.exports = works