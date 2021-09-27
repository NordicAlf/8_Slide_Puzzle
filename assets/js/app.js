document.querySelector('.puzzle').addEventListener('click', function (event) {
    let element = Object.assign(event.target);
    let position = element.getAttribute('data-value').split(',');

    let row = +position[0], column = +position[1];

    if (!document.getElementById("cell"+row+column).classList.contains("tile9")) {
        if (column < 3) {
            if (document.getElementById("cell"+row+(column+1)).classList.contains("tile9")) {
                swapTiles("cell"+row+column,"cell"+row+(column+1));
                return;
            }
        }
        if (column > 1) {
            if (document.getElementById("cell"+row+(column-1)).classList.contains("tile9")) {
                swapTiles("cell"+row+column,"cell"+row+(column-1));
                return;
            }
        }
        if (row > 1) {
            if (document.getElementById("cell"+(row-1)+column).classList.contains("tile9")) {
                swapTiles("cell"+row+column,"cell"+(row-1)+column);
                return;
            }
        }
        if (row < 3) {
            if (document.getElementById("cell"+(row+1)+column).classList.contains("tile9")) {
                swapTiles("cell"+row+column,"cell"+(row+1)+column);
                return;
            }
        }
    }
});

function swapTiles(cell1, cell2) {
    let temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

document.querySelector('#newGame').addEventListener('click', function () {
    fetch('http://localhost:8000/src/index.php?type=get-puzzle', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(resp => console.log(resp));
});

document.querySelector('#getSolution').addEventListener('click', function () {
    fetch('http://localhost:8000/src/index.php?type=get-solution', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(resp => console.log(resp));
});