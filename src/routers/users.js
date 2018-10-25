const router = require('koa-router')()
const usersController = require('./../controllers/users')
const routers = router
  .get( '/test', usersController.test)
  .post('/getopenid', usersController.getopenid)
  .get('/getUsers', usersController.getUsers)
module.exports = routers