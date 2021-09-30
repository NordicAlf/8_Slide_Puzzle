export class Solution
{
    constructor() {
        document.querySelector('#getSolution').addEventListener('click', () => {
            this.click();
        });
    }

    click() {
        fetch('http://localhost:8000/src/index.php?type=get-solution', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(resp => console.log(resp));
    }
}