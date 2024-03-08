import axios from './axios'

export const GetRequest = () => axios.get(`/coordinador`)
export const GetsRequest = id => axios.get(`/coordinador/${id}`)
export const UpdateRequest = (id, data) => axios.put(`/coordinador/${id}`, data)
export const DeleteRequest = id => axios.delete(`/coordinador/${id}`)

export const CreateRequest = data => axios.post(`/coordinador`, data)
