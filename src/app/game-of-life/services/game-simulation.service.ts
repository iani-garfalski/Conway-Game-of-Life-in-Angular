// services/game-simulation.service.ts
/**
 * GameSimulationService
 * 
 * Pure business logic for Conway's Game of Life rules. Stateless service
 * that computes next generations based on cellular automata rules.
 */
import { Injectable } from "@angular/core";
import { Grid, CellState, CellCoordinate } from "../types/game";
import { countNeighbors } from "../utils/grid-analysis.utils";
import { makeEmpty } from "../utils/grid-creators.utils";

@Injectable({ providedIn: 'root' })
export class GameSimulationService {
  
  /**
   * Compute next generation grid state
   * @param grid - Current generation grid
   * @returns New grid representing next generation
   */
  step(grid: Grid): Grid {
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;
    const next = makeEmpty({ rows: rows, cols: cols });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const coordinate: CellCoordinate = { row: r, col: c };
        const neighbors = countNeighbors(grid, coordinate);
        next[r][c] = this.applyRules(grid[r][c], neighbors);
      }
    }

    return next;
  }

  /**
   * Apply Conway's Game of Life rules to a single cell
   * @param cell - Current cell state
   * @param neighbors - Count of living neighbors (0-8)
   * @returns Next state for the cell
   */
  private applyRules(cell: CellState, neighbors: number): CellState {
    const isAlive = cell === CellState.Alive;

    // Conway's rules:
    // 1. Any live cell with fewer than 2 neighbors dies (underpopulation)
    // 2. Any live cell with 2 or 3 neighbors lives
    // 3. Any live cell with more than 3 neighbors dies (overpopulation)
    // 4. Any dead cell with exactly 3 neighbors becomes alive (reproduction)

    if (isAlive) {
      return (neighbors < 2 || neighbors > 3) ? CellState.Dead : CellState.Alive;
    } else {
      return neighbors === 3 ? CellState.Alive : CellState.Dead;
    }
  }
}
