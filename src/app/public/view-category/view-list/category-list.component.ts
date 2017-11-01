import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { listCategories } from '../../../global/list.categories';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {
  title = 'Manducare';
  category;
  specificRecipes: FirebaseListObservable<any[]>;
  itemsReturned: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      const category = urlParameters['category'];

      for (let i = 0; i < listCategories.length; i++) {
        if (listCategories[i].value === category) {
          this.category = listCategories[i].display;
        }
      }

      this.specificRecipes = this.db.list('/recipes', {
        query: {
          orderByChild: 'category',
          equalTo: category
        }
      });
      this.specificRecipes.subscribe((res) => {
        this.itemsReturned = res;
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
}
