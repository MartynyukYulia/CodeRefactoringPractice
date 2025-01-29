document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    const storageHandlers = {
        checkbox: (input) => {
            const checkboxes = form.querySelectorAll(`input[name="${input.name}"]`);
            const selectedValues = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            return JSON.stringify(selectedValues);
        },
        radio: (input) => input.checked ? input.value : null,
        SELECT: (input) => JSON.stringify(Array.from(input.selectedOptions).map(option => option.value)),
        default: (input) => input.value
    };

    form.addEventListener('input', (event) => {
        const input = event.target;
        const handler = storageHandlers[input.type] || storageHandlers[input.tagName] || storageHandlers.default;
        const value = handler(input);
        if (value !== null) {
            localStorage.setItem(input.name, value);
        }
    });

    const restoreHandlers = {
        checkbox: (input, savedValue) => {
            const selectedValues = JSON.parse(savedValue);
            input.checked = selectedValues.includes(input.value);
        },
        radio: (input, savedValue) => {
            if (savedValue === input.value) {
                input.checked = true;
            }
        },
        SELECT: (input, savedValue) => {
            const selectedValues = JSON.parse(savedValue);
            Array.from(input.options).forEach(option => {
                option.selected = selectedValues.includes(option.value);
            });
        },
        default: (input, savedValue) => {
            input.value = savedValue;
        }
    };

    Array.from(form.elements).forEach(input => {
        const savedValue = localStorage.getItem(input.name);
        if (savedValue !== null) {
            const handler = restoreHandlers[input.type] || restoreHandlers[input.tagName] || restoreHandlers.default;
            handler(input, savedValue);
        }
    });

    form.addEventListener('reset', () => {
        Array.from(form.elements).forEach(input => localStorage.removeItem(input.name));
    });
});