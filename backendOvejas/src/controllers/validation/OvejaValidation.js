import { check } from 'express-validator'

const estadosPermitidos = ['buena', 'regular', 'mala']

const create = [
  check('id').exists().isInt({ min: 10000000, max: 99999999 }).withMessage('El ID debe tener exactamente 8 dígitos'),
  check('fechaUltimoParto').exists().isISO8601().toDate(),
  check('estado').exists().isIn(estadosPermitidos).withMessage('Estado inválido'),
  check('fechaNacimiento').exists().isDate().withMessage('La Fecha de Nacimiento debe ser una fecha valida')
]

const update = [
  check('fechaUltimoParto').optional().isISO8601().toDate(),
  check('estado').optional().isIn(estadosPermitidos).withMessage('Estado inválido'),
  check('fechaNacimiento').optional().isDate().withMessage('La Fecha de Nacimiento debe ser una fecha valida')
]

export { create, update }
