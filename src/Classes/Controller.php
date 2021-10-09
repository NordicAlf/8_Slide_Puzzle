<?php
declare(strict_types=1);

namespace App\Classes;

class Controller
{
    public function __construct(
        private Puzzle $puzzle,
        private DifficultyGame $difficultyGame
    ) {}

    public function run(): void
    {
        switch ($_REQUEST['type'] ?? '') {
            case "get-new-puzzle":
                echo $this->getPuzzle(true);
                break;
            case "get-old-puzzle":
                echo $this->getPuzzle(false);
                break;
            case "check-solve":
                echo $this->checkSolve();
                break;
            case "get-solution":
                echo $this->getSolution();
                break;
            case "change-difficulty":
                echo $this->changeDifficulty();
                break;
            case "get-current-difficulty":
                echo $this->getCurrentDifficulty();
                break;
            default:
                echo 'not found';
                break;
        }
    }

    public function getPuzzle(bool $isNewPuzzle): string
    {
        $this->difficultyGame->startDifficulty();

        if ($isNewPuzzle) {
            $puzzle = $this->puzzle->createRandomPuzzle();
            $_SESSION['puzzle'] = $puzzle;
        } else {
            $puzzle = $_SESSION['puzzle'];
        }

        return json_encode($puzzle, JSON_FORCE_OBJECT);
    }

    public function checkSolve(): string
    {
        return '';
    }

    public function getSolution(): string
    {
        $bodyRequest = json_decode(file_get_contents('php://input'), true);

        if (!empty($bodyRequest)) {
            return json_encode($this->puzzle->run($bodyRequest), JSON_FORCE_OBJECT);
        } else {
            return 'error';
        }
    }

    private function changeDifficulty(): string
    {
       return json_encode($this->difficultyGame->change(), JSON_FORCE_OBJECT);
    }

    private function getCurrentDifficulty(): string
    {
        return json_encode($this->difficultyGame->getCurrent(), JSON_FORCE_OBJECT);
    }
}