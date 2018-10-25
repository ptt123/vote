const Sequelize = require('sequelize');
const SequelizeInstance = require('../../config/db'); // sequelize的实例
const User = require('../models/users')(SequelizeInstance, Sequelize);
const Works = require('../models/works')(SequelizeInstance, Sequelize);
const Vote_records = require('../models/Vote_records')(SequelizeInstance, Sequelize);
const Tools = require('../utils/tools');
const apiService = {
  async test () {
    const str = '2018/10/25 12:43:11'
    console.log('是否今天?', Tools.isToday(str))
  },
  /**
   * [apply 上传作品]
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  async apply (param) {
    const res = {}
    await Works.findOne({
      'where': {
        'openid': param.openid,
        'works_status': [1, 2]
      }
    }).then ((result) => {
      if (result) {
        res.code = 2001
        res.msg = '您已提交过作品'
      } else {
        SequelizeInstance.transaction( t => {
          User.create({  //创建一条数据
            username: param.name,
            phone: param.phone,
            store_name: param.store,
            address: param.address,
            openid: param.openid,
            nickname: param.nickname,
            avator_img: param.avator_img
          }).then(result => {
            Works.create({
              openid: param.openid,
              works_title: param.works_title,
              works_desc: param.works_desc,
              works_img: param.works_imgs
            }).then(result => {
              res.code = 0
              res.msg = '上传作品成功'
            }).catch(err => {
              console.log('新增作品失败')
              res.code = 2001;
              res.msg = '上传作品失败';
            })
          }).catch(err => {
            console.log('新增用户失败')
            res.code = 2001;
            res.msg = '上传作品失败';
          })
        }).catch(err => {
          res.code = 2001;
          res.msg = '上传作品失败';
        })
      }
    }).catch((err) => {
      console.log(err)
      res.code = 2001
      res.msg = '查询失败'
    })
    return res
  },
  /**
   * [review 作品审核]
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  async review (param) {
    const res = {}
    const query = await Works.findOne({
      'where': {
        'id': param.works_id
      }
    })
    if (query) {
      await Works.update({
        'works_status': param.status,
        'pass_reason': param.pass_reason
      },{
        'where': {
          'id': param.works_id
        }
      }).then(result => {
        res.code = 0
        res.msg = '审核成功'
      }).catch(err => {
        res.code = 2001
        res.msg = '审核失败'
      })
    } else {
      res.code = 2001
      res.msg = '无该条记录'
    }
    return res
  },
  /**
   * [vote 投票]
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  async vote (param) {
    const res = {}
    const queryWork = await Works.findOne({
      'where': {
        'id': param.works_id
      }
    })
    const queryVote = await Vote_records.findAll({
      'where': {
        '$and': [
          {'openid': param.openid}, // 投票人openid
          Sequelize.where(
            Sequelize.fn('DATE', Sequelize.col('vote_time')), // 表对应的字段
            Sequelize.literal('CURRENT_DATE')
          )
        ]
      }
    })
    if (queryVote && queryVote.length >= 3) {
      // 查询该投票人当天投票数是否已达3票
      res.code = 2001
      res.msg = '每日可投3票，您已达今日最大投票数'
      return res
    } else {
      const queryVoteByWork = await Vote_records.findAll({
        'where': {
          '$and': [
            {'openid': param.openid}, // 投票人openid
            {'works_id': param.works_id},
            Sequelize.where(
              Sequelize.fn('DATE', Sequelize.col('vote_time')), // 表对应的字段
              Sequelize.literal('CURRENT_DATE')
            )
          ]
        }
      })
      if (queryVoteByWork) {
        // 查询该投票人当天是否已为该作品投过票
        res.code = 2001
        res.msg = '您已投过票'
        return res
      }
    }
    if (queryWork) {
      await SequelizeInstance.transaction( t => {
        Vote_records.create({  //创建一条数据
          openid: param.openid, // 投票人openid
          works_id: param.works_id
        }).then(result => {
          Works.update({
            'votes_number': queryWork.votes_number++
          }).then(result => {
            res.code = 0
            res.msg = '投票成功'
          }).catch(err => {
            res.code = 0
            res.msg = '投票失败'
          })
        }).catch(err => {
          res.code = 0
          res.msg = '投票失败'
        })
      })      
    } else {
      res.code = 0
      res.msg = '查无此数据'
    }
    return res;
  },
  async exportWorks (param) {

  }
}
module.exports = apiService