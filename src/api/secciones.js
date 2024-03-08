import axios from './axios'

export const GetRequest = () => axios.get(`/seccion`)
export const GetsRequest = id => axios.get(`/seccion/${id}`)
export const UpdateRequest = (id, data) => axios.put(`/seccion/${id}`, data)
export const DeleteRequest = id => axios.delete(`/seccion/${id}`)

export const CreateRequest = data => axios.post(`/seccion`, data)
