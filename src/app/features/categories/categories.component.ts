import { Component, OnInit } from '@angular/core';
import { Artist, Designer, Mechanic } from 'src/app/models/categories.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  artist: Artist = {};
  designer: Designer = {};
  mechanic: Mechanic = {};

  artists: Artist[] = [];
  designers: Designer[] = [];
  mechanics: Mechanic[] = [];

  displayArtistDialog: boolean;
  displayDesignerDialog: boolean;
  displayMechanicDialog: boolean;


  constructor(private readonly categoriesService: CategoryService) { }

  ngOnInit(): void {
    this.getArtists();
    this.getDesigners();
    this.getMechanics();
  }

  artistDialogClick() {
    this.artist = {};
    this.displayArtistDialog = true;
  }

  DesignerDialogClick() {
    this.designer = {};
    this.displayDesignerDialog = true;
  }

  MechanicDialogClick() {
    this.mechanic = {};
    this.displayMechanicDialog = true;
  }

  deleteArtistClick(id:number) {
    this.deleteArtist(id);
  }

  deleteDesignerClick(id:number) {
    this.deleteDesigner(id);

  }

  deleteMechanicClick(id:number) {
    this.deleteMechanic(id);
  }

  addArtistClick() {
    this.addArtist();
  }

  addDesignerClick() {
    this.addDesigner();
  }

  addMechanicClick() {
    this.addMechanic();
  }

  addArtist() {
    this.categoriesService.addArtist(this.artist).subscribe(
      response => {
        this.getArtists();
        this.displayArtistDialog = false;
      }
    )
  }

  addDesigner() {
    this.categoriesService.addDesigner(this.designer).subscribe(
      response => {
        this.getDesigners();
        this.displayDesignerDialog = false;
      }
    )
  }

  addMechanic() {
    this.categoriesService.addMechanic(this.mechanic).subscribe(
      response => {
        this.getMechanics();
        this.displayMechanicDialog = false;
      }
    )
  }

  getArtists() {
    this.categoriesService.getArtists().subscribe(
      response => {
        this.artists = response;
      }
    )
  }

  getDesigners() {
    this.categoriesService.getDesigners().subscribe(
      response => {
        this.designers = response;
      }
    )
  }

  getMechanics() {
    this.categoriesService.getMechanics().subscribe(
      response => {
        this.mechanics = response;
      }
    )
  }

  deleteArtist(id:number) {
    this.categoriesService.deleteArtist(id).subscribe(
      response => {
        this.getMechanics();
      }
    )
  }

  deleteDesigner(id : number) {
    this.categoriesService.deleteDesigner(id).subscribe(
      response => {
        this.getDesigners()
      }
    )
  }

  deleteMechanic(id:number) {
    this.categoriesService.deleteMechanic(id).subscribe(
      response => {
        this.getMechanics();
      }
    )
  }
}