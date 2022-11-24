import axios from 'axios'


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
})

export const getUsers = async () => {
  const res = await axiosInstance.get('/users')
  return res?.data
}

export const addNewUser = async (payload) => {
  return await axiosInstance.post('/users', payload)
}

export const updateUser = async (payload) => {
  return await axiosInstance.patch('/users', payload)
}

export const deleteUser = async (payload) => {
  return await axiosInstance.delete('/users', {
    data: payload
  })
}