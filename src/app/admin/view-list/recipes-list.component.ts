import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Recipe } from '../../services/models/recipe';
import { RecipeService } from '../../services/recipe.service';
import { UploadService } from '../../services/upload.service';

import { AlertComponent } from '../../directives/alert/alert.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalComponent } from '../../directives/modal/modal.component';


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

  // Modal
  public modalRef: BsModalRef;
  private result;

  // Search Pipe
  public searchTerm;

  // sessionStorage
  currentUser;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private uploadService: UploadService,
    private modalService: BsModalService,
    db: AngularFireDatabase
  ) {

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

  remove(recipe): void {

    event.stopPropagation();

    this.modalRef = this.modalService.show(ModalComponent);
    this.modalRef.content.onClose.subscribe(result => {
      this.result = result;
      console.log('this.result: ', this.result);

      if (this.result === true) {
        this.recipeService
          .remove(recipe)
          .then(() => {
            this.childAlert.showAlert('success', `Rezept wurde erfolgreich entfernt! (Geändert am: ${(new Date()).toLocaleTimeString()})`);
          });
        console.log('recipe', recipe);
        this.uploadService.deleteFileData(recipe.$key);
      }
    })
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
