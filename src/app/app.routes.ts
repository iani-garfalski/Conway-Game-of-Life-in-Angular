import { Routes } from '@angular/router';
import { GameOfLife } from './game-of-life/game-of-life';

export const routes: Routes = [
  { path: '', component: GameOfLife }, // default route
  { path: '**', redirectTo: '' } // wildcard → redirect to game
];
