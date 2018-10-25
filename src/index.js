const path = require('path')
const Koa = require('koa')
// const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
// const koaLogger = require('koa-logger')
// const session = require('koa-session-minimal')
// const MysqlStore = require('koa-mysql-session')

const config = require('./../config/config')
const routers = require('./routers/index')

const app = new Koa()

// session存储配置
// const sessionMysqlConfig= {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST,
// }
// 配置session中间件
// app.use(session({
//   key: 'USER_SID',
//   store: new MysqlStore(sessionMysqlConfig)
// }))
// 配置控制台日志中间件
// app.use(convert(koaLogger()))
// 配置ctx.body解析中间件
app.use(bodyParser())
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)