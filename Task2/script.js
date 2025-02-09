class Slider {
    constructor(orientation = 'horizontal') {
        this.orientation = orientation;
        this.slides = [];
        this.currentSlideIndex = 0;

        this.sliderContainer = document.createElement('div');
        this.sliderContainer.classList.add('slider-container');

        this.track = document.createElement('div');
        this.track.classList.add('slider-track');
        this.track.style.flexDirection = this.orientation === 'vertical' ? 'column' : 'row';

        this.controlPanel = document.createElement('div');
        this.controlPanel.classList.add('slider-controls');

        this.prevBtn = document.createElement('button');
        this.prevBtn.classList.add('btn-prev');
        this.prevBtn.textContent = 'Назад';
        this.prevBtn.addEventListener('click', () => this.showPreviousSlide());

        this.nextBtn = document.createElement('button');
        this.nextBtn.classList.add('btn-next');
        this.nextBtn.textContent = 'Вперед';
        this.nextBtn.addEventListener('click', () => this.showNextSlide());

        this.addSlideButton = document.createElement('button');
        this.addSlideButton.classList.add('btn-add-slide');
        this.addSlideButton.textContent = 'Додати слайд';
        this.addSlideButton.addEventListener('click', () => this.openFileDialog());

        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = 'image/*';
        this.fileInput.style.display = 'none';
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        this.controlPanel.appendChild(this.prevBtn);
        this.controlPanel.appendChild(this.nextBtn);
        this.controlPanel.appendChild(this.addSlideButton); // Додаємо кнопку для додавання слайду
        this.sliderContainer.appendChild(this.track);
        this.sliderContainer.appendChild(this.controlPanel);
        this.sliderContainer.appendChild(this.fileInput);

        this.addSlides();

        document.body.appendChild(this.sliderContainer);
    }

    addSlide(imageUrl) {
        const slide = document.createElement('div');
        slide.classList.add('slider-slide');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Slide';
        slide.appendChild(img);

        this.slides.push(slide);
        this.track.appendChild(slide);
    }

    addSlides() {
        this.addSlide('https://static-cse.canva.com/blob/191106/00_verzosa_winterlandscapes_jakob-owens-tb-2640x1485.jpg');
        this.addSlide('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSTBuvEGvJRJgPZhgyXUzg-tQDl7GUK5Q0g&s');
        this.addSlide('https://yaryna.net/img/10-pryjomiv.jpg');
    }

    showNextSlide() {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
        this.moveToSlide();
    }

    showPreviousSlide() {
        this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
        this.moveToSlide();
    }

    moveToSlide() {
        const offset = -this.currentSlideIndex * 100;
        if (this.orientation === 'horizontal') {
            this.track.style.transform = `translateX(${offset}%)`;
        } else {
            this.track.style.transform = `translateY(${offset}%)`;
        }
    }

    openFileDialog() {
        this.fileInput.click();
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                this.addSlide(imageUrl); // Додаємо зображення як слайд
            };
            reader.readAsDataURL(file);
        }
    }
}

// Створення слайдера
const sliderHorizontal = new Slider('horizontal');
const sliderVertical = new Slider('vertical');
