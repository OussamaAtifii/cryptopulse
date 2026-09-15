import { Component, ElementRef, viewChild } from '@angular/core';
import { Close } from '@icons/close/close';

@Component({
  selector: 'app-modal',
  imports: [Close],
  templateUrl: './modal.html',
})
export class Modal {
  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }
}
