/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote_records', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openid: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    works_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    vote_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'vote_records',
    timestamps: false,  //去除createAt updateAt
    freezeTableName: true  // 使用自定义表名
  });
};
