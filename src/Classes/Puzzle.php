<?php
declare(strict_types=1);

namespace App\Classes;

class Puzzle
{
    private array $solutionSteps = [];
    private bool $isSolved = false;
    private string $lastStepDirection = '';

    public function run(array $puzzle): string|bool
    {
        while (!$this->isSolved) {
            $zeroData = $this->getZero($puzzle);

            foreach ($zeroData['movement'] as $moveDirection) {
                $stepInPuzzle = $puzzle; // temp puzzle

                $stepInPuzzle = $this->move($stepInPuzzle, $zeroData['position']['row'], $zeroData['position']['col'], $moveDirection);

                if ($this->checkSolvable($stepInPuzzle)) {
                    $zeroData['distance'][$moveDirection] = $this->getManhattanDistance($stepInPuzzle);
                }
            }

            if (!empty($zeroData['distance'])) {
                asort($zeroData['distance']);

                $zeroData['bestResult'][array_key_first($zeroData['distance'])] = $zeroData['distance'][array_key_first($zeroData['distance'])];

                $puzzle = $this->move($puzzle, $zeroData['position']['row'], $zeroData['position']['col'], array_key_first($zeroData['bestResult']), true);

                if ($this->getManhattanDistance($puzzle) === 0) {
                    $this->isSolved = true;
                }
            }

            if (empty($zeroData['distance']) || count($this->solutionSteps) > 200) {
                break;
            }
        }

        return $this->isSolved ? $this->convertStepsSolutionToString() : false;
    }

    /**
     * Check if an instance of N*N puzzle is solvable
     *
     * If N is odd, then puzzle instance is solvable if number of inversions is even in the input state.
     * If N is even, puzzle instance is solvable if:
     *    the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
     *    the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
     * For all other cases, the puzzle instance is not solvable.
     *
     * @param array $puzzle is your puzzle array
     */
    private function checkSolvable(array $puzzle): bool
    {
        $puzzleInOneArray = [];

        foreach ($puzzle as $row) {
            $puzzleInOneArray = array_merge($puzzleInOneArray, $row);
        }

        for ($counter = 0, $i = 0; $i < count($puzzleInOneArray) - 1; $i++) {
            for ($j = $i + 1; $j < count($puzzleInOneArray); $j++) {
                if ($puzzleInOneArray[$i] > $puzzleInOneArray[$j] && $puzzleInOneArray[$j] !== 0) {
                    $counter++;
                }
            }
        }

        if (count($puzzle) % 2 === 0) { // if N*N is even
            return (($counter + (count($puzzle) - $this->getZero($puzzle)['position']['row'])) % 2) === 0 ? false : true;
        } else { // If N*N is odd
            return ($counter % 2) === 0 ? true : false;
        }
    }

    /**
     * Function for moving at-to position
     * @param array $puzzle is your puzzle array
     * @param int $rowAt is from row your puzzle array
     * @param int $columnAt is from column your puzzle array
     * @param string $moveDirection is which way to move zero
     * @param bool $isSolution is if true, so save your step
     */
    private function move(array $puzzle, int $rowAt, int $columnAt, string $moveDirection, bool $isSolution = false): array
    {
        if ($moveDirection === 'up') {
            !$isSolution ?: $this->solutionSteps[] = $puzzle[$rowAt - 1][$columnAt];
            [$puzzle[$rowAt][$columnAt], $puzzle[$rowAt - 1][$columnAt]] = [$puzzle[$rowAt - 1][$columnAt], $puzzle[$rowAt][$columnAt]];
        }
        if ($moveDirection === 'right') {
            !$isSolution ?: $this->solutionSteps[] = $puzzle[$rowAt][$columnAt + 1];
            [$puzzle[$rowAt][$columnAt], $puzzle[$rowAt][$columnAt + 1]] = [$puzzle[$rowAt][$columnAt + 1], $puzzle[$rowAt][$columnAt]];
        }
        if ($moveDirection === 'down') {
            !$isSolution ?: $this->solutionSteps[] = $puzzle[$rowAt + 1][$columnAt];
            [$puzzle[$rowAt][$columnAt], $puzzle[$rowAt + 1][$columnAt]] = [$puzzle[$rowAt + 1][$columnAt], $puzzle[$rowAt][$columnAt]];
        }
        if ($moveDirection === 'left') {
            !$isSolution ?: $this->solutionSteps[] = $puzzle[$rowAt][$columnAt - 1];
            [$puzzle[$rowAt][$columnAt], $puzzle[$rowAt][$columnAt - 1]] = [$puzzle[$rowAt][$columnAt - 1], $puzzle[$rowAt][$columnAt]];
        }

        if ($isSolution) {
            $this->lastStepDirection = $moveDirection;
        }

        return $puzzle;
    }

    /**
     * This function calculate is the best solution for every direction your step
     * For example:
     * @param array $puzzle is your puzzle array
     * return int
     */
    private function getManhattanDistance(array $puzzle): int
    {
        $sizeMatrix = count($puzzle[array_key_first($puzzle)]);
        $distance = 0;

        for ($i = 0; $i < $sizeMatrix; $i++) {
            for ($j = 0; $j < $sizeMatrix; $j++) {
                if ($puzzle[$i][$j] !== 0) {
                    $x = intdiv($puzzle[$i][$j] - 1, $sizeMatrix);
                    $y = ($puzzle[$i][$j] - 1) % $sizeMatrix;

                    $distance += abs($x - $i) + abs($y - $j);
                }
            }
        }

        return $distance;
    }

    /**
     * Function for get zero row/col position and directions in which zero can move
     * @param array $puzzle is your puzzle array
     * return array
     */
    private function getZero(array $puzzle): array
    {
        $countRows = count($puzzle) - 1;
        $countCols = count($puzzle[array_key_first($puzzle)]) - 1;

        for ($row = 0; $row <= $countRows; $row++) {
            for ($col = 0; $col <= $countCols; $col++) {
                if ($puzzle[$row][$col] === 0) {
                    if ($row !== 0 && $this->lastStepDirection !== 'down') {
                        $directions['movement'][] = 'up';
                    }
                    if ($row !== $countRows && $this->lastStepDirection !== 'up') {
                        $directions['movement'][] = 'down';
                    }
                    if ($col !== 0 && $this->lastStepDirection !== 'right') {
                        $directions['movement'][] = 'left';
                    }
                    if ($col !== $countCols && $this->lastStepDirection !== 'left') {
                        $directions['movement'][] = 'right';
                    }

                    $directions['position'] = ['row' => $row, 'col' => $col];

                    break;
                }
            }
        }

        return $directions ?? [];
    }

    private function convertStepsSolutionToString(): string
    {
        return implode(', ', $this->solutionSteps);
    }

    private function resetProperties(): void
    {
        $this->isSolved = false;
        $this->solutionSteps = [];
        $this->lastStepDirection = '';
    }

    public function createRandomPuzzle(): array
    {
        $this->resetProperties();

        $range = range(0, 8);
        shuffle($range);

        for ($n = 0, $row = 0; $row < 3; $row++) {
            for ($col = 0; $col < 3; $col++) {
                $puzzle[$row][$col] = $range[$n];

                $n++;
            }
        }

        if (!$this->run($puzzle)) {
            $this->createRandomPuzzle();
        }

        return $puzzle;
    }
}