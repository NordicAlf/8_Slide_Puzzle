export class Puzzle
{
    constructor() {
        document.querySelector('.puzzle').addEventListener('click', event => {
            this.click(event);
        });
    }

    click(event) {
        let element = Object.assign(event.target);
        let position = element.getAttribute('data-value').split(',');

        let row = +position[0], column = +position[1];

        if (!document.getElementById("cell"+row+column).classList.contains("tile9")) {
            if (column < 3) {
                if (document.getElementById("cell"+row+(column+1)).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+row+(column+1));
                    return;
                }
            }
            if (column > 1) {
                if (document.getElementById("cell"+row+(column-1)).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+row+(column-1));
                    return;
                }
            }
            if (row > 1) {
                if (document.getElementById("cell"+(row-1)+column).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+(row-1)+column);
                    return;
                }
            }
            if (row < 3) {
                if (document.getElementById("cell"+(row+1)+column).classList.contains("tile9")) {
                    this.swapTiles("cell"+row+column,"cell"+(row+1)+column);
                    return;
                }
            }
        }
    }

    swapTiles(cell1, cell2) {
        let temp = document.getElementById(cell1).className;

        document.getElementById(cell1).className = document.getElementById(cell2).className;
        document.getElementById(cell2).className = temp;
    }
}