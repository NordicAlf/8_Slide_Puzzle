import {Puzzle} from "./Puzzle.js";

export class Solution
{
    constructor() {
        this.puzzleClass = new Puzzle();

        document.querySelector('#getSolution').addEventListener('click', () => {
            this.click();
        });
    }

    // click() {
    //     fetch(`${window.location.href}src/index.php?type=get-solution`, {
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(resp => alert('Best puzzle solution: \n' + resp));
    // }

    click() {
        fetch(`${window.location.href}src/index.php?type=get-solution`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.puzzleClass.getPuzzlePositions())
        })
            .then(response => response.json())
            .then(resp => this.getSolution(resp));
    }

    getSolution(solution) {
        console.log(solution);
        console.log(solution.substr(0, 1));
        this.puzzleClass.swapTilesByClass("tile" + 9, "tile" + solution.substr(0, 1));
    }
}