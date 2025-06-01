import { Usuario } from '../models/models.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import moment from 'moment'

const registerCustomer = async (req, res) => {
  await _register(req, res, 'consumidor')
}

const registroPropietario = async (req, res) => {
  await _register(req, res, 'propietario')
}

const findByToken = async (token) => {
  const user = await Usuario.findOne({
    where: { token },
    attributes: { exclude: ['password'] }
  })
  if (!user) throw new Error('Token no válido')
  if (user.tokenExpiration < new Date()) throw new Error('Token expirado')
  return user
}

const isTokenValid = async (req, res) => {
  try {
    const user = await findByToken(req.body.token)
    res.json(user)
  } catch (err) {
    res.status(403).send({ errors: err.message })
  }
}

const loginOwner = (req, res) => {
  _login(req, res, 'propietario')
}

const loginConsumidor = (req, res) => {
  _login(req, res, 'consumidor')
}

const show = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.userId, {
      attributes: ['id', 'nombre', 'apellidos', 'email', 'avatar', 'tipoUsuario']
    })
    res.json(user)
  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async (req, res) => {
  try {
    await Usuario.update(req.body, { where: { id: req.user.id } })
    const updated = await Usuario.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    })
    res.json(updated)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async (req, res) => {
  try {
    const result = await Usuario.destroy({ where: { id: req.user.id } })
    const msg = result === 1 ? 'Usuario eliminado correctamente' : 'No se pudo eliminar el usuario'
    res.json({ message: msg })
  } catch (err) {
    res.status(500).send(err)
  }
}

const _register = async (req, res, tipoUsuario) => {
  try {
    req.body.tipoUsuario = tipoUsuario
    const user = await Usuario.create(req.body)
    const updatedUser = await _updateToken(user.id, _createUserTokenDTO())
    res.json(updatedUser)
  } catch (err) {
    if (err.name.includes('ValidationError') || err.name.includes('SequelizeUniqueConstraintError')) {
      res.status(422).send(err)
    } else {
      res.status(500).send(err)
    }
  }
}

const _login = async (req, res, tipoUsuario) => {
  try {
    const user = await Usuario.findOne({
      where: { email: req.body.email, tipoUsuario }
    })
    if (!user) {
      res.status(401).send({ errors: [{ param: 'login', msg: 'Credenciales incorrectas' }] })
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password)
      if (!valid) {
        res.status(401).send({ errors: [{ param: 'login', msg: 'Credenciales incorrectas' }] })
      } else {
        const updatedUser = await _updateToken(user.id, _createUserTokenDTO())
        res.json(updatedUser)
      }
    }
  } catch (err) {
    res.status(401).send(err)
  }
}

const _updateToken = async (id, tokenDTO) => {
  const user = await Usuario.findByPk(id, {
    attributes: { exclude: ['password'] }
  })
  user.set(tokenDTO)
  return user.save()
}

const _createUserTokenDTO = () => ({
  token: crypto.randomBytes(20).toString('hex'),
  tokenExpiration: moment().add(1, 'hour').toDate()
})

const UsuarioController = {
  registerCustomer,
  registroPropietario,
  findByToken,
  isTokenValid,
  loginConsumidor,
  loginOwner,
  show,
  update,
  destroy
}

export default UsuarioController
