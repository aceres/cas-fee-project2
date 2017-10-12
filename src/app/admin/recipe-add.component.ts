import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { listCategories } from '../global/list.categories';
import { listPortions } from '../global/list.portions';
import { listLevels } from '../global/list.levels';
import { listCuisines } from '../global/list.cuisines';
import { listUnits } from '../global/list.units';

import { Recipe } from '../services/recipe';
import { RecipeService } from '../services/recipe.service';

import { UploadService } from '../services/upload.service';
import { Upload } from '../services/upload';

class Step {
  constructor(
    public stepDescription: string,
    public photo: string
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
  selector: 'app-recipes-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.less']
})
export class RecipeAddComponent implements OnInit {
  recipes: Recipe[];
  listCategories = listCategories;
  listPortions = listPortions;
  listLevels = listLevels;
  listCuisines = listCuisines;
  listUnits = listUnits;
  steps = [];
  ingredients = [];

  image = [];
  selectedFiles: FileList;
  currentUpload: Upload;

  public alerts: any = [];

  currentUser;

  // Initialize: For the validation
  // TODO: This doesn't work for now
  ingredient = { recipeQuantity: '', recipeIngredient: '' };
  step = { description: '', photo: '' };

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private upSvc: UploadService) { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  // TODO: Not active at the moment
  // uploadSingle() {
  //   const file = this.selectedFiles.item(0)
  //   this.currentUpload = new Upload(file);
  //   this.upSvc.pushUpload(this.currentUpload, '')
  // }

  add(name: string,
      description: string,
      portion: string,
      prepTime: number,
      level: string,
      category: string,
      cuisine: string,
      steps: any[],
      ingredients: any[],
      image: any[],
      uid: string,
      user: string): void {
            name = name.trim();
            description = description.trim();
            portion = portion.trim();
            prepTime = prepTime;
            level = level.trim();
            category = category.trim();
            cuisine = cuisine.trim();
            steps = this.steps;
            ingredients = this.ingredients;
            image = this.image;
            uid = this.currentUser.uid;
            user = this.currentUser.email;

            this.recipeService.create(name, description, portion, prepTime, level, category, cuisine, steps, ingredients, image, uid, user)
              .subscribe(response => {

              console.log('Response after created form: ', response.name);

              const file = this.selectedFiles.item(0)
              this.currentUpload = new Upload(file);
              this.upSvc.pushUpload(this.currentUpload, response.name)

                // Show notification
                this.alerts.push({
                  type: 'success',
                  msg: `Rezept wurde erfolgreich gespeichert! (Hinzugefügt am: ${(new Date()).toLocaleTimeString()})`,
                  timeout: 5000
                });

              });
      }

  addStep(stepDescription: string, photo: string) {
    if (stepDescription) {
      this.steps.push(new Step(stepDescription, photo));
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

  ngOnInit(): void {
    // Get the currentUser from the localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
