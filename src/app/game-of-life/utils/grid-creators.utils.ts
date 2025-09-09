//utils/grid-creators.utils.ts
import { Grid, CellState, GridSize } from '../types/game';

export function makeEmpty(size: GridSize): Grid {
  return Array.from({ length: size.rows }, () => 
    Array.from({ length: size.cols }, () => CellState.Dead)
  );
}

export function makeRandom(size: GridSize, aliveProbability: number = 0.33): Grid {
  return Array.from({ length: size.rows }, () => 
    Array.from({ length: size.cols }, () => 
      Math.random() > (1 - aliveProbability) ? CellState.Alive : CellState.Dead
    )
  );
}

export function cloneGrid(grid: Grid): Grid {
  return grid.map(row => [...row]);
}

