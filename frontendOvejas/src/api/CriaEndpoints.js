import {get, post, put, destroy} from './helpers/ApiRequestsHelper'

function getDetail(id) {
    return get(`/crias/${id}`)
}

function create(data) {
    return post('crias', data)
}

function update(id, data) {
    return put(`/crias/${id}`, data)
}

function remove(id){
    return destroy(`/crias/${id}`)
}

export { getDetail, remove, create, update}