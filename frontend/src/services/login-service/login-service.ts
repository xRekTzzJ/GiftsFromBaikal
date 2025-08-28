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
  private session: SessionData | null = null

  constructor(
    apiAccessService: ApiAccessService,
    eventAggregator: EventAggregator
  ) {
    this.api = apiAccessService
    this.ea = eventAggregator
  }

  // вызывается только на клиенте после монтирования компонента
  public initClientSession() {
    if (typeof window === 'undefined') return // защита на сервере

    const storedSession = localStorage.getItem(this.sessionKey)
    if (storedSession) {
      try {
        this.session = JSON.parse(storedSession) as SessionData
        if (this.session?.token) {
          this.ea.publish('login', { username: this.session.username })
        }
      } catch {
        this.session = null
      }
    }
  }

  public async login(username: string, password: string): Promise<boolean> {
    const res = await this.api.axiosPost<LoginResponse>(
      `/api/auth/login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`
    )

    if (res.status === 200 && res.data?.token) {
      const session: SessionData = { token: res.data.token, username }
      this.session = session

      if (typeof window !== 'undefined') {
        localStorage.setItem(this.sessionKey, JSON.stringify(session))
      }

      this.ea.publish('login', { username })
      return true
    }

    return false
  }

  public logout() {
    this.session = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.sessionKey)
    }
    this.ea.publish('logout')
  }

  public getToken(): string | null {
    return this.session?.token || null
  }

  public getUsername(): string | null {
    return this.session?.username || null
  }

  public isLoggedIn(): boolean {
    return !!this.getToken()
  }
}
