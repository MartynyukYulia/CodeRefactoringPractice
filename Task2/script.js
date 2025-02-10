class Slider {
    constructor(orientation = 'horizontal') {
        this.orientation = orientation;
        this.slides = [];
        this.currentSlideIndex = 0;

        this.sliderContainer = this.createElement('div', 'slider-container');

        this.track = this.createElement('div', 'slider-track');
        this.track.style.flexDirection = this.orientation === 'vertical' ? 'column' : 'row';

        this.controlPanel = this.createElement('div', 'slider-controls');

        this.prevBtn = this.createButton('Назад', 'btn-prev', () => this.showPreviousSlide());
        this.nextBtn = this.createButton('Вперед', 'btn-next', () => this.showNextSlide());
        this.addSlideButton = this.createButton('Додати слайд', 'btn-add-slide', () => this.openFileDialog());

        this.fileInput = this.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = 'image/*';
        this.fileInput.style.display = 'none';
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        this.controlPanel.append(this.prevBtn, this.nextBtn, this.addSlideButton);
        this.sliderContainer.append(this.track, this.controlPanel, this.fileInput);

        this.addSlides();

        document.body.appendChild(this.sliderContainer);
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    createButton(text, className, onClick) {
        const button = this.createElement('button', className);
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    addSlide(imageUrl) {
        const slide = this.createElement('div', 'slider-slide');

        const img = this.createElement('img');
        img.src = imageUrl;
        img.alt = 'Slide';
        slide.appendChild(img);

        this.slides.push(slide);
        this.track.appendChild(slide);
    }

    addSlides() {
        const defaultSlides = [
            'https://static-cse.canva.com/blob/191106/00_verzosa_winterlandscapes_jakob-owens-tb-2640x1485.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSTBuvEGvJRJgPZhgyXUzg-tQDl7GUK5Q0g&s',
            'https://yaryna.net/img/10-pryjomiv.jpg'
        ];
        defaultSlides.forEach(slide => this.addSlide(slide));
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
                this.addSlide(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    }
}

const sliderHorizontal = new Slider('horizontal');
const sliderVertical = new Slider('vertical');
