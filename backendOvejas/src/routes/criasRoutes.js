// src/routes/crias.routes.js
import * as CriaValidation from '../controllers/validation/CriaValidation.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import CriaController from '../controllers/CriaController.js'
import * as CriaMiddleware from '../middlewares/CriaMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js';
import { Cria } from '../models/models.js';
import { hasRole, isLoggedIn } from '../middlewares/AuthMiddleware.js'


const loadFileRoutes = (app) => {
    app.route('/crias')
        .get(
            CriaController.index
        )
        .post(
            isLoggedIn,
            hasRole('propietario'),
            CriaValidation.create,
            handleValidation,
            CriaMiddleware.checkCriaOvejaPropietario,
            CriaController.create
        )
    
    app.route('/crias/:criaId')
        .get(
            checkEntityExists(Cria, 'criaId'),
            CriaController.show
        )
        .put(
            isLoggedIn,
            hasRole('propietario'),
            checkEntityExists(Cria, 'criaId'),
            CriaMiddleware.checkCriaPropietario,
            CriaValidation.update,
            handleValidation,
            CriaController.update
        )
        .delete(
            isLoggedIn,
            hasRole('propietario'),
            checkEntityExists(Cria, 'criaId'),
            CriaMiddleware.checkCriaPropietario,
            CriaController.destroy
        )
}

export default loadFileRoutes