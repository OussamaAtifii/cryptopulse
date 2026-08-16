import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
})
export class Button {
  active = input(false);
  disabled = input(false);

  buttonClicked = output();
}
