'use client'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LoginService } from '../login-service'

export class ApiAccessService {
  private axiosInstance = axios
  private baseHost = 'http://localhost:5008'

  private loginService?: LoginService

  public setLoginService(loginService: LoginService) {
    this.loginService = loginService
  }

  constructor() {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.loginService?.getToken()
      if (token) (config.headers as any).Authorization = `Bearer ${token}`
      return config
    })
  }

  private async _safeRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T>> {
    try {
      return await requestFn()
    } catch (error: any) {
      return {
        data: null as unknown as T,
        status: error?.response?.status || 500,
        statusText:
          error?.response?.statusText ||
          'Произошла ошибка. Возможно сервер недоступен',
        headers: error?.response?.headers || {},
        config: error?.config || {},
      } as AxiosResponse<T>
    }
  }

  public async axiosGet<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._safeRequest(() =>
      this.axiosInstance.get<T>(this.baseHost + url, config)
    )
  }

  public async axiosPost<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._safeRequest(() =>
      this.axiosInstance.post<T>(this.baseHost + url, data, config)
    )
  }

  public async axiosPut<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._safeRequest(() =>
      this.axiosInstance.put<T>(this.baseHost + url, data, config)
    )
  }

  public async axiosDelete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this._safeRequest(() =>
      this.axiosInstance.delete<T>(this.baseHost + url, config)
    )
  }
}
