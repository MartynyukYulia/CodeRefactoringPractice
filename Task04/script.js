class Form {
    constructor(name) {
        this.form = document.createElement("form");
        this.form.classList.add("form");
        this.formName = document.createElement("h3");
        this.formName.textContent = name;
        this.form.appendChild(this.formName);
        document.body.appendChild(this.form);
        this.inputs = [];
    }

    addInput(name, placeholder = "", type = "text", required = false, validationType = null) {
        const label = document.createElement("label");
        label.textContent = name;

        const input = document.createElement("input");
        input.name = name;
        input.type = type;
        input.placeholder = placeholder;
        input.required = required;
        input.validationType = validationType;

        this.inputs.push(input);

        this.form.appendChild(label);
        this.form.appendChild(input);
    }

    addButton(label, clickHandler) {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = label;

        button.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.validate()) {
                this.submit();
            }
        });

        this.form.appendChild(button);
    }

    validate() {
        let isValid = true;

        this.inputs.forEach((input) => {
            if (input.required && !input.value) {
                isValid = false;
                alert(`${input.name} is required!`);
            } else if (input.validationType === "email" && !this.isValidEmail(input.value)) {
                isValid = false;
                alert(`${input.name} must be a valid email address!`);
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        const emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    }
    submit() {
        if (this.validate()) {
            alert(`${this.formName.textContent} submitted successfully!`);
            console.log(`${this.formName.textContent} submitted successfully!`);
            this.inputs.forEach((input) => {
                console.log(`${input.name}: ${input.value}`);
                input.value = "";
            });
        }
    }
}

let form = new Form("Form");

form.addInput("Login", "Enter your login", "text", true);
form.addInput("Email", "Enter your email", "email", true, "email");
form.addInput("Password", "Enter your password", "password", true);

form.addButton("Submit");
