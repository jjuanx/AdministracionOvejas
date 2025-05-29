import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(5)
const loadModel = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Usuario.hasMany(models.Oveja, { foreignKey: 'userId' })
    }
  }
  Usuario.init({
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    apellidos: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set (value) {
        this.setDataValue('password', bcrypt.hashSync(value, salt))
      }
    },
    token: {
      allowNull: true,
      type: DataTypes.STRING
    },
    tokenExpiration: {
      allowNull: true,
      type: DataTypes.DATE
    },
    nummeroTelefono: {
      allowNull: false,
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    direccion: {
      allowNull: false,
      type: DataTypes.STRING
    },
    codigoPostal: {
      allowNull: false,
      type: DataTypes.STRING
    },
    tipoUsuario: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: [
        'consumidor',
        'propietario'
      ]
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  },
  {
    indexes: [
      {
        fields: ['token']
      }
    ],
    sequelize,
    modelName: 'Usuario'
  })
  return Usuario
}
export default loadModel
