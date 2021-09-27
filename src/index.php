<?php
session_start();
require '../vendor/autoload.php';

use App\Classes\Controller;
use App\Classes\Puzzle;

(new Controller(new Puzzle()))->run();
