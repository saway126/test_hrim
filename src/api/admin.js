// 예시: src/api/admin.js
import axios from 'axios'

export const getAdminById = (id) => {
  return axios.get(`/api/admin/${id}`)
}

export const updatePermissions = (id, permissions) => {
  return axios.post(`/api/admin/${id}/permissions`, { permissions })
}
