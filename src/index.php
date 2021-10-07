<?php
session_start();
require '../vendor/autoload.php';

use App\Classes\Controller;
use App\Classes\Puzzle;
use App\Classes\DifficultyGame;

(new Controller(new Puzzle(), new DifficultyGame()))->run();
