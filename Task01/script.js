class Modal {
    constructor() {
        this.modal = document.createElement("div");
        this.modal.classList.add("modalWindow");
        this.modal.style.display = "none";

        this.header = document.createElement("div");
        this.header.classList.add("modalHeader");

        this.content = document.createElement("div");
        this.content.classList.add("modalContent");

        this.closeButton = document.createElement("button");
        this.closeButton.classList.add("modalCloseBtn");
        this.closeButton.innerHTML = "&times;";

        this.header.appendChild(this.closeButton);
        this.modal.appendChild(this.header);
        this.modal.appendChild(this.content);
        document.body.appendChild(this.modal);

        this.closeButton.addEventListener("click", (event) => {
            this.Close();
        });
        this.header.addEventListener("mousedown", (event) => {
            this.Move(event);
        })

        this.isMoving = false;
        this.posX = 0;
        this.posY = 0;
    }

    Open(content) {
        this.SetContent(content);
        this.modal.style.display = "block";
    }

    Close() {
        this.modal.style.display = "none";
    }

    SetContent(content) {
        this.content.innerHTML = "";
        if (typeof content === "string") {
            this.content.innerHTML = content;
        }
        else {
            this.content.appendChild(content);
        }
    }

    Move(event) {
        this.isMoving = true;
        this.posX = event.clientX - this.modal.getBoundingClientRect().left;
        this.posY = event.clientY - this.modal.getBoundingClientRect().top;
        document.addEventListener("mousemove", (event) => this.Moving(event))
        document.addEventListener("mouseup", (event) => this.StopMoving(event))
    }

    Moving(event) {
        if (this.isMoving) {
            let x = event.clientX - this.posX;
            let y = event.clientY - this.posY;
            this.modal.style.left = `${x}px`;
            this.modal.style.top = `${y}px`;
        }
    }

    StopMoving() {
        this.isMoving = false;
        document.removeEventListener("mousemove", this.Moving);
    }
}

let modal = new Modal();
let openButton = document.body.querySelector(".open");
openButton.addEventListener("click", (event) => {
    modal.Open(`Text В JavaScript є закінчена пропозиція, майже у стандарті, що забезпечує підтримку приватних властивостей та методів на рівні мови. 
    Приватні властивості і методи повинні починатися з #. Вони доступні лише з класу. 
    Наприклад, ось приватна властивість #waterLimit та приватний метод, що перевіряє кількість води #fixWaterAmount:
    В JavaScript є закінчена пропозиція, майже у стандарті, що забезпечує підтримку приватних властивостей та методів на рівні мови. 
    Приватні властивості і методи повинні починатися з #. Вони доступні лише з класу. 
    Наприклад, ось приватна властивість #waterLimit та приватний метод, що перевіряє кількість води #fixWaterAmount:`);
});
