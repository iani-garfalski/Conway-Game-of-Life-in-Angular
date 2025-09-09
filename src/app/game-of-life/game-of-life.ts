// game-of-life.ts
/**
 * Main container for Conway's Game of Life simulation.
 * Orchestrates game state, timing, and user interactions.
 * 
 * Key Responsibilities:
 * - Bridges UI components with core game services
 * - Handles user actions and propagates to appropriate services
 * - Exposes reactive state signals for template binding
 */
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { GameBoard } from './components/game-board/game-board';
import { GameControls } from './components/game-controls/game-controls';
import { GameStats } from './components/game-stats/game-stats';
import { GameSimulationService } from './services/game-simulation.service';
import { GameStateService } from './services/game-state.service';
import { GameTimerService } from './services/game-timer.service';
import { CellCoordinate, GridSize } from './types/game';

@Component({
  selector: 'app-game-of-life',
  standalone: true,
  imports: [GameBoard, GameControls, GameStats],
  templateUrl: './game-of-life.html',
  styleUrls: ['./game-of-life.scss']
})
export class GameOfLife implements OnInit, OnDestroy {
  private gameSimulation = inject(GameSimulationService);
  private gameState = inject(GameStateService);
  private gameTimer = inject(GameTimerService);

  // Expose signals for template binding
  size = this.gameState.size;
  tickMs = this.gameTimer.tickMs;
  running = this.gameTimer.running;
  generation = this.gameState.generation;
  grid = this.gameState.grid;

  ngOnInit(): void {
    // Game auto start
    this.gameTimer.setCallback(() => this.step());
  }

  ngOnDestroy(): void { }

  // Toggles simulation play/pause state
  toggleRunning(): void {
    this.gameTimer.toggleRunning();
  }

  // Resets simulation with new random grid
  reset(): void {
    this.gameState.reset();
  }

  // Sets all cells to dead
  clear(): void {
    this.gameState.clear();
    this.gameTimer.stop();
  }

  // Advances simulation by one generation
  step(): void {
    this.grid.set(this.gameSimulation.step(this.grid()));
    this.gameState.incrementGeneration();
  }

  // Updates simulation speed
  setSpeed(ms: number): void {
    this.gameTimer.setSpeed(ms);
  }

  // Resizes grid dimensions and resets simulation
  resize(size: GridSize): void {
    this.gameState.resize(size);
  }

  // Toggles individual cell state
  toggleCell(coord: CellCoordinate): void {
  this.gameState.toggleCell(coord);
  }

  // Sets cell to alive during mouse drag
  dragSet(coord: CellCoordinate): void {
  this.gameState.dragSet(coord);
  }

  // Returns count of alive cells
  aliveCount(): number {
    return this.gameState.aliveCount();
  }
}
