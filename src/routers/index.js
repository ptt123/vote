/**
 * 整合所有子路由
 */
const router = require('koa-router')()
const users = require('./users')
const vote_records = require('./vote_records')
const works = require('./works')
const api = require('./api')

router.use('/users', users.routes(), users.allowedMethods())
router.use('/vote_records', vote_records.routes(), vote_records.allowedMethods())
router.use('/works', works.routes(), works.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router