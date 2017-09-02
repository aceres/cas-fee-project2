import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-data-category-add',
  templateUrl: './basis-data-category.component.html'
})
export class BasisDataCategoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }
}
