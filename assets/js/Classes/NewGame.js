export class NewGame
{
    constructor() {
        document.querySelector('#newGame').addEventListener('click', () => {
            this.clickNewGame();
        });
        document.querySelector('#restartGame').addEventListener('click', () => {
            this.clickRestart();
        });
    }

    clickNewGame() {
        fetch('http://localhost:8000/src/index.php?type=get-new-puzzle', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(puzzle => this.buildPuzzle(puzzle));
    }

    clickRestart() {
        fetch('http://localhost:8000/src/index.php?type=get-old-puzzle', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(puzzle => this.buildPuzzle(puzzle));
    }

    buildPuzzle(puzzle) {
        for (let row = 0; row < Object.keys(puzzle).length; row++) {
            for (let col = 0; col < Object.keys(puzzle[row]).length; col++) {
                let elem = document.querySelector(`#cell${row}${col}`)

                // remove tile's class from all elements
                elem.classList.forEach((item) => {
                    if (item.indexOf('tile') !== -1) {
                        elem.classList.remove(item);
                    }
                });
                // remove images from all elems
                elem.classList.forEach((item) => {
                    if (item.indexOf('backgroundImage') !== -1) {
                        elem.classList.remove(item);
                    }
                });

                if (puzzle[row][col] !== 0) {
                    elem.classList.add('tile' + puzzle[row][col]);
                    elem.classList.add('backgroundImage');
                } else {
                    elem.classList.add('tile9');
                }
            }
        }
    }
}