import {Oveja, Cria, sequelizeSession} from '../models/models.js'

const resumen = async (req, res) => {
    try {
        const userId = req.user.id
        const totalOvejas = await Oveja.count({where: {userId: userId}})
        const totalCrias = await Cria.count({
            include: [{model: Oveja, as: 'Madre', attributes: [], where: {userId: userId}}]
        })

        const estados = await Oveja.findAll({
            where: {userId: userId},
            attributes: [
                'estado',
                [sequelizeSession.fn('COUNT', sequelizeSession.col('estado')), 'count']
            ],
            group: ['estado']
        })

        const edadMedia = await Oveja.findOne({
            where: {userId: userId},
            attributes: [[sequelizeSession.fn('AVG', sequelizeSession.literal('TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE())')), 'prom']]
        })

        const criasVivas = await Cria.count({
            where: { viva: true },
            include: [{model: Oveja, as: 'Madre', attributes: [], where: {userId: userId}}]
        })

        const criasMuertas = await Cria.count({
            where: { viva: false },
            include: [{model: Oveja, as: 'Madre', attributes: [], where: {userId: userId}}]
        })

        res.json({
            totalOvejas,
            totalCrias,
            estados: estados.reduce((acc, e) => ({ ...acc, [e.estado]: Number(e.dataValues.count)}), {}),
            edadMedia: Number(edadMedia.dataValues.prom).toFixed(1),
            criasVivas,
            criasMuertas
        }
        )
    } catch(err) {
        res.status(500).send(err)
    }
}
const AnalyticsController = { resumen };
export default AnalyticsController;