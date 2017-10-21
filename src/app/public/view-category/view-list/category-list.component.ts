import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']
})
export class CategoryListComponent implements OnInit {
  title = 'What to cook?';
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
      console.log('category: ', category);
      this.category = category;

      this.specificRecipes = this.db.list('/recipes', {
        query: {
          orderByChild: 'category',
          equalTo: category
        }
      });
      this.specificRecipes.subscribe((res) => {
        this.itemsReturned = res;

        console.log('this.specificRecipes: ', this.itemsReturned);
      });


      // this.specificRecipes = this.db.list('/recipes', ref => ref.orderByChild('category').equalTo(category))
      // console.log('specificRecipes: ', this.specificRecipes);
    });
    // this.category = this.route.snapshot.params['category'];
  }

  goBack(): void {
    this.location.back();
  }
}
