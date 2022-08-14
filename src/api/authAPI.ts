import {instance} from 'api/instance'
import {LoginParamsType} from 'api/ParamsTypes'
import {AuthUserDataType, ResponseType} from 'api/ResponseTypes'

export const authAPI = {
  me() {
    return instance.get<ResponseType<AuthUserDataType>>('auth/me')
  },
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  }
}