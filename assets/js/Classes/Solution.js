export class Solution
{
    constructor() {
        document.querySelector('#getSolution').addEventListener('click', () => {
            this.click();
        });
    }

    click() {
        fetch(`${window.location.href}src/index.php?type=get-solution`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(resp => this.getSolution(resp));
    }

    getSolution(resp) {
        console.log(resp.split(', ').length);
        console.log(resp);
    }
}