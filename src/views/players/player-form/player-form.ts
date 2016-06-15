import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'player-form',
  styles: [
    require('./player-form.scss')
  ],
  template: `
    <form class="player-form" (ngSubmit)="submit()" novalidate>
      <input
        (keyup.escape)="clear()"
        ngControl="title"
        [(ngModel)]="title"
        autocomplete="off"
        autofocus
        class="player-form__input"
        placeholder="What needs to be done?"
        required
        type="text">
    </form>
  `
})

export class PlayerForm {
  @Output() createPlayer: EventEmitter<string> = new EventEmitter(false);

  title: string = '';

  clear(): void {
    this.title = '';
  }

  submit(): void {
    const title: string = this.title.trim();
    if (title.length) {
      this.createPlayer.emit(title);
    }
    this.clear();
  }
}
