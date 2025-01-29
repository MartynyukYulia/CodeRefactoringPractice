document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    // Зберігаємо дані у localStorage
    form.addEventListener('input', (event) => {
        const input = event.target;

        if (input.type === 'checkbox') {
            const checkboxes = form.querySelectorAll(`input[name="${input.name}"]`);
            const selectedValues = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            localStorage.setItem(input.name, JSON.stringify(selectedValues));
        }
        else if (input.type === 'radio'  && input.checked) {
            localStorage.setItem(input.name, input.value);
        }
        else if (input.tagName === 'SELECT') {
            const selectedValues = Array.from(input.selectedOptions)
                .map(option => option.value);
            localStorage.setItem(input.name, JSON.stringify(selectedValues));
        }
        else {
            localStorage.setItem(input.name, input.value);
        }
    });

    // Відновлюємо дані з localStorage
    Array.from(form.elements).forEach(input => {
        let savedValue = localStorage.getItem(input.name);
        if (savedValue !== null) {
            if (input.type === 'checkbox') {
                const selectedValues = JSON.parse(savedValue);
                input.checked = selectedValues.includes(input.value);
            }
            else if (input.type === 'radio') {
                const savedValue = localStorage.getItem(input.name);
                if (savedValue === input.value) {
                    input.checked = true;
                }
            }
            else if (input.tagName === 'SELECT') {
                const selectedValues = JSON.parse(savedValue);
                Array.from(input.options).forEach(option => {
                    option.selected = selectedValues.includes(option.value);
                });
            }
            else {
                input.value = savedValue;
            }
        }
    });

    form.addEventListener('reset', () => {
        Array.from(form.elements).forEach(input => localStorage.removeItem(input.name));
    });
});


