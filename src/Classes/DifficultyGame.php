<?php
declare(strict_types=1);

namespace App\Classes;

use App\Interfaces\DifficultyGameInterface;

class DifficultyGame implements DifficultyGameInterface
{
    public function startDifficulty(): void
    {
        if (!isset($_SESSION['difficulty'])) {
            $_SESSION['difficulty'] = array_key_first(DifficultyGameInterface::DIFFICULTY);
        }
    }

    public function change(): array
    {
        if ($_SESSION['difficulty'] === array_key_last(DifficultyGameInterface::DIFFICULTY)) {
            $_SESSION['difficulty'] = array_key_first(DifficultyGameInterface::DIFFICULTY);
        } else {
            $keys = array_keys(DifficultyGameInterface::DIFFICULTY);
            $_SESSION['difficulty'] = $keys[array_search($_SESSION['difficulty'], $keys) + 1];
        }

        return ['difficulty' => $_SESSION['difficulty']];
    }

    public function getCurrent(): array
    {
        if (isset($_SESSION['difficulty'])) {
            return ['difficulty' => $_SESSION['difficulty']];
        } else {
            return ['difficulty' => array_key_first(DifficultyGameInterface::DIFFICULTY)];
        }
    }

    public function getCurrentSteps(): array
    {
        return DifficultyGameInterface::DIFFICULTY[$_SESSION['difficulty']];
    }
}