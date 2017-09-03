import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Category } from '../services/basis-data-category';
import { BasisDataCategoryService } from '../services/basis-data-category.service';

@Component({
  templateUrl: './basis-data-category.component.html'
})
export class BasisDataCategoryComponent implements OnInit {

  allCategories: FirebaseListObservable<any[]>;

  constructor(private router: Router, private categoryService: BasisDataCategoryService, db: AngularFireDatabase) {
    this.allCategories = db.list('/categories');
  }

  getCategories(): void {
    this.categoryService.getCategories().then(categories => this.allCategories);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.categoryService.create(name)
      .then(category => {
        // Test
      });
  }

  remove(id): void {
    this.categoryService
      .remove(id)
      .then(() => {

      });
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
