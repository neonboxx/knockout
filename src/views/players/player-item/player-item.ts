import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IPlayer } from 'src/core/player';
import { Autofocus } from 'src/views/common';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    Autofocus
  ],
  selector: 'player-item',
  styles: [
    require('./player-item.scss')
  ],
  template: require('./player-item.html')
})

export class PlayerItem {
  @Input() player: IPlayer;
  @Output() remove: EventEmitter<any> = new EventEmitter(false);
  @Output() update: EventEmitter<any> = new EventEmitter(false);

  editing: boolean = false;
  name: string = '';

  editname(): void {
    this.editing = true;
    this.name = this.player.name;
  }

  savename(): void {
    if (this.editing) {
      const name: string = this.name.trim();
      if (name.length && name !== this.player.name) {
        this.update.emit({name});
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }
}
