'use client'
import { ThemeType } from '@/constants'

export class ThemeService {
  private _currentTheme: ThemeType = ThemeType.Light

  constructor() {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null
    if (savedTheme) {
      this._currentTheme = savedTheme
      this.applyTheme(this._currentTheme)
    } else {
      // можно по умолчанию использовать prefers-color-scheme
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      this._currentTheme = prefersDark ? ThemeType.Dark : ThemeType.Light
      this.applyTheme(this._currentTheme)
      localStorage.setItem('theme', this._currentTheme)
    }
  }

  public get currentTheme(): ThemeType {
    return this._currentTheme
  }

  public toggleCurrentTheme() {
    this._currentTheme =
      this._currentTheme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light
    this.applyTheme(this._currentTheme)
    localStorage.setItem('theme', this._currentTheme)
  }

  private applyTheme(theme: ThemeType) {
    if (typeof document !== 'undefined') {
      if (theme === ThemeType.Dark) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    }
  }
}
