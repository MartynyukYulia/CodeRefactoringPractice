class Notification {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    createNotification(message, type = "success") {
        const notification = document.createElement("div");
        notification.classList.add("notification", type);
        notification.textContent = message;

        const closeButton = document.createElement("button");
        closeButton.classList.add("close-btn");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", (event) => { this.closeNotification(notification) });
        notification.appendChild(closeButton);

        this.container.appendChild(notification);

        setTimeout(() => {
            this.closeNotification(notification);
        }, 3000);
    }

    closeNotification(notification) {
        notification.classList.add("hide");
        setTimeout(() => {
            notification.remove();
        }, 500);
    }
}
const notifications = new Notification("notification-container");

document.getElementById("success-btn").onclick = () => notifications.createNotification("Операція успішна!", "success");
document.getElementById("error-btn").onclick = () => notifications.createNotification("Сталася помилка!", "error");
document.getElementById("info-btn").onclick = () => notifications.createNotification("Це інформаційне повідомлення.", "info");
document.getElementById("warning-btn").onclick = () => notifications.createNotification("Це попередження!", "warning");
