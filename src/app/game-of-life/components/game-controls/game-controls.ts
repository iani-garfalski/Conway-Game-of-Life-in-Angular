// game-controls.ts
/**
 * GameControls
 *
 * Provides UI controls for the Game of Life simulation:
 * - Play/pause toggle
 * - Step one generation
 * - Reset or clear the grid
 * - Adjust simulation speed
 * - Resize the grid dimensions
 */
import { Component, input, output } from '@angular/core';
import { GridSize } from '../../types/game';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  templateUrl: './game-controls.html',
  styleUrls: ['./game-controls.scss'],
})
export class GameControls {
  /**
   * Inputs:
   * - running: whether the simulation is currently running
   * - tickMs: the simulation tick interval in milliseconds
   * - size: current grid dimensions
   */
  running = input.required<boolean>();
  tickMs = input.required<number>();
  size = input.required<GridSize>();

  /**
    * Outputs:
    * - runningToggled: emitted when play/pause is toggled
    * - stepRequested: emitted when stepping one generation
    * - resetRequested: emitted when reset is requested
    * - clearRequested: emitted when clearing the grid
    * - speedChanged: emits new tick interval
    * - resizeRequested: emits new grid dimensions
    * - exportRequested emits an export request
    * - importRequested emits an import request
    */
  runningToggled = output<void>();
  stepRequested = output<void>();
  resetRequested = output<void>();
  clearRequested = output<void>();
  speedChanged = output<number>();
  resizeRequested = output<GridSize>();

  onSpeedChange(value: string): void {
    const ms = Math.max(10, Math.min(2000, parseInt(value, 10)));
    this.speedChanged.emit(ms);
  }

  onRowsChange(value: string): void {
    const rows = Math.max(5, Math.min(200, parseInt(value, 10) || this.size().rows));
    this.resizeRequested.emit({ rows, cols: this.size().cols });
  }

  onColsChange(value: string): void {
    const cols = Math.max(5, Math.min(200, parseInt(value, 10) || this.size().cols));
    this.resizeRequested.emit({ rows: this.size().rows, cols });
  }
}
