import {ThemeType} from "@/constants";

export class ThemeService {
    private _currentTheme: ThemeType = ThemeType.Light;

    public get currentTheme(): ThemeType {
        return this._currentTheme;
    }

    public setCurrentTheme(value: ThemeType) {
        this._currentTheme = value;

        if (typeof document !== "undefined") {
            if (value === ThemeType.Dark) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    }
}
