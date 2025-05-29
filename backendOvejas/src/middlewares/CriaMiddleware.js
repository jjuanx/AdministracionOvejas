import { Cria, Oveja } from '../models/models.js';

const checkCriaPropietario = async (req, res, next) => {
  try {
    const cria = await Cria.findByPk(req.params.criaId, {
      include: [{ model: Oveja, as: 'Madre' }]
    });
    if (!cria) {
      return res.status(404).send('Cría no encontrada');
    }
    // Asumimos que Oveja tiene campo userId
    if (req.user.id === cria.Madre.userId) {
      return next();
    }
    return res.status(403).send('No tienes privilegios sobre esta cría');
  } catch (err) {
    return res.status(500).send(err);
  }
};

export {checkCriaPropietario}