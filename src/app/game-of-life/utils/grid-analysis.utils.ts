//utils/grid-analysis.utils.ts
import { Direction, CellCoordinate, Grid, CellState } from '../types/game';

const directions: Direction[] = [
  [-1, -1], [-1, 0], [-1, 1], // NW, N, NE
  [0, -1],           [0, 1],  // W,  E
  [1, -1],  [1, 0],  [1, 1]   // SW, S, SE
];

export function countAlive(grid: Grid): number {
  return grid.flat().filter(cell => cell === CellState.Alive).length;
}

export function countNeighbors(grid: Grid, coordinate: CellCoordinate): number {
  let count = 0;
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  for (const direction of directions) {
    const [dr, dc] = direction;
    const rr = coordinate.row + dr;
    const cc = coordinate.col + dc;
    
    if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) {
      count += grid[rr][cc]; 
    }
  }  
  return count;
}
