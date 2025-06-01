import { Cria, Oveja } from '../models/models.js';

const index = async function (req, res) {
  try {
    const crias = await Cria.findAll({
      include: [{ model: Oveja, as: 'Madre' }]
    });
    res.json(crias);
  } catch (err) {
    res.status(500).send(err);
  }
};

const indexByOveja = async (req, res) => {
  try {
    const crias = await Cria.findAll({
      where: { ovejaId: req.params.ovejaId }
    })
    res.json(crias)
  } catch (err) {
    res.status(500).send(err.message)
  }
}



const show = async function (req, res) {
  try {
    const cria = await Cria.findByPk(req.params.criaId, {
      include: [{ model: Oveja, as: 'Madre' }]
    });
    res.json(cria);
  } catch (err) {
    res.status(500).send(err);
  }
};


const create = async function (req, res) {
  let newCria = Cria.build(req.body);
  try {
    newCria = await newCria.save();
    res.json(newCria);
  } catch (err) {
    res.status(500).send(err);
  }
};


const update = async function (req, res) {
  try {
    await Cria.update(req.body, { where: { id: req.params.criaId } });
    const updatedCria = await Cria.findByPk(req.params.criaId);
    res.json(updatedCria);
  } catch (err) {
    res.status(500).send(err);
  }
};


const destroy = async function (req, res) {
  try {
    const result = await Cria.destroy({ where: { id: req.params.criaId } });
    let message = '';
    if (result === 1) {
      message = 'Successfully deleted cria id ' + req.params.criaId;
    } else {
      message = 'Could not delete cria';
    }
    res.json(message);
  } catch (err) {
    res.status(500).send(err);
  }
};

const CriaController = { index, show, create, update, destroy, indexByOveja };
export default CriaController;
