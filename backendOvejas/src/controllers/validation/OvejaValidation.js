import { check } from 'express-validator'

const estadosPermitidos = ['buena', 'regular', 'mala']

const create = [
  check('id').exists().isInt({ min: 10000000, max: 99999999 }).withMessage('El ID debe tener exactamente 8 dígitos'),
  check('fechaUltimoParto').exists().isISO8601().toDate(),
  check('estado').exists().isIn(estadosPermitidos).withMessage('Estado inválido'),
]

const update = [
  check('fechaUltimoParto').optional().isISO8601().toDate(),
  check('estado').optional().isIn(estadosPermitidos).withMessage('Estado inválido'),
]

export { create, update }
