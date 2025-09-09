# Conway’s Game of Life — Angular Frontend Documentation

## Overview
This frontend is a standalone Angular 18+ application implementing Conway’s Game of Life.

### Game Rules
- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

### Features
- Start, pause, and step simulation
- Modify grid by toggling cells
- Resize or reset the grid
- Import/export saved grid configurations
- Uses signals for reactive state management and standalone components

## Dependencies
- Node.js 24+
- Angular 20.2
- TypeScript 5+
- No external backend required for the frontend build

## Testing
- Unit tests use Angular TestBed
- Coverage threshold: 80% for branches, functions, lines, statements

## Guidelines for Future Improvements
- Add new components as standalone
- Always use the latest Angular best practices and avoid deprecated functionality
- Ensure components, services, and utilities adhere to the Single Responsibility Principle
- Write unit tests for all new functionality

## Key Components
```
src/app/
├── app.config.ts            # Global configuration constants
├── app.routes.ts            # Client-side routing definitions
├── app.ts                   # Root module/component
├── app.spec.ts              # Unit tests for root component
└── game-of-life/
    ├── game-of-life.ts      # Root container component for the game
    ├── game-of-life.spec.ts # Unit tests for GameOfLife component
    ├── game-of-life.html
    ├── game-of-life.scss
    ├── components/
    │   ├── game-board/
    │   │   ├── game-board.ts        # Renders the grid; handles cell click/drag
    │   │   ├── game-board.spec.ts   # Unit tests for GameBoard
    │   │   ├── game-board.html
    │   │   └── game-board.scss
    │   ├── game-controls/
    │   │   ├── game-controls.ts      # Handles Start/Pause, Step, Speed, Reset/Clear
    │   │   ├── game-controls.spec.ts # Unit tests for GameControls
    │   │   ├── game-controls.html
    │   │   └── game-controls.scss
    │   └── game-stats/
    │       ├── game-stats.ts        # Displays generation, alive cells, grid size, density
    │       ├── game-stats.spec.ts   # Unit tests for GameStats
    │       ├── game-stats.html
    │       └── game-stats.scss
    ├── services/
    │   ├── game-simulation.service.ts       # Implements Game of Life rules
    │   ├── game-simulation.service.spec.ts  # Unit tests for simulation logic
    │   ├── game-state.service.ts            # Manages current grid and state operations
    │   ├── game-state.service.spec.ts       # Unit tests for game state logic
    │   ├── game-timer.service.ts            # Handles automatic ticking and speed
    │   └── game-timer.service.spec.ts       # Unit tests for timer functionality
    ├── types/
    │   └── game.ts            # Type definitions and interfaces (Grid, CellState, SavedGrid, etc.)
    └── utils/
        ├── grid-analysis.utils.ts   # Helper functions to analyze grids
        └── grid-creators.utils.ts   # Functions to create or transform grids
```

# Build and Run using Docker
docker build -t angular-game .
docker run -p 4200:4200 angular-game
- Local:   http://localhost:4200/

## Run Locally
```
npm install
ng start
```

## Scripts
```
ng start                 # ng serve
ng build                 # ng build
ng watch                 # ng build --watch 
ng test                  # ng test 
ng test --code-coverage  # ng test --code-coverage
```
