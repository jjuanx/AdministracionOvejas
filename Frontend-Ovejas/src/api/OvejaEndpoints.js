import {get} from './helpers/ApiRequestsHelper'

function getAll()  {
    return get('/usuarios/myOvejas')
}

function getDetail(id) {
    return get(`/ovejas/${id}`)
}

export {getAll, getDetail}