import {Puzzle} from "./Puzzle.js";

export class Solution
{
    constructor() {
        this.puzzle = new Puzzle();
    }

    getSolutionClick() {
        fetch(`${window.location.href}src/index.php?type=get-solution`, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.puzzle.getPuzzlePositions())
        })
            .then(response => response.json())
            .then(resp => (this.getSolution(resp)));
    }

    getSolution(response) {
        if (window.isRunGame === true && response['isPuzzleSolved'] === "false") {
            if (response['solution'] === false) {
                window.classes.modal.setSolutionText();
                window.classes.modal.run();
            } else {
                this.puzzle.swapTilesByClass("tile" + 9, "tile" + response['solution'].substr(0, 1));
            }
        } else {
            this.checkWin(response);
        }

    }

    checkWin(response) {
        if (response === "true" || response['isPuzzleSolved'] === "true") {
            window.isRunGame = false;
            window.classes.modal.setWinText();
            window.classes.modal.run();
        }
    }
}