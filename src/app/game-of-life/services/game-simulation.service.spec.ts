// services/game-simulation.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GameSimulationService } from './game-simulation.service';
import { CellState, Grid } from '../types/game';

describe('GameSimulationService', () => {
  let service: GameSimulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        GameSimulationService
      ]
    });
    service = TestBed.inject(GameSimulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('step()', () => {
    it('should handle underpopulation - live cell with <2 neighbors dies', () => {
      const grid: Grid = [
        [CellState.Dead, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead]
      ];

      const result = service.step(grid);
      
      expect(result[1][1]).toBe(CellState.Dead);
    });

    it('should handle survival - live cell with 2-3 neighbors lives', () => {
      const grid: Grid = [
        [CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead]
      ];

      const result = service.step(grid);
      
      expect(result[1][1]).toBe(CellState.Alive);
    });

    it('should handle overpopulation - live cell with >3 neighbors dies', () => {
      const grid: Grid = [
        [CellState.Alive, CellState.Alive, CellState.Alive],
        [CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead]
      ];

      const result = service.step(grid);
      
      expect(result[1][1]).toBe(CellState.Dead);
    });

    it('should handle reproduction - dead cell with exactly 3 neighbors becomes alive', () => {
      const grid: Grid = [
        [CellState.Alive, CellState.Alive, CellState.Dead],
        [CellState.Alive, CellState.Dead, CellState.Dead],
        [CellState.Dead, CellState.Dead, CellState.Dead]
      ];

      const result = service.step(grid);
      
      expect(result[1][1]).toBe(CellState.Alive);
    });

    it('should return grid of same dimensions', () => {
      const grid: Grid = [
        [CellState.Dead, CellState.Alive],
        [CellState.Alive, CellState.Dead]
      ];

      const result = service.step(grid);
      
      expect(result.length).toBe(2);
      expect(result[0].length).toBe(2);
    });

    it('should handle empty grid', () => {
      const grid: Grid = [];
      
      const result = service.step(grid);
      
      expect(result).toEqual([]);
    });
  });
});