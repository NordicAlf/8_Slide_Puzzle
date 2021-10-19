import {Puzzle} from "../Puzzle.js";
import {Solution} from "../Solution.js";
import {NewGame} from "../NewGame.js";
import {Image} from "../Image.js";
import {Difficulty} from "../Difficulty.js";

export class Events
{
    constructor() {
        this.puzzle = new Puzzle();
        this.solution = new Solution();
        this.newGame = new NewGame();
        this.image = new Image();
        this.difficulty = new Difficulty();

        document.querySelector('.puzzle').addEventListener('click', event => {
            this.puzzle.slideClick(event);
            this.puzzle.makeStep();
        });

        document.querySelector('#getSolution').addEventListener('click', () => {
            if (window.isRunGame) {
                this.solution.getSolutionClick();
            }
        });

        document.querySelector('#newGame').addEventListener('click', () => {
            this.newGame.newGameClick();
        });

        document.querySelector('#restartGame').addEventListener('click', () => {
            if (window.isRunGame) {
                this.newGame.restartClick();
            }
        });

        document.querySelector('#changeImage').addEventListener('click', () => {
            this.image.changeImageClick();
        });

        document.querySelector('#difficulty').addEventListener('click', event => {
            this.difficulty.changeDifficultyClick(event);
        });
    }
}