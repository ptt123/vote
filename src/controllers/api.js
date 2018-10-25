const validator = require('validator');
const apiService = require('./../services/api')
const usersCode = require('./../codes/users')
const nodeExcel = require('excel-export'); // 导表
const apiController = {
  async test (ctx) {
    await apiService.test()
    ctx.body = {
      code: 0,
      data: [],
      msg: '成功'
    }
  },
  /**
   * [apply 报名]
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  async apply (ctx) {
    if (!ctx.request.body.name || !ctx.request.body.phone || !ctx.request.body.store
      || !ctx.request.body.address || !ctx.request.body.works_imgs
      || !ctx.request.body.works_title || !ctx.request.body.works_desc) {
      ctx.body = {
        code: 2001,
        msg: '缺少必要参数'
      }
      return
    }
    const result = await apiService.apply(ctx.request.body)
    ctx.body = result
  },
  /**
   * [review 作品审核]
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  async review (ctx) {
    if (!ctx.request.body.works_id || !ctx.request.body.status || 
      (Number(ctx.request.body.status) === 0 && !ctx.request.body.pass_reason)) {
      ctx.body = {
        code: 2001,
        msg: '缺少必要参数'
      }
      return
    }
    const result = await apiService.review(ctx.request.body)
    ctx.body = result
  },
  /**
   * [vote 投票]
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  async vote (ctx) {
    if (!ctx.request.body.works_id || !ctx.request.body.openid) {
      ctx.body = {
        code: 2001,
        msg: '缺少必要参数'
      }
      return
    }
    const result = await apiService.vote(ctx.request.body)
    ctx.body = result
  },
  async exportWorks (ctx) {
    var conf ={};
  // uncomment it for style example  
  // conf.stylesXmlFile = "styles.xml";
    conf.cols = [{
        caption:'string',
        captionStyleIndex: 1,        
        type:'string',
        beforeCellWrite:function(row, cellData){
             return cellData.toUpperCase();
        }
        , width:15
    },{
        caption:'date',
        type:'date',
        beforeCellWrite:function(){
            var originDate = new Date(Date.UTC(1899,11,30));
            return function(row, cellData, eOpt){
              // uncomment it for style example 
              // if (eOpt.rowNum%2){
                // eOpt.styleIndex = 1;
              // }  
              // else{
                // eOpt.styleIndex = 2;
              // }
              if (cellData === null){
                eOpt.cellType = 'string';
                return 'N/A';
              } else
                return (cellData - originDate) / (24 * 60 * 60 * 1000);
            } 
        }()
        , width:20.85
    },{
        caption:'bool',
        type:'bool'
    },{
        caption:'number',
        type:'number',
        width:30
    }];
    conf.rows = [
      ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14159],
      ["e", new Date(2012, 4, 1), false, 2.7182],
      ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
      ["null date", null, true, 1.414]
    ];
  var result = nodeExcel.execute(conf);
  console.log(result)
  // ctx.response.setHeader('Content-Type', 'application/vnd.openxmlformats');
  // ctx.response.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  // ctx.response.end(result, 'binary');
  }
}
module.exports = apiController