export class Difficulty
{
    constructor() {
        this.getCurrentDifficulty();
    }

    changeDifficultyClick() {
        fetch(`${window.location.href}src/index.php?type=change-difficulty`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(difficulty => this.setupDifficulty(difficulty));
    }

    getCurrentDifficulty() {
        fetch(`${window.location.href}src/index.php?type=get-current-difficulty`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(difficulty => this.setupDifficulty(difficulty));
    }

    setupDifficulty(difficulty) {
        document.querySelector('#difficulty').textContent = difficulty['difficulty'];
    }
}