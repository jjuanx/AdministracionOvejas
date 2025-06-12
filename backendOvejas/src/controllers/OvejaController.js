import {Oveja, Cria } from '../models/models.js'

const criaAttrs = {model: Cria, as: 'Crias', attributes: ['id','viva', 'fechaNacimiento']}

const index = async function (req, res) {
    try {
        const ovejas = await Oveja.findAll({
            include: [criaAttrs],
            order: [['id', 'ASC']]
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
                include: [criaAttrs],
                order: [['id','ASC']]
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
            attributes: { exclude: ['userId']},
            include: [
                { model: Cria, as: 'Crias', attributes: ['id','viva', 'fechaNacimiento', 'sexo']}
            ]
        })
        res.json(oveja)
    } catch (err) {
        res.status(500).send(err)
    }
}

const create = async function (req, res) {
    try{
        const newOveja = await Oveja.create({
            ...req.body,
            userId: req.user.id
        })

        const created = await Oveja.findByPk(newOveja.id, {
            attributes: {exclude: ['userId']},
            include: [criaAttrs]
        })

        res.status(201).json(created)
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
