import * as OvejasValidation from "../controllers/validation/OvejaValidation.js"
import OvejaController from "../controllers/OvejaController.js"
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import * as OvejaMiddleware from '../middlewares/OvejaMiddleware.js'
import {Oveja} from '../models/models.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import CriaController from "../controllers/CriaController.js"



const loadFileRoutes = function (app) {
    app.route('/ovejas')
        .get(
            OvejaController.index
        )
        .post(
            isLoggedIn,
            hasRole('propietario'),
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
            isLoggedIn,
            hasRole('propietario'),
            checkEntityExists(Oveja, 'ovejaId'),
            OvejaMiddleware.checkOvejaPropietario,
            OvejasValidation.update,
            handleValidation,
            OvejaController.update
        )
        .delete(
            isLoggedIn,
            hasRole('propietario'),
            checkEntityExists(Oveja, 'ovejaId'),
            OvejaMiddleware.checkOvejaPropietario,
            OvejaController.destroy
        )
    app.route('/ovejas/:ovejaId/crias')
        .get(
            checkEntityExists(Oveja, 'ovejaId'),
            CriaController.indexByOveja
        )
}
export default loadFileRoutes