import {Image} from "./Classes/Image.js";
import {Puzzle} from "./Classes/Puzzle.js";
import {NewGame} from "./Classes/NewGame.js";
import {Solution} from "./Classes/Solution.js";
import {Snow} from "./Classes/Snow.js";
import {Difficulty} from "./Classes/Difficulty.js";

const objects = {
    puzzle: new Puzzle(),
    newGame: new NewGame(),
    solution: new Solution(),
    image: new Image(),
    difficultyGame: new Difficulty()
}

window.onload = function () {
    let snow = new Snow({
        id: 'screen',
        minSize: 10,
        maxSize: 30,
        minSpeed: 0.2,
        maxSpeed: 0.8,
        countSnowflakes: 100,
        imageSrc: '/assets/images/snowflake.png'
    });

    snow.start();
}