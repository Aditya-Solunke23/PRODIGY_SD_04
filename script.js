const sudokuGrid =
    document.getElementById("sudokuGrid");

const solveBtn =
    document.getElementById("solveBtn");

const clearBtn =
    document.getElementById("clearBtn");

const exampleBtn =
    document.getElementById("exampleBtn");

const message =
    document.getElementById("message");


const examplePuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];


function createGrid() {

    sudokuGrid.innerHTML = "";

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const input =
                document.createElement("input");

            input.type = "text";

            input.inputMode = "numeric";

            input.maxLength = 1;

            input.className = "sudoku-cell";

            input.dataset.row = row;

            input.dataset.col = col;

            input.setAttribute(
                "aria-label",
                `Row ${row + 1}, Column ${col + 1}`
            );


            input.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value.replace(
                            /[^1-9]/g,
                            ""
                        );

                    this.classList.remove(
                        "error",
                        "solved"
                    );

                }
            );


            sudokuGrid.appendChild(input);
        }
    }
}


function getCells() {

    return [
        ...document.querySelectorAll(
            ".sudoku-cell"
        )
    ];
}


function getGridFromUI() {

    const cells = getCells();

    const grid = [];

    for (let row = 0; row < 9; row++) {

        const currentRow = [];

        for (let col = 0; col < 9; col++) {

            const cell =
                cells[row * 9 + col];

            currentRow.push(
                cell.value === ""
                    ? 0
                    : Number(cell.value)
            );
        }

        grid.push(currentRow);
    }

    return grid;
}


function isValid(
    grid,
    row,
    col,
    number
) {

    for (let i = 0; i < 9; i++) {

        if (
            grid[row][i] === number
        ) {
            return false;
        }

        if (
            grid[i][col] === number
        ) {
            return false;
        }
    }


    const boxRow =
        Math.floor(row / 3) * 3;

    const boxCol =
        Math.floor(col / 3) * 3;


    for (
        let r = boxRow;
        r < boxRow + 3;
        r++
    ) {

        for (
            let c = boxCol;
            c < boxCol + 3;
            c++
        ) {

            if (
                grid[r][c] === number
            ) {
                return false;
            }
        }
    }


    return true;
}


function solveSudoku(grid) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (grid[row][col] === 0) {

                for (
                    let number = 1;
                    number <= 9;
                    number++
                ) {

                    if (
                        isValid(
                            grid,
                            row,
                            col,
                            number
                        )
                    ) {

                        grid[row][col] =
                            number;


                        if (
                            solveSudoku(grid)
                        ) {
                            return true;
                        }


                        grid[row][col] = 0;
                    }
                }


                return false;
            }
        }
    }


    return true;
}


function isInitialGridValid(grid) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const number =
                grid[row][col];

            if (number !== 0) {

                grid[row][col] = 0;

                const valid =
                    isValid(
                        grid,
                        row,
                        col,
                        number
                    );

                grid[row][col] = number;


                if (!valid) {
                    return false;
                }
            }
        }
    }

    return true;
}


function displaySolution(
    originalGrid,
    solvedGrid
) {

    const cells = getCells();

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const cell =
                cells[row * 9 + col];

            cell.value =
                solvedGrid[row][col];

            cell.classList.remove(
                "error"
            );


            if (
                originalGrid[row][col] === 0
            ) {

                cell.classList.add(
                    "solved"
                );

            } else {

                cell.classList.add(
                    "given"
                );
            }

            cell.readOnly = true;
        }
    }
}


function markInvalidCells(grid) {

    const cells = getCells();

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const number =
                grid[row][col];

            if (number === 0) {
                continue;
            }


            grid[row][col] = 0;

            const valid =
                isValid(
                    grid,
                    row,
                    col,
                    number
                );

            grid[row][col] = number;


            if (!valid) {

                cells[
                    row * 9 + col
                ].classList.add("error");

                return true;
            }
        }
    }

    return false;
}


function solvePuzzle() {

    const grid =
        getGridFromUI();


    const originalGrid =
        grid.map(row => [...row]);


    if (
        markInvalidCells(grid)
    ) {

        showMessage(
            "The puzzle contains conflicting numbers. Please correct them.",
            "error"
        );

        return;
    }


    const solved =
        solveSudoku(grid);


    if (!solved) {

        showMessage(
            "This Sudoku puzzle has no valid solution.",
            "error"
        );

        return;
    }


    displaySolution(
        originalGrid,
        grid
    );


    showMessage(
        "Sudoku solved successfully using backtracking! 🎉",
        "success"
    );
}


function clearGrid() {

    const cells = getCells();

    cells.forEach(cell => {

        cell.value = "";

        cell.readOnly = false;

        cell.classList.remove(
            "given",
            "solved",
            "error"
        );

    });


    showMessage(
        "",
        ""
    );
}


function loadExample() {

    const cells = getCells();

    cells.forEach(cell => {

        cell.value = "";

        cell.readOnly = false;

        cell.classList.remove(
            "given",
            "solved",
            "error"
        );

    });


    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const value =
                examplePuzzle[row][col];

            const cell =
                cells[row * 9 + col];


            if (value !== 0) {

                cell.value = value;

                cell.readOnly = true;

                cell.classList.add(
                    "given"
                );
            }
        }
    }


    showMessage(
        "Example puzzle loaded. Click Solve Sudoku.",
        "info"
    );
}


function showMessage(
    text,
    type
) {

    message.textContent = text;

    message.className =
        `message ${type}`;
}


solveBtn.addEventListener(
    "click",
    solvePuzzle
);


clearBtn.addEventListener(
    "click",
    clearGrid
);


exampleBtn.addEventListener(
    "click",
    loadExample
);


createGrid();