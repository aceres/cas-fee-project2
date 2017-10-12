import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-modal-small',
  templateUrl: './modal.component.html'
})
export class ModalContentComponent {
  public title: string;
  public list: any[] = [];
  constructor(public bsModalRef: BsModalRef) {}
}
