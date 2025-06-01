import {Oveja, Cria } from '../models/models.js'

const index = async function (req, res) {
    try {
        const ovejas = await Oveja.findAll({
            include: [{
                model: Cria,
                as: 'Crias'
            }]
        })
        res.json(ovejas)
    } catch (err){
        res.status(500).send(err)
    }
}

const indexPropietario = async function (req, res) {
    try {
        const ovejas = await Oveja.findAll(
            {
                attributes: { exclude: ['userId']},
                where: {userId: req.user.id},
                include: [{
                    model: Cria,
                    as: 'Crias'
                }]
            }
        )
        res.json(ovejas)
    } catch (err){
        res.status(500).send(err)
    }
}

const show = async function (req, res) {
    try {
        const oveja = await Oveja.findByPk(req.params.ovejaId,{
            include: [{ model: Cria, as: 'Crias' }] });
        res.json(oveja);
    } catch (err) {
        res.status(500).send(err)
    }
}

const create = async function (req, res) {
    let newOveja = Oveja.build(req.body)
    try{
        newOveja = await newOveja.save()
        res.json(newOveja)
    } catch (err) {
        res.status(500).send(err)
    }
}

const update = async function (req,res) {
    try {
        await Oveja.update(req.body, { where: { id: req.params.ovejaId } })
        const updatedOveja = await Oveja.findByPk(req.params.ovejaId)
        res.json(updatedOveja)
    } catch (err) {
        res.status(500).send(err)
    }
}

const destroy = async function (req, res) {
  try {
    const result = await Oveja.destroy({ where: { id: req.params.ovejaId } })
    let message = ''
    if (result === 1) {
      message = 'Successfully deleted oveja id ' + req.params.ovejaId
    } else {
      message = 'Could not delete oveja'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

const OvejaController = {
    index,
    show,
    create,
    update,
    destroy,
    indexPropietario
}
export default OvejaController
