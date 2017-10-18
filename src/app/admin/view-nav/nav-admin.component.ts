import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.less']
})
export class NavAdminComponent {
  @Input('user') user: string;
  @Input('title') title: string;
}
