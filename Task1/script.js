class Modal {
    constructor() {
        this.modal = null;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;

        this.drag = this.drag.bind(this);
        this.stopDragging = this.stopDragging.bind(this);
    }

    create(content) {
        // Створення основної структури модального вікна
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Модальне вікно</h3>
                    <span class="close-btn" title="Закрити">&times;</span>
                </div>
                <div class="modal-body">${content}</div>
            </div>
        `;
        document.body.appendChild(this.modal);

        this.setupEventListeners();
    }

    setupEventListeners() {
        const header = this.modal.querySelector('.modal-header');
        const closeBtn = this.modal.querySelector('.close-btn');

        // Події для перетягування
        header.addEventListener('mousedown', (e) => this.startDragging(e));
        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.stopDragging);

        // Закриття модального вікна
        closeBtn.addEventListener('click', () => this.close());
    }

    startDragging(e) {
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;

        if (e.target.closest('.modal-header')) {
            this.isDragging = true;
        }
    }

    drag(e) {
        if (this.isDragging) {
            e.preventDefault();

            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            const modalContent = this.modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
            }
        }
    }

    stopDragging() {
        this.isDragging = false;
    }

    close() {
        this.modal.remove();
        document.removeEventListener('mousemove', this.drag);
        document.removeEventListener('mouseup', this.stopDragging);
    }
}

// Ініціалізація модального вікна
const modal = new Modal();
document.getElementById('openModalBtn').addEventListener('click', () => {
    modal.create('Створіть клас "Модальне вікно" (Modal), який створює модальне ' +
        'вікно на сторінці. Клас повинен мати методи для відкриття, закриття та ' +
        'встановлення вмісту модального вікна. Зробіть можливість переміщення ' +
        'вікна по екрану за допомогою мишки (щоб можна було перетягувати за заголовок вікна).\n');
});