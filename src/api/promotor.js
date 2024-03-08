import axios from './axios'

export const GetRequest = () => axios.get(`/promotor`)
export const GetsRequest = id => axios.get(`/promotor/${id}`)
export const UpdateRequest = (id, data) => axios.put(`/promotor/${id}`, data)
export const DeleteRequest = id => axios.delete(`/promotor/${id}`)

export const CreateRequest = data => axios.post(`/promotor`, data)
