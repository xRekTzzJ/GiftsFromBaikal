'use client'

import { ThemeService } from '@/services/theme-service'
import { ApiAccessService } from './api-access-service'
import { EventAggregator } from './event-aggregator/event-aggregator'
import { LoginService } from './login-service'

export class ServiceContainer {
  private readonly _themeService = new ThemeService()

  private readonly _eventAgregator = new EventAggregator()

  private readonly _apiAccessService = new ApiAccessService()

  private readonly _loginService = new LoginService(
    this.apiAccessService(),
    this.eventAgregator()
  )

  public themeService() {
    return this._themeService
  }

  public loginService() {
    return this._loginService
  }

  public apiAccessService() {
    return this._apiAccessService
  }

  public eventAgregator() {
    return this._eventAgregator
  }
}
