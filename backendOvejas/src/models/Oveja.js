import { Model } from 'sequelize'

const loadModel = (sequelize, DataTypes) => {
  class Oveja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Oveja.hasMany(models.Cria, {foreignKey: 'ovejaId', as: 'Crias'})
    }

    get edadOveja() {
      if (!this.fechaUltimoParto) return null;
      const diff = Date.now() - new Date(this.fechaUltimoParto);
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    }

    get vecesParida() {
      return this.Crias ? this.Crias.length : 0;
    }
  }

  Oveja.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fechaUltimoParto:{
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    estado: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [
        'buena',
        'mala',
        'regular'
      ],
      defaultValue: 'buena'
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Oveja',
    tableName: 'Ovejas',
    timestamps: true
  });
  return Oveja;
}

export default loadModel
