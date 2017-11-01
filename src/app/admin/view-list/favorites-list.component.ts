import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Favorite } from '../../services/models/favorite';
import { FavoriteService } from '../../services/favorite.service';

import { AlertComponent } from '../../directives/alert/alert.component';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { ModalContentComponent } from '../directives/modal/modal.component';
// import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.less']
})
export class FavoritesListComponent implements OnInit {
  favorite: Favorite[];
  allFavorites: FirebaseListObservable<any[]>;

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
    private favoriteService: FavoriteService,
    db: AngularFireDatabase,
    private modalService: BsModalService) {

    // TODO: Not clean at the moment / Improve it! It is provisional version for now
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.currentUser != null) {
      console.log('this.currentUser: ', this.currentUser);

      this.allFavorites = db.list('/favorites', {
        query: {
          orderByChild: 'uid',
          equalTo: this.currentUser.uid
        }
      })
    }
  }

  remove(id): void {
    console.log('id: ', id);
    this.favoriteService
      .remove(id)
      .then(() => {
        this.childAlert.showAlert('success', `Lieblingsrezept wurde erfolgreich entfernt! (Geändert am: ${(new Date()).toLocaleTimeString()})`);
      });
  }

  ngOnInit(): void {
    // Get the currentUser from the sessionStorage
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  detail(recipe): void {
    this.router.navigate(['/admin/recipe-detail', recipe.$key]);
  }
}
