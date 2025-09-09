// services/game-state.service.ts
/**
 * GameStateService
 * 
 * Central state management for Game of Life simulation. Maintains reactive
 * game state including grid, generation count, and configuration.
 */
import { Injectable, signal, computed } from '@angular/core';
import { Grid, CellState, CellCoordinate, GameConfig, GameStats, GridSize } from '../types/game';
import { makeRandom, makeEmpty, cloneGrid } from '../utils/grid-creators.utils';
import { countAlive } from '../utils/grid-analysis.utils';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  // Default configuration - consider making this injectable/configurable
  private readonly DEFAULT_CONFIG: GameConfig = {
    rows: 30,
    cols: 50,
    tickMs: 200,
    running: true
  };

  // Reactive state signals
  readonly size = signal<GridSize>({
    rows: this.DEFAULT_CONFIG.rows,
    cols: this.DEFAULT_CONFIG.cols
  });

  readonly running = signal<boolean>(this.DEFAULT_CONFIG.running);
  readonly generation = signal<number>(0);
  readonly grid = signal<Grid>(makeRandom(this.size()));

  // Computed statistics
  readonly aliveCount = computed(() => countAlive(this.grid()));

  // Reset simulation with new random grid
  reset(): void {
    this.grid.set(makeRandom(this.size()));
    this.generation.set(0);
  }

  // Clear grid (all dead cells) and stop simulation
  clear(): void {
    this.grid.set(makeEmpty(this.size()));
    this.generation.set(0);
    this.running.set(false);
  }

  // Toggle individual cell state (alive ↔ dead)
  toggleCell(coord: CellCoordinate): void {
    this.grid.update(grid => {
      const newGrid = cloneGrid(grid);
      const currentState = newGrid[coord.row][coord.col];
      newGrid[coord.row][coord.col] = currentState === CellState.Alive 
        ? CellState.Dead 
        : CellState.Alive;
      return newGrid;
    });
  }

  // Set cell to alive during mouse drag operations
  dragSet(coord: CellCoordinate): void {
    this.grid.update(grid => {
      const newGrid = cloneGrid(grid);
      newGrid[coord.row][coord.col] = CellState.Alive;
      return newGrid;
    });
  }

  // Resize grid dimensions and reset with new random state
  resize(size: GridSize): void {
    this.size.set(size);
    this.reset(); // Reuse reset logic instead of duplicating
  }

  // Advance generation counter
  incrementGeneration(): void {
    this.generation.update(g => g + 1);
  }

  //Set grid and reset generation count (used for grid import)
  setGrid(newGrid: number[][]) {
    this.grid.set(newGrid);
    this.generation.set(0);
  }
}