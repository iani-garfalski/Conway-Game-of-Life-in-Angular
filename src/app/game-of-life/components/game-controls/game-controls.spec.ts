// game-controls.spec.ts
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameControls } from './game-controls';
import { GridSize } from '../../types/game';

@Component({
  template: `
    <app-game-controls
      [running]="running"
      [tickMs]="tickMs"
      [size]="size"
      (speedChanged)="onSpeedChanged($event)"
      (resizeRequested)="onResizeRequested($event)"
    ></app-game-controls>
  `,
  standalone: true,
  imports: [GameControls],
})
class HostGameControls {
  running = false;
  tickMs = 200;
  size: GridSize = { rows: 20, cols: 30 };

  lastSpeed?: number;
  lastResize?: GridSize;

  onSpeedChanged(value: number) {
    this.lastSpeed = value;
  }

  onResizeRequested(value: GridSize) {
    this.lastResize = value;
  }
}

describe('GameControls via Host', () => {
  let hostFixture: ComponentFixture<HostGameControls>;
  let hostComponent: HostGameControls;
  let gameControlsCmp: GameControls;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostGameControls);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    const debug = hostFixture.debugElement.children[0];
    gameControlsCmp = debug.componentInstance as GameControls;
  });

  it('should bind inputs correctly', () => {
    expect(gameControlsCmp.running()).toBe(false);
    expect(gameControlsCmp.tickMs()).toBe(200);
    expect(gameControlsCmp.size().rows).toBe(20);
    expect(gameControlsCmp.size().cols).toBe(30);
  });

  it('should clamp and emit speed changes', () => {
    gameControlsCmp.onSpeedChange('100');
    expect(hostComponent.lastSpeed).toBe(100);

    gameControlsCmp.onSpeedChange('5');
    expect(hostComponent.lastSpeed).toBe(10);

    gameControlsCmp.onSpeedChange('9999');
    expect(hostComponent.lastSpeed).toBe(2000);
  });

  it('should clamp and emit rows changes', () => {
    gameControlsCmp.onRowsChange('2');
    expect(hostComponent.lastResize).toEqual({ rows: 5, cols: 30 });

    gameControlsCmp.onRowsChange('500');
    expect(hostComponent.lastResize).toEqual({ rows: 200, cols: 30 });
  });

  it('should clamp and emit cols changes', () => {
    gameControlsCmp.onColsChange('2');
    expect(hostComponent.lastResize).toEqual({ rows: 20, cols: 5 });

    gameControlsCmp.onColsChange('999');
    expect(hostComponent.lastResize).toEqual({ rows: 20, cols: 200 });
  });
});
