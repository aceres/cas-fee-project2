import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  public alerts: any = [];

  showAlert(type, message) {
    this.alerts.push({
      type: type,
      msg: message,
      timeout: 5000
    });
    return this.alerts;
  }
}
