import * as OvejaValidation from "../controllers/validation/OvejaValidation.js"
import OvejaController from "../controllers/OvejaController.js"
import {handleValidation} from "../middleware/ValidationHandlingMiddleware.js"
import {isLoggedIn} from "../middleware/AuthMiddleware.js"

const loadOvejaRoutes = function(app) {
  app.route('/ovejas')
    .post(
      isLoggedIn,
      OvejaValidation.create,
      handleValidation,
      OvejaController.create
    )
    .get(
      isLoggedIn,
      OvejaController.index
    )

  app.route("/ovejas/:ovejaId")
    .get(
      isLoggedIn,
      OvejaController.show
    )
    .put(
      isLoggedIn,
      OvejaValidation.update,
      handleValidation,
      OvejaController.update
    )
    .patch(
      isLoggedIn,
      OvejaValidation.update,
      handleValidation,
      OvejaController.patch
    )
    .delete(
      isLoggedIn,
      OvejaController.destroy
    )
}

export default loadOvejaRoutes