import {Model } from 'sequelize'

const loadModel = (sequelize, DataTypes) => {
  class Cria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cria.belongsTo(models.Oveja, {foreignKey: 'ovejaId', as: 'Madre'})
    }
  }
  Cria.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      sexo: {
        type: DataTypes.ENUM('macho', 'hembra'),
        allowNull: false
      },
      ovejaId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      viva: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: 'Cria',
      tableName: 'Crias',
      timestamps: true
    }
  );

  return Cria;
};

export default loadModel;
  