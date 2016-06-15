import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import { FirebaseListObservable } from 'angularfire2';
import { IPlayer } from 'src/core/player';
import { PlayerItem } from '../player-item/player-item';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    RouterLink,
    PlayerItem
  ],
  selector: 'player-list',
  styles: [
    require('./player-list.scss')
  ],
  template: `
    <ul class="player-filters">
      <li><a [class.active]="!activeFilter" [routerLink]="['/Players']">View All</a></li>
      <li><a [class.active]="activeFilter == 'active'" [routerLink]="['/Players', {filter: 'active'}]">Active</a></li>
      <li><a [class.active]="activeFilter == 'completed'" [routerLink]="['/Players', {filter: 'completed'}]">Completed</a></li>
    </ul>
    
    <div class="player-list">
      <player-item
        *ngFor="let player of playerItems$ | async"
        [player]="player"
        (remove)="remove.emit(player)"
        (update)="update.emit({player: player, changes: $event})"></player-item>
    </div>
  `
})

export class PlayerList {
  @Input() playerItems$: FirebaseListObservable<IPlayer[]>;
  @Output() remove: EventEmitter<IPlayer> = new EventEmitter(false);
  @Output() update: EventEmitter<any> = new EventEmitter(false);

  activeFilter: string;

  constructor(params: RouteParams) {
    this.activeFilter = params.get('filter');
  }
}
