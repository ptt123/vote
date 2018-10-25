const router = require('koa-router')()
const worksController = require('./../controllers/works')
const routers = router
  .get( '/test', worksController.test)
  .post('/getWorks', worksController.getWorks)
  .post('/getWorkDetail', worksController.getWorkDetail)
module.exports = routers