<?php

require __DIR__ . '/vendor/autoload.php';

//use App\Classes\Puzzle;
//
//$puzzle = new Puzzle();
//$solution = $puzzle->run($puzzle->createRandomPuzzle());
//
//echo $solution;
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>8-Puzzle</title>

        <link rel="stylesheet" href="assets/css/app.css">
    </head>
    <body>
        <div class="puzzle">
            <div class="row">
                <div id="cell11" class="col tile1" data-value="1,1"></div>
                <div id="cell12" class="col tile2" data-value="1,2"></div>
                <div id="cell13" class="col tile3" data-value="1,3"></div>
            </div>
            <div class="row">
                <div id="cell21" class="col tile4" data-value="2,1"></div>
                <div id="cell22" class="col tile5" data-value="2,2"></div>
                <div id="cell23" class="col tile6" data-value="2,3"></div>
            </div>
            <div class="row">
                <div id="cell31" class="col tile7" data-value="3,1"></div>
                <div id="cell32" class="col tile8" data-value="3,2"></div>
                <div id="cell33" class="col tile9" data-value="3,3"></div>
            </div>
        </div>

        <script src="assets/js/app.js"></script>
    </body>
</html>