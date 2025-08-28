import { ApiAccessService } from '../api-access-service'
import { EventAggregator } from '../event-aggregator/event-aggregator'

interface LoginResponse {
  token: string
  username: string
}

interface SessionData {
  token: string
  username: string
}

export class LoginService {
  private sessionKey = 'user_session'
  private api: ApiAccessService
  private ea: EventAggregator

  constructor(
    apiAccessService: ApiAccessService,
    eventAgregator: EventAggregator
  ) {
    this.api = apiAccessService
    this.ea = eventAgregator
  }

  public async login(username: string, password: string): Promise<boolean> {
    const res = await this.api.axiosPost<LoginResponse>(
      `/api/auth/login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`
    )

    if (res.status === 200 && res.data?.token) {
      const session: SessionData = {
        token: res.data.token,
        username: username,
      }
      localStorage.setItem(this.sessionKey, JSON.stringify(session))

      this.ea.publish('login', { username })
      return true
    }

    return false
  }

  public logout() {
    localStorage.removeItem(this.sessionKey)
  }

  public getToken(): string | null {
    const session = this.getSession()
    return session?.token || null
  }

  public getUsername(): string | null {
    const session = this.getSession()
    return session?.username || null
  }

  public isLoggedIn(): boolean {
    return !!this.getToken()
  }

  private getSession(): SessionData | null {
    const sessionStr = localStorage.getItem(this.sessionKey)
    if (!sessionStr) return null
    try {
      return JSON.parse(sessionStr) as SessionData
    } catch {
      return null
    }
  }
}
