<?php
declare(strict_types=1);

namespace App\Interfaces;

interface PuzzleInterface
{
    public function run(array $puzzle): string|bool;
}