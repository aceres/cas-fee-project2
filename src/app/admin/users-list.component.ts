import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Register } from '../services/register';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {
  users: Register[];
  allUsers: FirebaseListObservable<any[]>;

  constructor(private router: Router, private registerService: RegisterService, db: AngularFireDatabase) {
    this.allUsers = db.list('/users');
  }

  getRecipes(): void {
    this.registerService.getUsers().then(users => this.allUsers);
  }

  ngOnInit(): void {
    this.getRecipes();
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
