import * as OvejasValidation from "../controllers/validation/OvejaValidation.js"
import OvejaController from "../controllers/OvejaController.js"
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import * as OvejaMiddleware from '../middlewares/OvejaMiddelware.js'
import {Oveja} from '../models/oveja.js'


const loadFileRoutes = function (app) {
    app.route('/ovejas')
        .get(
            OvejaController.index
        )
        .post(
            OvejasValidation.create,
            handleValidation,
            OvejaController.create
        )
    
    app.route('/ovejas/:ovejaId')
        .get(
            checkEntityExists(Oveja, 'ovejaId'),
            OvejaController.show
        )
        .put(
            checkEntityExists(Oveja, 'ovejaId'),
            OvejaMiddleware.checkOvejaPropietario,
            OvejasValidation.update,
            handleValidation,
            OvejaController.update
        )
        .delete(
            checkEntityExists(Oveja, 'ovejaId'),
            OvejaMiddleware.checkOvejaPropietario,
            OvejaController.destroy
        )
}
export default loadFileRoutes