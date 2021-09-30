export class NewGame
{
    constructor() {
        document.querySelector('#newGame').addEventListener('click', () => {
            this.click();
        });
    }

    click() {
        fetch('http://localhost:8000/src/index.php?type=get-puzzle', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(resp => console.log(resp));
    }
}