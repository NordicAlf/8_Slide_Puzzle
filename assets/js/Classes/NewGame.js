export class NewGame
{
    constructor() {
        document.querySelector('#newGame').addEventListener('click', () => {
            this.click();
        });
    }

    click() {
        fetch('http://localhost:8000/src/index.php?type=get-puzzle', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(puzzle => this.buildImage(puzzle));
    }

    buildImage(puzzle) {
        console.log(puzzle);

        // let puzzleCols = document.querySelectorAll('.col');

        // console.log(Object.keys(puzzle[3]).length);
        // console.log(puzzle.length);

        for (let row = 0; row < Object.keys(puzzle).length; row++) {
            for (let col = 0; col < Object.keys(puzzle[row]).length; col++) {
                let temp = document.querySelector(`#cell${row}${col}`)
                console.log(temp);
            }
        }
    }
}