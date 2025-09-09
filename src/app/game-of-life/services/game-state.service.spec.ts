// services/game-state.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GameStateService } from './game-state.service';
import { CellState, Grid } from '../types/game';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        GameStateService
      ]
    });
    service = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(service.size().rows).toBe(30);
    expect(service.size().cols).toBe(50);
    expect(service.running()).toBe(true);
    expect(service.generation()).toBe(0);
    expect(service.grid().length).toBe(30);
    expect(service.grid()[0].length).toBe(50);
  });

  describe('reset()', () => {
    it('should reset grid and generation', () => {
      service.generation.set(5);
      const originalGrid = service.grid();

      service.reset();

      expect(service.generation()).toBe(0);
      expect(service.grid()).not.toBe(originalGrid); // new random grid
    });
  });

  describe('clear()', () => {
    it('should clear grid, reset generation, and stop running', () => {
      service.generation.set(5);
      service.running.set(true);

      service.clear();

      expect(service.generation()).toBe(0);
      expect(service.running()).toBe(false);
      const allDead = service.grid().flat().every(cell => cell === CellState.Dead);
      expect(allDead).toBeTrue();
    });
  });

  describe('toggleCell()', () => {
    it('should toggle cell state', () => {
      const testGrid: Grid = [[CellState.Dead]];
      service.grid.set(testGrid);

      service.toggleCell({ row: 0, col: 0 });
      expect(service.grid()[0][0]).toBe(CellState.Alive);

      service.toggleCell({ row: 0, col: 0 });
      expect(service.grid()[0][0]).toBe(CellState.Dead);
    });
  });

  describe('dragSet()', () => {
    it('should set cell to alive', () => {
      const testGrid: Grid = [[CellState.Dead]];
      service.grid.set(testGrid);

      service.dragSet({ row: 0, col: 0 });
      expect(service.grid()[0][0]).toBe(CellState.Alive);
    });
  });

  describe('resize()', () => {
    it('should update dimensions and reset grid', () => {
      const originalGrid = service.grid();

      service.resize({ rows: 10, cols: 20 });

      expect(service.size().rows).toBe(10);
      expect(service.size().cols).toBe(20);
      expect(service.generation()).toBe(0);
      expect(service.grid()).not.toBe(originalGrid);
      expect(service.grid().length).toBe(10);
      expect(service.grid()[0].length).toBe(20);
    });
  });

  describe('aliveCount()', () => {
    it('should return count of alive cells', () => {
      const testGrid: Grid = [
        [CellState.Alive, CellState.Dead],
        [CellState.Alive, CellState.Alive]
      ];
      service.grid.set(testGrid);

      const count = service.aliveCount();
      expect(count).toBe(3);
    });
  });

  describe('incrementGeneration()', () => {
    it('should increment generation counter', () => {
      service.generation.set(5);
      service.incrementGeneration();

      expect(service.generation()).toBe(6);
    });
  });
});
