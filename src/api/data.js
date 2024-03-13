import axios from './axios'

// ? Data 
export const GetRequest = () => axios.get(`/data`)

export const GetAllRequest = () => axios.get(`/data-all/`)

export const GetsRequest = id => axios.get(`/data/${id}`)

export const CreateRequest = data => axios.post(`/data`, data)

export const UpdateRequest = (id, data) => axios.put(`/data/${id}`, data)

export const DeleteRequest = id => axios.delete(`/data/${id}`)

// ? Estadisticas

export const GetAnalytics = () => axios.get(`/data-estadisticas`)
export const GetSeccion = data => axios.post(`/data-estadisticas`, data)



