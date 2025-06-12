import { fn, Model, Sequelize } from 'sequelize'
import dayjs from 'dayjs'

const loadModel = (sequelize, DataTypes) => {
  class Oveja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Oveja.hasMany(models.Cria, {foreignKey: 'ovejaId', as: 'Crias'})
      Oveja.belongsTo(models.Usuario, {foreignKey: 'userId', as: 'Propietario'})
    }

  }

  Oveja.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    estado: {
      allowNull: false,
      type: DataTypes.ENUM('buena', 'regular', 'mala'),
      defaultValue: 'buena'
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    fechaNacimiento: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    edad: {
      type: DataTypes.VIRTUAL,
      get () {
        const fNacimiento = this.fechaNacimiento
        if (!fNacimiento) return null
        return dayjs().diff(dayjs(fNacimiento), 'year')
      }
    },
    vecesParida: {
      type: DataTypes.VIRTUAL,
      get () {
      return this.Crias ? this.Crias.length : 0;
      }
    },
    fechaUltimoParto:{
      type: DataTypes.VIRTUAL,
      get () {
        const crias = this.Crias ?? []
        if(!crias.length) return null 
        const fecha = crias
          .map(c => dayjs(c.fechaNacimiento))
          .sort((a,b) => b.valueOf() - a.valueOf())[0]
        return fecha.format('YYYY-MM-DD')
      }
    },
    criasMuertas: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.Crias?.filter(c => c.viva===false).length || 0;
      }
    },
    vecesParidaVivas: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.Crias?.filter(c => c.viva===true).length || 0;
      }
    }
  }, {
    sequelize,
    modelName: 'Oveja',
    tableName: 'Ovejas',
    timestamps: true
  });
  return Oveja;
}

export default loadModel
