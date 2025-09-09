// game-stats.ts
/**
 * GameStats
 *
 * Displays simulation statistics:
 * - Current generation number
 * - Total alive cells count
 */
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-game-stats',
  standalone: true,
  templateUrl: './game-stats.html',
  styleUrls: ['./game-stats.scss']
})

export class GameStats {
  /**
    * Inputs:
    * - generation: current generation counter
    * - aliveCount: number of alive cells in the grid
    */
  generation = input.required<number>();
  aliveCount = input.required<number>();
}