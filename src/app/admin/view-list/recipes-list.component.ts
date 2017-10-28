import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Recipe } from '../../services/recipe';
import { RecipeService } from '../../services/recipe.service';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../services/upload';

import { AlertComponent } from '../../directives/alert/alert.component';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { ModalContentComponent } from '../directives/modal/modal.component';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.less']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];
  allRecipes: FirebaseListObservable<any[]>;

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
    private uploadService: UploadService,
    db: AngularFireDatabase,
    private modalService: BsModalService) {

    // TODO: Not clean at the moment / Improve it! It is provisional version for now
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.currentUser != null) {
      console.log('this.currentUser: ', this.currentUser);

      this.allRecipes = db.list('/recipes', {
        query: {
          orderByChild: 'uid',
          equalTo: this.currentUser.uid
        }
      })
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

  remove(recipe): void {
    this.recipeService
      .remove(recipe)
      .then(() => {
        this.childAlert.showAlert('success', `Rezept wurde erfolgreich entfernt! (Geändert am: ${(new Date()).toLocaleTimeString()})`);
      });
    console.log('recipe', recipe);
    this.uploadService.deleteFileData(recipe.$key);
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
