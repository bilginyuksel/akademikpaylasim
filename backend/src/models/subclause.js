'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subclause extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.Clause,{foreignKey:'clauseId',as:'clause'})
    }
  };
  Subclause.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    point: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Subclause',
  });
  return Subclause;
};