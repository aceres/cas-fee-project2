import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Recipe } from '../../services/models/recipe';
import { RecipeService } from '../../services/recipe.service';

import { AlertComponent } from '../../directives/alert/alert.component';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { ModalContentComponent } from '../directives/modal/modal.component';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-all-recipes-list',
  templateUrl: './all-recipes-list.component.html',
  styleUrls: ['./all-recipes-list.component.less']
})
export class AllRecipesListComponent implements OnInit {
  recipes: Recipe[];
  allRecipes: FirebaseListObservable<any[]>;

  public maxSize : number = 5;
  public bigTotalItems : number = 175;
  public bigCurrentPage : number = 1;
  public numPages : number = 0;

  // Alert
  @ViewChild('childAlert') public childAlert: AlertComponent;

  // Search Pipe
  public searchTerm;

  // sessionStorage
  currentUser;

  // Modal
  // bsModalRef: BsModalRef;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    db: AngularFireDatabase,
    private modalService: BsModalService) {

    // TODO: Not clean at the moment / Improve it! It is provisional version for now
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.currentUser != null) {
      console.log('this.currentUser: ', this.currentUser);

      this.allRecipes = db.list('/recipes')
    }
  }

  // public openModalWithComponent() {
  //   const list = ['Open a modal with component', 'Pass your data', 'Do something else', '...'];
  //   this.bsModalRef = this.modalService.show(ModalContentComponent);
  //   this.bsModalRef.content.title = 'Modal with component';
  //   this.bsModalRef.content.list = list;
  //   setTimeout(() => {
  //     list.push('PROFIT!!!');
  //   }, 2000);
  // }

  remove(id): void {
    this.recipeService
      .remove(id)
      .then(() => {
        this.childAlert.showAlert('success', `Rezept wurde erfolgreich entfernt! (Geändert am: ${(new Date()).toLocaleTimeString()})`);
      });
  }

  ngOnInit(): void {
    // Get the currentUser from the sessionStorage
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log('this.currentUser: ', this.currentUser);
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  detail(recipe): void {
    this.router.navigate(['/admin/recipe-detail', recipe.$key]);
  }
}
