import { Component } from '@angular/core';
import { CanActivate } from '@angular/router-deprecated';
import { AuthRouteHelper } from 'src/core/auth';
import { PlayerService } from 'src/core/player';
import { PlayerForm } from './player-form/player-form';
import { PlayerList } from './player-list/player-list';


@Component({
  directives: [
    PlayerForm,
    PlayerList
  ],
  selector: 'players',
  template: `
    <div class="g-row">
      <div class="g-col">
        <player-form (createPlayer)="playerService.createPlayer($event)"></player-form>
      </div>
    
      <div class="g-col">
        <player-list 
          [playerItems$]="playerService.playerItems$"
          (remove)="playerService.removePlayer($event)"
          (update)="playerService.updatePlayer($event.player, $event.changes)"></player-list>
      </div>
    </div>
  `
})

@CanActivate(() => AuthRouteHelper.requireAuth())

export class Players {
  constructor(private playerService: PlayerService) {}
}
