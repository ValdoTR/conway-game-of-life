/// <reference types="@workadventure/iframe-api-typings" />

import { TileDescriptor } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

// Define the initial state of the grid (it contains a glider pattern)
let grid: number[][] = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    renderGrid();
}).catch(e => console.error(e));

// Function to update the grid based on the rules of Conway's Game of Life
function applyRules(): void {
    const newGrid: number[][] = [];
    for (let y = 0; y < grid.length; y++) {
        const newRow: number[] = [];
        for (let x = 0; x < grid[0].length; x++) {
            const neighbors = countNeighbors(x, y);
            // Apply Conway's rules
            if (grid[y][x] === 1 && (neighbors < 2 || neighbors > 3)) {
                newRow.push(0); // Any live cell with fewer than two live neighbors dies, as if by underpopulation
            } else if (grid[y][x] === 0 && neighbors === 3) {
                newRow.push(1); // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction
            } else {
                newRow.push(grid[y][x]); // Nothing happens
            }
        }
        newGrid.push(newRow);
    }
    // New grid for the next generation
    grid = newGrid;
    setTimeout(renderGrid, 200);
}

// Function to count the number of live neighbors for a given cell with wrapping
function countNeighbors(x: number, y: number): number {
    let count = 0;
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (xOffset === 0 && yOffset === 0) {
                continue; // Skip the cell itself
            }
            const neighborX = (x + xOffset + grid[0].length) % grid[0].length;
            const neighborY = (y + yOffset + grid.length) % grid.length;
            count += grid[neighborY][neighborX];
        }
    }
    return count;
}

// Function to render the grid on the WorkAdventure map
function renderGrid(): void {
    const tiles: TileDescriptor[] = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const tileId = grid[y][x] === 1 ? 'live-cell' : null;
            tiles.push({ x, y, tile: tileId, layer: 'start' });
        }
    }
    WA.room.setTiles(tiles);
    applyRules();
}

export {};
