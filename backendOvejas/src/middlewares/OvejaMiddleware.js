import {Oveja} from '../models/models.js'

const checkOvejaPropietario = async (req, res, next) => {
  try {
    const oveja = await Oveja.findByPk(req.params.ovejaId);
    if (!oveja) {
      return res.status(404).send('Oveja no encontrada');
    }
    // Asumimos que Oveja tiene campo userId
    if (req.user.id === oveja.userId) {
      return next();
    }
    return res.status(403).send('No tienes privilegios sobre esta oveja');
  } catch (err) {
    return res.status(500).send(err);
  }
};

export {checkOvejaPropietario}