<?php
declare(strict_types=1);

namespace App\Interfaces;

interface DifficultyGameInterface
{
    // Steps of solution, first number is min, second number is max
    const DIFFICULTY = [
        'Easy' => [5, 10],
        'Medium' => [15, 25],
        'Hard' => [35, 45],
        'Very Hard' => [60, 200]
    ];

    /** Create/write first difficulty */
    public function startDifficulty(): void;

    /**
     * Change difficulty
     * @return array ['difficulty' => (string) 'easy']
     */
    public function change(): array;


    /**
     * Get current difficulty
     * @return array ['difficulty' => (string) 'easy']
     */
    public function getCurrent(): array;

    /**
     * Get min and max steps of solution for current difficulty
     * @return array [5, 10] with const DIFFICULTY by key
     */
    public function getCurrentSteps(): array;
}