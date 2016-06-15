export interface IPlayer {
  $key?: string;
  createdAt: number;
  name: string;
}

export class Player implements IPlayer {
  createdAt: number = Firebase.ServerValue.TIMESTAMP;
  name: string;

  constructor(title: string) {
    this.name = name;
  }
}
