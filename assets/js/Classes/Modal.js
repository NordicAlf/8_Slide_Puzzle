export class Modal {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.isRun = false;
    }

    showOrHide() {
        this.modal.classList.toggle('hidden');
    }

    setSolutionText() {
        this.modal.textContent = 'Okay, now try one for yourself';
    }

    setWinText() {
        this.modal.textContent = 'You Win!';
    }

    run() {
        if (!this.isRun) {
            this.isRun = true;

            this.showOrHide();

            setTimeout(() => {
                this.showOrHide();
                this.isRun = false;
            }, 4000);
        }
    }
}