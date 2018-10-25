const router = require('koa-router')()
const apiController = require('../controllers/api')
const routers = router
  .get( '/test', apiController.test)
  .post('/apply', apiController.apply)
  .post('/review', apiController.review)
  .post('/vote', apiController.vote)
  .get('/exportWorks', apiController.exportWorks)
module.exports = routers