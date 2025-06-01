import * as UsuarioValidation from '../controllers/validation/UsuarioValidation.js'
import UsuarioController from '../controllers/UsuarioController.js'
import { Usuario } from '../models/models.js'
//import RestaurantController from '../controllers/RestaurantController.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import { handleFilesUpload } from '../middlewares/FileHandlerMiddleware.js'
import OvejaController from '../controllers/OvejaController.js'

const loadFileRoutes = function (app) {
  app.route('/usuarios')
    .put(
      isLoggedIn,
      handleFilesUpload(['avatar'], process.env.AVATARS_FOLDER),
      UsuarioValidation.update,
      handleValidation,
      UsuarioController.update)
    .delete(
      isLoggedIn,
      UsuarioController.destroy)
  app.route('/usuarios/registro')
    .post(
      handleFilesUpload(['avatar'], process.env.AVATARS_FOLDER),
      UsuarioValidation.create,
      handleValidation,
      UsuarioController.registerCustomer)
  app.route('/usuarios/registroPropietario')
    .post(
      handleFilesUpload(['avatar'], process.env.AVATARS_FOLDER),
      UsuarioValidation.create,
      handleValidation,
      UsuarioController.registroPropietario)
  app.route('/usuarios/login')
    .post(
      UsuarioValidation.login,
      handleValidation,
      UsuarioController.loginConsumidor)
  app.route('/usuarios/loginPropietario')
    .post(
      UsuarioValidation.login,
      handleValidation,
      UsuarioController.loginOwner)
  app.route('/usuarios/isTokenValid')
    .put(UsuarioController.isTokenValid)
  app.route('/usuarios/myOvejas')
    .get(
      isLoggedIn,
      hasRole('propietario'),
      OvejaController.indexPropietario)
  app.route('/usuarios/:userId')
    .get(
      checkEntityExists(Usuario, 'userId'),
      isLoggedIn,
      UsuarioController.show)
}
export default loadFileRoutes
