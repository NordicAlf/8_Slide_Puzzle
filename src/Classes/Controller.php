<?php
declare(strict_types=1);

namespace App\Classes;

class Controller
{
    public function __construct(
        private Puzzle $puzzle
    ) {}

    public function run(): void
    {
        switch ($_REQUEST['type'] ?? '') {
            case "get-puzzle":
                echo $this->getPuzzle();
                break;
            case "check-solve":
                echo $this->checkSolve();
                break;
            case "get-solution":
                echo $this->getSolution();
                break;
            default:
                echo 'not found';
                break;
        }
    }

    public function getPuzzle(): string
    {
        $puzzle = $this->puzzle->createRandomPuzzle();
        $_SESSION['puzzle'] = $puzzle;

        return json_encode($puzzle, JSON_FORCE_OBJECT);
    }

    public function checkSolve(): string
    {
        return '';
    }

    public function getSolution(): string
    {
        if (isset($_SESSION['puzzle'])) {
            return json_encode($this->puzzle->run($_SESSION['puzzle']), JSON_FORCE_OBJECT);
        } else {
            return 'error';
        }
    }
}