import { Injectable } from "@angular/core";
import { AppConfigurationService } from 'src/app/core/app-configuration/app-configuration.service';
import { HttpService } from 'src/app/core/http/http.service';
import { Artist, Designer, Mechanic } from 'src/app/models/categories.model';

@Injectable()
export class CategoryService {

    private get apiBaseUri() { return `${this.appConfigService.getAppConfig('apiBaseUri')}/api/category`; }

    constructor(
        private readonly httpService: HttpService,
        private readonly appConfigService: AppConfigurationService) { }

    addArtist(artist: Artist) {
        return this.httpService.post<Artist>(`${this.apiBaseUri}/addArtist`, artist)
    }

    addDesigner(designer: Designer) {
        return this.httpService.post<Artist>(`${this.apiBaseUri}/addDesigner`, designer)
    }

    addMechanic(mechanic: Mechanic) {
        return this.httpService.post<Artist>(`${this.apiBaseUri}/addMechanic`, mechanic)
    }

    getArtists() {
        return this.httpService.get<Artist[]>(`${this.apiBaseUri}/getArtists`)
    }

    getDesigners() {
        return this.httpService.get<Designer[]>(`${this.apiBaseUri}/getDesigners`)
    }

    getMechanics() {
        return this.httpService.get<Mechanic[]>(`${this.apiBaseUri}/getMechaincs`)
    }

    deleteArtist(id: number) {
        return this.httpService.post<Artist>(`${this.apiBaseUri}/deleteArtist`, { id })
    }

    deleteDesigner(id: number) {
        return this.httpService.post<Designer>(`${this.apiBaseUri}/deleteDesigner`, { id })
    }

    deleteMechanic(id: number) {
        return this.httpService.post<Mechanic>(`${this.apiBaseUri}/deleteMechanic`, { id })
    }
}