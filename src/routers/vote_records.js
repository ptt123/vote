const router = require('koa-router')()
const vote_records = require('./../controllers/vote_records')
const routers = router.get( '/test', vote_records.test)
module.exports = routers