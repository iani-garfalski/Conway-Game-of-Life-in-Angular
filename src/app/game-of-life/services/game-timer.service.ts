// services/game-timer.service.ts
/**
 * GameTimerService
 * 
 * Reactive timer service that manages simulation intervals using signals.
 * Automatically starts/stops intervals based on running state and tick rate changes.
 */
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameTimerService {
  // Default timer configuration
  private readonly DEFAULT_CONFIG = { tickMs: 200, running: true };

  // Signals for reactive state
  readonly tickMs = signal<number>(this.DEFAULT_CONFIG.tickMs);
  readonly running = signal<boolean>(this.DEFAULT_CONFIG.running);

  private intervalId: number | undefined;
  private callback = signal<(() => void) | null>(null);

  constructor() {
    // Effect automatically manages the interval based on state changes
    effect((onCleanup) => {
      this.clearTimer();

      // Only start interval if running is true and a callback exists
      if (this.running() && this.callback()) {
        const intervalMs = this.tickMs();
        const cb = this.callback()!; // Safe because we checked above
        
        this.intervalId = window.setInterval(() => cb(), intervalMs);
        
        // Automatic cleanup when effect re-runs or is destroyed
        onCleanup(() => this.clearTimer());
      }
    });
  }

  // Register the function to execute on each tick 
  setCallback(fn: () => void): void {
    this.callback.set(fn);
  }

  // Toggle running state
  toggleRunning(): void {
    this.running.update(v => !v);
  }

  // Stop timer
  stop(): void {
    this.running.set(false);
  }

  // Start timer
  start(): void {
    this.running.set(true);
  }

  // Set timer speed (clamped between 10ms and 5s)
  setSpeed(ms: number): void {
    const clamped = Math.max(10, Math.min(5000, ms));
    this.tickMs.set(clamped);
  }

  // Clear the interval safely
  private clearTimer(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}