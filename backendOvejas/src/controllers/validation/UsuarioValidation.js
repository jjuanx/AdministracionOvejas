// src/controllers/validation/UsuarioValidation.js
import { check } from 'express-validator'
import { checkFileIsImage, checkFileMaxSize } from './FileValidationHelper.js'

const maxFileSize = 2000000 // 2MB aprox.

const create = [
  check('nombre').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('apellidos').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('email').exists().withMessage('Required').isEmail().normalizeEmail(),
  check('password').exists().withMessage('Required').isStrongPassword({ minLength: 3 }),
  check('password').custom(value => !/\s/.test(value)).withMessage('No debe haber espacios en la contraseña'),
  check('nummeroTelefono').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('direccion').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('codigoPostal').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('avatar').custom((_, { req }) => checkFileIsImage(req, 'avatar')).withMessage('La imgen debe ser JPEG o PNG'),
  check('avatar').custom((_, { req }) => checkFileMaxSize(req, 'avatar', maxFileSize)).withMessage(`Tamaño maximo ${maxFileSize / 1000000}MB`)
]

const update = [
  check('nombre').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('apellidos').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('email').not().exists().withMessage('El email no puede ser actualizado'),
  check('numeroTelefono').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('direccion').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('codigoPostal').exists().withMessage('Required').isString().isLength({ min: 1, max: 255 }).trim(),
  check('avatar').custom((_, { req }) => checkFileIsImage(req, 'avatar')).withMessage('La imgen debe ser JPEG o PNG'),
  check('avatar').custom((_, { req }) => checkFileMaxSize(req, 'avatar', maxFileSize)).withMessage(`Tamaño maximo ${maxFileSize / 1000000}MB`)
]

const login = [
  check('email').exists().isString().isEmail().normalizeEmail(),
  check('password').exists().isString()
]

export { create, update, login }
