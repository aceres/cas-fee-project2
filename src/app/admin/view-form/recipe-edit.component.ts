import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { listCategories } from '../../global/list.categories';
import { listPortions } from '../../global/list.portions';
import { listLevels } from '../../global/list.levels';
import { listCuisines } from '../../global/list.cuisines';
import { listUnits } from '../../global/list.units';

import { Recipe } from '../../services/models/recipe';
import { RecipeService } from '../../services/recipe.service';

import { UploadService } from '../../services/upload.service';
import { Upload } from '../../services/models/upload';

import { AlertComponent } from '../../directives/alert/alert.component';

class Step {
  constructor(
    public stepDescription: string
  ) { }
}

class Ingredient {
  constructor(
    public quantity: number,
    public unit: string,
    public ingredient: string
  ) { }
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less'],
})
export class RecipeEditComponent implements OnInit {
  id;
  key;
  receipt;
  description;
  portion;
  prepTime;
  rating;
  level;
  category;
  cuisine;

  steps;
  ingredients;

  // Image
  image = [];
  selectedFiles: FileList;
  currentUpload: Upload;

  // Select items
  listCategories = listCategories;
  listPortions = listPortions;
  listLevels = listLevels;
  listCuisines = listCuisines;
  listUnits = listUnits;

  // Alert
  @ViewChild('childAlert') public childAlert: AlertComponent;

  // sessionStorage
  currentUser;

  // Initialize fields (validation)
  ingredient = {
    recipeQuantity: '',
    recipeIngredient: ''
  };
  step = {
    description: ''
  };

  constructor(
    private recipeService: RecipeService,
    private af: AngularFireDatabase,
    private route: ActivatedRoute,
    private location: Location,
    private upSvc: UploadService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipeService.getRecipeDetail(this.id).subscribe(recipe => {
      console.log('Edit recipe: ', recipe);
      this.key = recipe.$key;
      this.receipt = recipe.receipt;
      this.description = recipe.description;
      this.portion = recipe.portion;
      this.prepTime = recipe.prepTime;
      this.rating = recipe.rating;
      this.level = recipe.level;
      this.category = recipe.category;
      this.cuisine = recipe.cuisine;

      if (recipe.ingredients === undefined) {
        this.ingredients = [];
      } else {
        this.ingredients = recipe.ingredients;
      }

      if (recipe.steps === undefined) {
          this.steps = [];
      } else {
        this.steps = recipe.steps;
      }

      this.image = recipe.image;
    });

    // Get the currentUser from the sessionStorage
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  update(
      receipt: string,
      description: string,
      portion: string,
      prepTime: number,
      rating: number,
      level: string,
      category: string,
      cuisine: string,
      steps: any[],
      ingredients: any[],
      image: any[],
      uid: string,
      user: string): void {
    receipt = receipt.trim();
    description = description.trim();
    portion = portion.trim();
    prepTime = prepTime;
    rating = rating;
    level = level.trim();
    category = category.trim();
    cuisine = cuisine.trim();
    steps = this.steps;
    ingredients = this.ingredients;
    image = this.image;
    uid = this.currentUser.uid;
    user = this.currentUser.email;

    this.recipeService.update(this.id, receipt, description, portion, prepTime, rating, level, category, cuisine, steps, ingredients, image, uid, user)
      .then(response => {
        if (this.selectedFiles !== undefined) {
          this.removeExistedImage(this.id);
          const file = this.selectedFiles.item(0);
          console.log('File', file);
          console.log('Key recipe', this.key);
          this.currentUpload = new Upload(file);
          this.upSvc.pushUpload(this.currentUpload, this.key)
        }

        // Show notification
        this.childAlert.showAlert('success', `Rezept wurde erfolgreich aktualisiert! (Geändert am: ${(new Date()).toLocaleTimeString()})`);
      });
  }

  removeExistedImage(key) {
    this.upSvc.deleteFileData(key);
  }

  addStep(stepDescription: string) {
    if (stepDescription) {
      this.steps.push(new Step(stepDescription));
    }
  }

  removeStep(index) {
    this.steps.splice(index, 1);
  }

  addIngredient(quantity: number, unit: string, ingredient: string) {
    this.ingredients.push(new Ingredient(quantity, unit, ingredient));
  }

  removeIngredient(index) {
    this.ingredients.splice(index, 1);
  }

  goBack(): void {
    this.location.back();
  }
}
