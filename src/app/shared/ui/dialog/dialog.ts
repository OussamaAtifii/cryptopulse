import { Component, ElementRef, output, viewChild } from '@angular/core';
import { Close } from '@icons/close/close';

@Component({
  selector: 'app-dialog',
  imports: [Close],
  templateUrl: './dialog.html',
})
export class Dialog {
  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  closed = output<void>();

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }

  dialogClosed() {
    this.closed.emit();
  }
}
