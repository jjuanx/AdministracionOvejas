import { check } from 'express-validator'

const sexosPermitidos = ['macho', 'hembra']

const create = [
  check('id').exists().isInt({ min: 0, max: 999 }).withMessage('El ID debe tener exactamente 3 dígitos'),
  check('fechaNacimiento').exists().isISO8601().toDate(),
  check('sexo').exists().isIn(sexosPermitidos).withMessage('Sexo inválido'),
  check('ovejaId').exists().isInt().withMessage('Debe indicar una oveja madre válida'),
]

const update = [
  check('fechaNacimiento').optional().isISO8601().toDate(),
  check('sexo').optional().isIn(sexosPermitidos).withMessage('Sexo inválido'),
]

export { create, update }
