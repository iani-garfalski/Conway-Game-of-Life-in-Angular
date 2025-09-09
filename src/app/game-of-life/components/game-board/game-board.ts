// game-board.ts
/**
 * GameBoard
 *
 * Renders the game grid and handles user interactions:
 * - Click to toggle a cell state
 * - Drag to set cells alive
 */
import { Component, input, output } from '@angular/core';
import { CellState, Grid, CellCoordinate, GridSize } from '../../types/game';

@Component({
  selector: 'app-game-board',
  standalone: true,
  templateUrl: './game-board.html',
  styleUrls: ['./game-board.scss'],
})
export class GameBoard {
  /**
   * Inputs:
   * - grid: the current cell states
   * - size: grid dimensions
   */
  grid = input.required<Grid>();
  size = input.required<GridSize>();
  dragging = false;

  /**
   * Outputs:
   * - cellToggled: emits when a cell is clicked
   * - cellDragged: emits when a cell is dragged
   */
  cellToggled = output<CellCoordinate>();
  cellDragged = output<CellCoordinate>();

  onCellClick(coordinate: CellCoordinate): void {
    this.cellToggled.emit(coordinate);
  }

  onCellDrag(coordinate: CellCoordinate): void {
    if (!this.dragging) return;
    this.cellDragged.emit(coordinate);
  }

  readonly CellState = CellState;
}
