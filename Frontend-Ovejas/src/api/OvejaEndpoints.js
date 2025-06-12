import {get, post, put, destroy} from './helpers/ApiRequestsHelper'

function getAll()  {
    return get('/usuarios/myOvejas')
}

function getDetail(id) {
    return get(`/ovejas/${id}`)
}

function create(data) {
    return post('ovejas', data)
}

function update(id, data) {
    return put(`/ovejas/${id}`, data)
}

function remove(id){
    return destroy(`/ovejas/${id}`)
}

export {getAll, getDetail, remove, create, update}