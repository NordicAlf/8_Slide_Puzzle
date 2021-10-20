<?php
declare(strict_types=1);

namespace App\Interfaces;

interface PuzzleInterface
{
    /**
     * Check solve for puzzle
     * @param array $puzzle
     * @return string|false steps of solution|false(if not solvable)
     */
    public function run(array $puzzle): string|bool;

    /**
     * if user make step, so we need check puzzle
     * @param array $puzzle
     * @return bool
     */
    public function isPuzzleSolved(array $puzzle): bool;

    /**
     * Create random SOLVABLE puzzle
     * @return array
     */
    public function createRandomPuzzle(): array;
}