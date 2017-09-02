import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-data-cuisine-add',
  templateUrl: './basis-data-cuisine.component.html'
})
export class BasisDataCuisineComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }
}
