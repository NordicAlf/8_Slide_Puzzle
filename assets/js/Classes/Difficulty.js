export class Difficulty
{
    constructor() {
        document.querySelector('#difficulty').addEventListener('click', event => {
            this.changeDifficulty(event);
        });

        this.getCurrentDifficulty();
    }

    changeDifficulty() {
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
        console.log(difficulty);
        document.querySelector('#difficulty').textContent = difficulty['difficulty'];
    }
}