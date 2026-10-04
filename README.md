# 🧩 Sudoku Solver

A Sudoku Solver developed as part of Task 04 of my Software Development Internship at Prodigy InfoTech.

## Task Objective

Create a program that solves Sudoku puzzles automatically.

The application accepts an unsolved 9×9 Sudoku grid and uses a backtracking algorithm to find a valid solution.

## Features

- Interactive 9×9 Sudoku grid
- Manual puzzle input
- Example Sudoku puzzle
- Automatic Sudoku solving
- Backtracking algorithm
- Input validation
- Conflict detection
- Detection of unsolvable puzzles
- Clear puzzle functionality
- Responsive user interface
- Visual distinction between original and solved values

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Algorithm

The application uses the **Backtracking Algorithm**.

The algorithm:

1. Finds an empty cell.
2. Attempts to place a number from 1 to 9.
3. Checks whether the number is valid in the current row.
4. Checks whether the number is valid in the current column.
5. Checks whether the number is valid in the current 3×3 box.
6. If valid, the number is placed in the cell.
7. The algorithm recursively continues with the next empty cell.
8. If a dead end is reached, the algorithm removes the previously placed number and tries another possibility.
9. The process continues until the complete Sudoku grid is solved.

## How to Use

1. Open the application.
2. Enter the known Sudoku numbers into the grid.
3. Leave unknown cells empty.
4. Click **Solve Sudoku**.
5. The application will calculate and display the completed Sudoku grid.

You can also click **Load Example** to load a sample puzzle.

## Sudoku Rules

A valid Sudoku solution must satisfy:

- Every row contains numbers 1–9 without repetition.
- Every column contains numbers 1–9 without repetition.
- Every 3×3 box contains numbers 1–9 without repetition.

## How to Run

1. Clone this repository.
2. Open the project folder.
3. Open `index.html` in a browser.

Alternatively, use the Live Server extension in Visual Studio Code.

## Learning Outcomes

Through this task, I practiced:

- Recursion
- Backtracking algorithms
- Constraint checking
- JavaScript functions
- DOM manipulation
- Event handling
- Input validation
- Problem solving
- Responsive web design

## Author

Aditya Solunke

## Internship

Software Development Intern  
Prodigy InfoTech