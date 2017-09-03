import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Cuisine } from '../services/basis-data-cuisine';
import { BasisDataCuisineService } from '../services/basis-data-cuisine.service';

@Component({
  templateUrl: './basis-data-cuisine.component.html'
})
export class BasisDataCuisineComponent implements OnInit {

  allCuisines: FirebaseListObservable<any[]>;

  constructor(private router: Router, private cuisineService: BasisDataCuisineService, db: AngularFireDatabase) {
    this.allCuisines = db.list('/cuisines');
  }

  getCategories(): void {
    this.cuisineService.getCuisines().then(cuisines => this.allCuisines);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.cuisineService.create(name)
      .then(cuisine => {
        // Test
      });
  }

  remove(id): void {
    this.cuisineService
      .remove(id)
      .then(() => {

      });
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
