import { get } from "./helpers/ApiRequestsHelper";

function getResumen() {
    return get('/analytics/resumen');
}
export { getResumen}