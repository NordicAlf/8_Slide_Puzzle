export class Image
{
    imagePath;

    constructor() {
        this.changeImage();

        document.querySelector('#changeImage').addEventListener('click', () => {
            this.changeImage()
        });
    }

    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    }

    setImagePath(randomNum) {
        this.imagePath = `/assets/images/Puzzle${randomNum}.jpg`;
    }

    createStyleForImage() {
        let style = document.createElement('style');

        style.innerHTML = `.backgroundImage { background-image: url("${this.imagePath}"); }`;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    changeImage() {
        const puzzle = document.querySelectorAll('.col');

        this.setImagePath(this.getRandomNumber(1, 7));
        this.createStyleForImage();

        puzzle.forEach((item, index) => {
            if (index !== 8) {
                item.classList.add('backgroundImage');
            }
        });
    }
}