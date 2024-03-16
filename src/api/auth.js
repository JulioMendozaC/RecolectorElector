import axios from './axios'

export const loginRequest = user => axios.post(`/login`, user)
export const RegisterRequest = user => axios.post(`/register`, user)

export const UsersRequest = () => axios.get(`/users`)
export const UserRequest = id => axios.get(`/user/${id}`)
export const UserUpdateRequest = (id, data) => axios.put(`/users/${id}`, data)
export const UserDeleteRequest = id => axios.delete(`/users/${id}`)

export const verifyRequest = () => axios.get(`/verify`)