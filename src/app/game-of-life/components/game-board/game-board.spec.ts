// game-board.spec.ts
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameBoard } from './game-board';
import { CellState, CellCoordinate, GridSize } from '../../types/game';

@Component({
  template: `
    <app-game-board
      [size]="size"
      [grid]="grid"
    ></app-game-board>
  `,
  standalone: true,
  imports: [GameBoard],
})
class HostGameBoard {
  size: GridSize = { rows: 2, cols: 3 };
  grid = [
    [CellState.Alive, CellState.Dead, CellState.Alive],
    [CellState.Dead, CellState.Alive, CellState.Dead],
  ];
}

describe('GameBoard via Host', () => {
  let hostFixture: ComponentFixture<HostGameBoard>;
  let hostComponent: HostGameBoard;
  let gameBoardEl: HTMLElement;
  let gameBoardCmp: GameBoard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostGameBoard);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    const boardDebug = hostFixture.debugElement.children[0];
    gameBoardCmp = boardDebug.componentInstance as GameBoard;
    gameBoardEl = boardDebug.nativeElement as HTMLElement;
  });

  it('should bind size and grid via InputSignal correctly', () => {
    expect(gameBoardCmp.size().rows).toBe(hostComponent.size.rows);
    expect(gameBoardCmp.size().cols).toBe(hostComponent.size.cols);
    expect(gameBoardCmp.grid()).toEqual(hostComponent.grid);
  });

  it('should emit cellToggled on onCellClick', () => {
    spyOn(gameBoardCmp.cellToggled, 'emit');

    const coord: CellCoordinate = { row: 0, col: 1 };
    gameBoardCmp.onCellClick(coord);

    expect(gameBoardCmp.cellToggled.emit).toHaveBeenCalledWith(coord);
  });

  it('should emit cellDragged only when dragging is true', () => {
    spyOn(gameBoardCmp.cellDragged, 'emit');

    gameBoardCmp.dragging = false;
    gameBoardCmp.onCellDrag({ row: 1, col: 0 });
    expect(gameBoardCmp.cellDragged.emit).not.toHaveBeenCalled();

    gameBoardCmp.dragging = true;
    gameBoardCmp.onCellDrag({ row: 1, col: 0 });
    expect(gameBoardCmp.cellDragged.emit).toHaveBeenCalledWith({ row: 1, col: 0 });
  });
});
