import { ThemeType } from "@/constants"
import Cookies from "js-cookie"

export class ThemeService {
    constructor() {
        if (typeof window !== "undefined") {
            const themeFromCookie = Cookies.get("theme") as ThemeType | undefined;
            if (themeFromCookie) {
                this._currentTheme = themeFromCookie;
                this.applyTheme(this._currentTheme);
            }
        }
    }

    private _currentTheme: ThemeType = ThemeType.Light;

    public get currentTheme(): ThemeType {
        return this._currentTheme;
    }

    public toggleCurrentTheme() {
        this._currentTheme = this._currentTheme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light;
        this.applyTheme(this._currentTheme);
        Cookies.set("theme", this._currentTheme, {expires: 365, path: "/"});
    }

    private applyTheme(theme: ThemeType) {
        if (typeof document !== "undefined") {
            if (theme === ThemeType.Dark) {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
        }
    }
}
