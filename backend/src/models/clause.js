"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clause extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Profession,{foreignKey:'professionId',as:'profession'})
      this.hasMany(models.Subclause,{as:'subclausies'})
    }
  }
  
  Clause.init(
    {
      name: DataTypes.STRING,
      maxPoint:DataTypes.INTEGER,
      yayinSayisiFormula:DataTypes.STRING,  
      enAzPuanFormula:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Clause",
    }
  );
  return Clause;
};
