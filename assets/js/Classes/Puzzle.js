import {Solution} from "./Solution.js";

export class Puzzle
{
    slideClick(event) {
        let element = Object.assign(event.target);
        let position = element.getAttribute('data-value').split(',');
        let row = +position[0], column = +position[1];

        if (!document.getElementById("cell"+row+column).classList.contains("tile9")) {
            if (column < 2) {
                if (document.getElementById("cell"+row+(column+1)).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+row+(column+1));
                    window.currentStepDirection = 'left';

                    return;
                }
            }
            if (column > 0) {
                if (document.getElementById("cell"+row+(column-1)).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+row+(column-1));
                    window.currentStepDirection = 'right';

                    return;
                }
            }
            if (row > 0) {
                if (document.getElementById("cell"+(row-1)+column).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+(row-1)+column);
                    window.currentStepDirection = 'down';

                    return;
                }
            }
            if (row < 2) {
                if (document.getElementById("cell"+(row+1)+column).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+(row+1)+column);
                    window.currentStepDirection = 'up';

                    return;
                }
            }
        }
    }

    swapTiles(cell1, cell2) {
        let temp = document.getElementById(cell1).className;

        if (window.isRunGame === true) {
            document.getElementById(cell1).className = document.getElementById(cell2).className;
            document.getElementById(cell2).className = temp;
        }
    }

    swapTilesByClass(cell1, cell2) {
        let cell1Element = document.querySelector(`.${cell1}`);
        let cell2Element = document.querySelector(`.${cell2}`);

        let commonClasses = cell1Element.classList + ' ' + cell2Element.classList;
        let arrayCommonClasses = commonClasses.split(' ');

        if (window.isRunGame === true) {
            // remove 'col' classes
            arrayCommonClasses.forEach((item, key) => {
                if (item === 'col') {
                    arrayCommonClasses.splice(key, 1);
                }
            });

            // exchange classes
            arrayCommonClasses.forEach(item => {
                cell1Element.classList.toggle(item);
                cell2Element.classList.toggle(item);
            })
        }
    }

    getPuzzlePositions() {
        let puzzleObject = {0: {}, 1: {}, 2: {}};

        for (let row = 0; row <= 2; row++) {
            for (let col = 0; col <= 2; col++) {
                let elem = document.querySelector(`#cell${row}${col}`);

                elem.classList.forEach((item) => {
                    if (item.indexOf('tile') !== -1) {
                        let number = +item.substr(4,1); // cut "tile" class

                        if (number !== 9) {
                            puzzleObject[row][col] = number;
                        } else {
                            puzzleObject[row][col] = 0;
                        }
                    }
                });
            }
        }

        return puzzleObject;
    }

    makeStep() {
        fetch(`${window.location.href}src/index.php?type=make-step`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                puzzle: this.getPuzzlePositions(),
                currentStepDirection: window.currentStepDirection
            })
        })
            .then(response => response.json())
            .then(response => (new Solution()).checkWin(response));
    }
}