import { api } from "../api";

interface LoginResponse {
  token: string;
  username: string;
}

interface SessionData {
  token: string;
  username: string;
}

const SESSION_KEY = "user_session";

export class AuthService {
  static async login(username: string, password: string) {
    const res = await api.post<LoginResponse>(`/auth/login`, null, {
      params: { username, password },
    });

    if (res.status === 200 && res.data?.token) {
      const session: SessionData = {
        token: res.data.token,
        username: res.data.username,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }

    throw new Error("Login failed");
  }

  static logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  static getSession(): SessionData | null {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr) as SessionData;
    } catch {
      return null;
    }
  }

  static isLoggedIn(): boolean {
    return !!this.getSession()?.token;
  }
}
