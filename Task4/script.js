class Component {
    constructor(container) {
        this.container = container;
    }

    createElement(tag, className = '') {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    appendTo(parent, element) {
        parent.appendChild(element);
    }

    toggleClass(element, className, condition) {
        if (condition) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    }
}

class Form extends Component {
    constructor(container) {
        super(container);
        this.init();
    }

    init() {
        this.form = this.createElement('form');
        this.appendTo(this.container, this.form);
        this.addField('name', 'Ім\'я', 'text', true);
        this.addField('email', 'Email', 'email', true);
        this.addField('phone', 'Телефон', 'tel', true);
        this.addSubmitButton();
        this.setupValidation();
    }

    addField(name, label, type, required) {
        const fieldGroup = this.createElement('div', 'form-group');

        const labelElement = this.createElement('label');
        labelElement.textContent = label;
        if (required) labelElement.textContent += ' *';

        const input = this.createElement('input');
        input.type = type;
        input.name = name;
        input.required = required;
        input.id = name;

        const errorMessage = this.createElement('div', 'error-message');
        errorMessage.id = `${name}-error`;

        this.appendTo(fieldGroup, labelElement);
        this.appendTo(fieldGroup, input);
        this.appendTo(fieldGroup, errorMessage);
        this.appendTo(this.form, fieldGroup);
    }

    addSubmitButton() {
        const button = this.createElement('button', 'btn');
        button.type = 'submit';
        button.textContent = 'Відправити';
        this.appendTo(this.form, button);
    }

    setupValidation() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData.entries());
                console.log('Form submitted:', data);
                alert('Форму успішно відправлено!');
                this.form.reset();
            }
        });

        this.form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    validateField(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        let isValid = true;
        let errorMessage = '';

        switch (input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(input.value);
                errorMessage = 'Введіть коректний email';
                break;
            case 'tel':
                const phoneRegex = /^\+?\d{10,13}$/;
                isValid = phoneRegex.test(input.value);
                errorMessage = 'Введіть коректний номер телефону';
                break;
            case 'text':
                isValid = input.value.length >= 2;
                errorMessage = 'Поле повинно містити мінімум 2 символи';
                break;
        }

        this.toggleClass(input, 'invalid', !isValid && input.value);
        errorElement.textContent = !isValid && input.value ? errorMessage : '';
        return isValid;
    }

    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('input').forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }
}

// Ініціалізація форми
const formContainer = document.getElementById('formContainer');
new Form(formContainer);
