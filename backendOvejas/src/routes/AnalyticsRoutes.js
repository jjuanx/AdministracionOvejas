// src/routes/crias.routes.js
import { isLoggedIn } from '../middlewares/AuthMiddleware.js'
import AnalyticsController from '../controllers/AnalyticsController.js';


const loadFileRoutes = (app) => {
    app.route('/analytics/resumen')
        .get(
            isLoggedIn,
            AnalyticsController.resumen
        )
}
export default loadFileRoutes