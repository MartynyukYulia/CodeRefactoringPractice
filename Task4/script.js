const LABELS = {
    name: 'Ім\'я',
    email: 'Email',
    phone: 'Телефон'
};

const ERROR_MESSAGES = {
    email: 'Введіть коректний email',
    phone: 'Введіть коректний номер телефону',
    text: 'Поле повинно містити мінімум 2 символи'
};

const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?\d{10,13}$/
};

const MIN_TEXT_LENGTH = 2;

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
        this.createFields();
        this.addSubmitButton();
        this.setupValidation();
    }

    createFields() {
        this.addField('name', LABELS.name, 'text', true);
        this.addField('email', LABELS.email, 'email', true);
        this.addField('phone', LABELS.phone, 'tel', true);
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
                isValid = REGEX.email.test(input.value);
                errorMessage = ERROR_MESSAGES.email;
                break;
            case 'tel':
                isValid = REGEX.phone.test(input.value);
                errorMessage = ERROR_MESSAGES.phone;
                break;
            case 'text':
                isValid = input.value.length >= MIN_TEXT_LENGTH;
                errorMessage = ERROR_MESSAGES.text;
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

const formContainer = document.getElementById('formContainer');
new Form(formContainer);
