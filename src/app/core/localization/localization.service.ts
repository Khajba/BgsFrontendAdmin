import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../Constants';
import { Language } from './language';

@Injectable({
    providedIn: 'root'
})
export class LocalizationService {
    private defaultLanguage: Language = { id: 1, name: "English", tag: "en-US" };
    currentLanguage$: BehaviorSubject<Language> = new BehaviorSubject<Language>(this.defaultLanguage);

    get currentLanguage() {
        return this.currentLanguage$.value;
    }

    setLanguage(language: Language): void {
        localStorage.setItem(Constants.KEY_LANGUAGE, JSON.stringify(language));

        window.location.reload();
    }
}