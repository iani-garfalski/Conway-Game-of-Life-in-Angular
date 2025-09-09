// game-stats.spec.ts
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameStats } from './game-stats';
import { provideZonelessChangeDetection } from '@angular/core';

@Component({
  template: `
    <app-game-stats
      [generation]="generation"
      [aliveCount]="aliveCount"
    ></app-game-stats>
  `,
  standalone: true,
  imports: [GameStats],
})
class HostGameStats {
  generation = 42;
  aliveCount = 7;
}

describe('GameStats via Host', () => {
  let hostFixture: ComponentFixture<HostGameStats>;
  let gameStatsCmp: GameStats;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [HostGameStats],
    }).compileComponents();
  });

  it('should bind initial inputs correctly', () => {
    hostFixture = TestBed.createComponent(HostGameStats);
    hostFixture.detectChanges();

    const debug = hostFixture.debugElement.children[0];
    gameStatsCmp = debug.componentInstance as GameStats;

    expect(gameStatsCmp.generation()).toBe(42);
    expect(gameStatsCmp.aliveCount()).toBe(7);
  });

  it('should update when host inputs change via new fixture', () => {
    // Create a fresh host with new input values
    hostFixture = TestBed.createComponent(HostGameStats);
    const hostComponent = hostFixture.componentInstance;
    hostComponent.generation = 99;
    hostComponent.aliveCount = 123;

    hostFixture.detectChanges();

    const debug = hostFixture.debugElement.children[0];
    gameStatsCmp = debug.componentInstance as GameStats;

    expect(gameStatsCmp.generation()).toBe(99);
    expect(gameStatsCmp.aliveCount()).toBe(123);
  });
});
