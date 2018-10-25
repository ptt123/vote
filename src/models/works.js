/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('works', {
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
    works_title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    works_img: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    works_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    works_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    votes_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    pass_reason: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'works',
    timestamps: false,  //去除createAt updateAt
    freezeTableName: true  // 使用自定义表名
  });
};
