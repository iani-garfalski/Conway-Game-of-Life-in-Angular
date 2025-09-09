// types/game.ts

// Enum for possible cell states
export enum CellState {
  Dead = 0,
  Alive = 1,
}

// 2D grid type for the game board
export type Grid = CellState[][];

export interface CellCoordinate {
  row: number;
  col: number;
}

export type GridSize = { rows: number; cols: number };

// Direction type for neighbor calculations
export type Direction = [number, number];

export interface GameConfig {
  rows: number;
  cols: number;
  tickMs: number;
  running: boolean;
}

export interface GameStats {
  generation: number;
  aliveCount: number;
  gridSize: number;
  density: number;
}

export type SimulationEvent = 
  | { type: 'started' }
  | { type: 'paused' }
  | { type: 'reset' }
  | { type: 'cleared' }
  | { type: 'stepped'; generation: number }
  | { type: 'cellToggled'; coordinate: CellCoordinate }
  | { type: 'configChanged'; config: Partial<GameConfig> };
