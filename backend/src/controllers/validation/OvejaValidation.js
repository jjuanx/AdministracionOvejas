// backend/src/controllers/validation/OvejaValidation.js
import Joi from 'joi';

const baseSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9]{8}$/).required(),
  fechaAlto: Joi.date().required(),
  edad: Joi.number().integer().min(0).required(),
  estado: Joi.string().valid('buena','regular','mala').required(),
  vecesParida: Joi.number().integer().min(0).required(),
  sexo: Joi.string().valid('macho','hembra').required()
});

export const create = (req, _res, next) => {
  const { error } = baseSchema.validate(req.body, { abortEarly: false });
  if (error) {
    req.validationError = error;
  }
  next();
};

export const update = (req, _res, next) => {
  // Para PATCH/PUT permitimos parcial, así que todas las propiedades opcionales
  const schema = baseSchema.fork(Object.keys(baseSchema.describe().keys), (field) =>
    field.optional()
  );
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    req.validationError = error;
  }
  next();
};
