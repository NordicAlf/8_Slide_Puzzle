export class Snow {
    constructor(options) {
        this.snowflakes = [];
        this.options = options;

        document.getElementById(this.options.id).style.position = "fixed";
        document.getElementById(this.options.id).style.top = 0;
        document.getElementById(this.options.id).style.left = 0;
        document.getElementById(this.options.id).style.right = 0;
        document.getElementById(this.options.id).style.bottom = 0;
        document.getElementById(this.options.id).style.zIndex = -1;
        document.getElementById(this.options.id).style.pointerEvents = "none";
    }

    start() {
        this.go = true;

        this.createCanvas();
        this.createImage();
        this.snowFlakeList();
        this.snowFlakeStart();
    }

    random(min, max) {
        return Math.random() * (max - min) + min;
    }

    createCanvas() {
        this.canvas = document.createElement("canvas"); //add random number to change canvas id
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.getElementById(this.options.id).appendChild(this.canvas);
    }

    createImage() {
        this.snowImage = new Image();
        this.snowImage.src = this.options.imageSrc;
    }

    snowFlakeList() {
        for (let i = 0; i < this.options.countSnowflakes; i++) {
            this.snowflakes[i] = new this.snowflakeItem(this.canvas, this.options, this.snowImage, this.random);
            this.snowflakes[i].show();
        }
    }

    snowFlakeStart() {
        this.snowfall = function () {
            requestAnimationFrame(() => this.snowfall());

            if (this.go) {
                //clear canvas
                const context = this.canvas.getContext('2d');
                context.clearRect(0, 0, this.canvas.width, this.canvas.height);

                //update snowflakes
                for (let i = 0; i < this.options.countSnowflakes; i++) {
                    this.snowflakes[i].update();
                    this.snowflakes[i].show();

                    if (this.snowflakes[i].y > this.canvas.height) {
                        this.snowflakes[i].y = this.random(-20, -200);
                    }
                }
            }
        }

        this.snowfall();
    }

    snowflakeItem = function (canvas, options, snowImage, randomFunction) {
        this.size = randomFunction(options.minSize, options.maxSize);
        this.x = randomFunction(0, canvas.width);
        this.y = randomFunction(-20, -800);
        this.Vy = randomFunction(options.minSpeed, options.maxSpeed);

        this.canvas = canvas;

        this.show = function () {
            let ctx = this.canvas.getContext("2d");
            ctx.beginPath();
            ctx.drawImage(snowImage, this.x, this.y, this.size, this.size);
            ctx.closePath();
            ctx.fillStyle = "#FFF";
            ctx.fill();
        }

        this.update = function () {
            this.y += this.Vy;
        }
    }
}