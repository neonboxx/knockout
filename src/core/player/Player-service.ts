import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from 'src/core/auth';
import { IPlayer, Player } from './player';


@Injectable()
export class PlayerService {
  playerItems$: FirebaseListObservable<IPlayer[]>;

  constructor(af: AngularFire, auth: AuthService) {
    this.playerItems$ = af.list(`/players/${auth.id}`) as FirebaseListObservable<IPlayer[]>;
  }

  createPlayer(title: string): Promise<any> {
    return this.playerItems$.push(new Player(title));
  }

  removePlayer(player: IPlayer): Promise<any> {
    return this.playerItems$.remove(player.$key);
  }

  updatePlayer(player: IPlayer, changes: any): Promise<any> {
    return this.playerItems$.update(player.$key, changes);
  }
}
