import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
      'API-KEY': '38a59e07-59b4-45d3-8d3c-f82bb3a752f7'
    }
  }
)