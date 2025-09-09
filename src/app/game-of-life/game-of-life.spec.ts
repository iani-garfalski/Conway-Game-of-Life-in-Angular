// game-of-life.spec.ts
import { TestBed } from '@angular/core/testing';
import { GameOfLife } from './game-of-life';
import { GameSimulationService } from './services/game-simulation.service';
import { GameStateService } from './services/game-state.service';
import { GameTimerService } from './services/game-timer.service';
import { Grid, CellState, GridSize } from './types/game';
import { provideZonelessChangeDetection, signal, WritableSignal } from '@angular/core';

describe('GameOfLife (with mocked timer)', () => {
  let component: GameOfLife;
  let gameSimulation: GameSimulationService;
  let gameState: GameStateService;
  let mockTimerService: Partial<GameTimerService>;

  beforeEach(() => {
    // Mock the timer service to avoid zone/interval issues
    mockTimerService = {
      tickMs: signal(200) as WritableSignal<number>,
      running: signal(true) as WritableSignal<boolean>,
      setCallback: jasmine.createSpy('setCallback'),
      start: jasmine.createSpy('start'),
      stop: jasmine.createSpy('stop'),
      toggleRunning: jasmine.createSpy('toggleRunning'),
      setSpeed: jasmine.createSpy('setSpeed'),
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        GameOfLife,
        GameSimulationService,
        GameStateService,
        { provide: GameTimerService, useValue: mockTimerService },
      ],
    });

    component = TestBed.inject(GameOfLife);
    gameSimulation = TestBed.inject(GameSimulationService);
    gameState = TestBed.inject(GameStateService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('step() should update the grid and increment generation', () => {
    const originalGrid: Grid = [
      [CellState.Dead, CellState.Alive],
      [CellState.Alive, CellState.Dead],
    ];
    gameState.grid.set(originalGrid);
    spyOn(gameSimulation, 'step').and.callFake((grid: Grid) => {
      // simulate a simple toggle of the first cell
      const newGrid = grid.map(row => row.slice());
      newGrid[0][0] = newGrid[0][0] === CellState.Alive ? CellState.Dead : CellState.Alive;
      return newGrid;
    });

    component.step();

    // Check generation incremented
    expect(component.generation()).toBe(1);

    // Check grid changed
    expect(component.grid()[0][0]).toBe(CellState.Alive);
  });

  it('toggleRunning() should call timer.toggleRunning()', () => {
    component.toggleRunning();
    expect(mockTimerService.toggleRunning).toHaveBeenCalled();
  });

  it('reset() should call gameState.reset()', () => {
    spyOn(gameState, 'reset');
    component.reset();
    expect(gameState.reset).toHaveBeenCalled();
  });

  it('clear() should call gameState.clear() and timer.stop()', () => {
    spyOn(gameState, 'clear');
    component.clear();
    expect(gameState.clear).toHaveBeenCalled();
    expect(mockTimerService.stop).toHaveBeenCalled();
  });

  it('setSpeed(ms) should call timer.setSpeed(ms)', () => {
    component.setSpeed(500);
    expect(mockTimerService.setSpeed).toHaveBeenCalledWith(500);
  });

  it('resize(size) should call gameState.resize(size)', () => {
    const newSize: GridSize = { rows: 10, cols: 15 };
    spyOn(gameState, 'resize');
    component.resize(newSize);
    expect(gameState.resize).toHaveBeenCalledWith(newSize);
  });

  it('toggleCell(coord) should call gameState.toggleCell', () => {
    const coord = { row: 0, col: 0 };
    spyOn(gameState, 'toggleCell');
    component.toggleCell(coord);
    expect(gameState.toggleCell).toHaveBeenCalledWith(coord);
  });

  it('dragSet(coord) should call gameState.dragSet', () => {
    const coord = { row: 1, col: 1 };
    spyOn(gameState, 'dragSet');
    component.dragSet(coord);
    expect(gameState.dragSet).toHaveBeenCalledWith(coord);
  });

  it('aliveCount() should return gameState.aliveCount()', () => {
    spyOn(gameState, 'aliveCount').and.returnValue(42);
    const count = component.aliveCount();
    expect(count).toBe(42);
  });
});
