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
            case "get-solution":
                echo $this->getSolution();
                break;
            case "change-difficulty":
                echo $this->changeDifficulty();
                break;
            case "get-current-difficulty":
                echo $this->getCurrentDifficulty();
                break;
            case "make-step":
                echo $this->makeStep();
                break;
            default:
                echo 'not found';
                break;
        }
    }

    public function getPuzzle(bool $isNewPuzzle): string
    {
        $this->difficultyGame->startDifficulty();

        // remove last game
        if (isset($_SESSION['currentStepDirection'])) {
            unset($_SESSION['currentStepDirection']);
        }

        if ($isNewPuzzle) {
            $puzzle = $this->puzzle->createRandomPuzzle();
            $_SESSION['puzzle'] = $puzzle;
        } else {
            $puzzle = $_SESSION['puzzle'];
        }

        return json_encode($puzzle, JSON_FORCE_OBJECT);
    }

    public function getSolution(): string
    {
        $bodyRequest = json_decode(file_get_contents('php://input'), true);

        return json_encode([
            'solution' => $this->puzzle->run($bodyRequest),
            'isPuzzleSolved' => $this->puzzle->isPuzzleSolved($bodyRequest) ? 'true' : 'false'
        ], JSON_FORCE_OBJECT);
    }

    private function changeDifficulty(): string
    {
       return json_encode($this->difficultyGame->change(), JSON_FORCE_OBJECT);
    }

    private function getCurrentDifficulty(): string
    {
        return json_encode($this->difficultyGame->getCurrent(), JSON_FORCE_OBJECT);
    }

    private function makeStep(): string
    {
        $bodyRequest = json_decode(file_get_contents('php://input'), true);

        $_SESSION['currentStepDirection'] = $bodyRequest['currentStepDirection'];

        return json_encode($this->puzzle->isPuzzleSolved($bodyRequest['puzzle']) ? 'true' : 'false', JSON_FORCE_OBJECT);
    }
}