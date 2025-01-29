class Slider {
    constructor(direction = 'horizontal') {
        this.direction = direction;
        this.slides = [];
        this.currentIndex = 0;

        this.block = document.createElement("div");
        this.block.classList.add("block");

        this.slider = document.createElement("div");
        this.slider.classList.add("slider");
        if (this.direction === 'vertical') {
            this.slider.style.flexDirection = 'row';
        }
        this.container = document.createElement("div");
        this.container.classList.add("container");
        this.sliderWrapper = document.createElement("div");
        this.sliderWrapper.classList.add("wrapper");
        if (this.direction === 'vertical') {
            this.sliderWrapper.style.flexDirection = 'column';
        }

        this.panel = document.createElement("div");
        if (this.direction === 'horizontal') {
            this.panel.classList.add('horizontalPanel');
        }
        else {
            this.panel.classList.add('verticalPanel');
        }

        this.prevButton = document.createElement("button");
        this.prevButton.classList.add("prevBtn");
        this.prevButton.textContent = "Prev";

        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.id = 'fileInput';
        this.fileInput.accept = 'image/*';
        this.fileInput.multiple = true;
        this.fileInput.addEventListener('change', (event) => this.uploadImages(event.target.files));

        this.nextButton = document.createElement("button");
        this.nextButton.classList.add("nextBtn");
        this.nextButton.textContent = "Next";

        this.prevButton.addEventListener("click", (event) => { this.prevSlide() });
        this.nextButton.addEventListener("click", (event) => { this.nextSlide() });

        this.container.appendChild(this.sliderWrapper);
        this.panel.appendChild(this.prevButton);
        this.panel.appendChild(this.nextButton);

        this.slider.appendChild(this.container);
        this.slider.appendChild(this.panel);
        this.block.appendChild(this.fileInput);
        this.block.appendChild(this.slider);
        document.body.appendChild(this.block);
    }

    addSlide(content) {
        const slide = document.createElement('div');

        slide.classList.add('slide');

        // Додає зображення або інший вміст
        if (typeof content === 'string') {
            slide.innerHTML = content;
        }
        else {
            slide.appendChild(content);
        }

        this.slides.push(slide);
        this.sliderWrapper.appendChild(slide);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSliderPosition();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const offset = -this.currentIndex * 200 + 'px';

        if (this.direction === 'horizontal') {
            this.sliderWrapper.style.transform = `translateX(${offset})`;
        } else {
            this.sliderWrapper.style.transform = `translateY(${offset})`;
        }
    }

    uploadImages = (files) => {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Uploaded Image';
                img.style.width = '100%';
                this.addSlide(img);
            };
            reader.readAsDataURL(file);
        });
    }
}

const slider_one = new Slider('horizontal');
const slider_two = new Slider('vertical');

slider_one.addSlide('<img src="images/Mountain1.jpg" alt="Image 1">');
slider_one.addSlide('<img src="images/Mountain2.jpeg" alt="Image 2">');
slider_one.addSlide('<img src="images/Mountain3.jpeg" alt="Image 3">');
slider_one.addSlide('<img src="images/Mountain4.jpeg" alt="Image 4">');

slider_two.addSlide('<img src="images/Mountain1.jpg" alt="Image 1">');
slider_two.addSlide('<img src="images/Mountain2.jpeg" alt="Image 2">');
slider_two.addSlide('<img src="images/Mountain3.jpeg" alt="Image 3">');
slider_two.addSlide('<img src="images/Mountain4.jpeg" alt="Image 4">');
