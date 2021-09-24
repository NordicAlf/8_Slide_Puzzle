<?php

require __DIR__ . '/vendor/autoload.php';

use App\Classes\Puzzle;

$puzzle = new Puzzle();
$solution = $puzzle->run($puzzle->createRandomPuzzle());

echo $solution;