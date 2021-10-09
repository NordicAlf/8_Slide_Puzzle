<?php
session_start();
require '../vendor/autoload.php';

use App\Classes\Controller;
use App\Classes\Puzzle;
use App\Classes\DifficultyGame;

//(new Controller(new Puzzle(), new DifficultyGame()))->run();

$puzzle = new Puzzle();

// изначальное решение с нуля
//$puz = [
//    [7, 8, 4],
//    [2, 0, 3],
//    [1, 6, 5]
//];

// решение перед ошибкой
//$puz = [
//    [7, 4, 3],
//    [2, 0, 5],
//    [1, 8, 6]
//];

// ошибка
$puz = [
    [7, 0, 3],
    [2, 4, 5],
    [1, 8, 6]
];

$solution = $puzzle->run($puz);

dd($solution);
