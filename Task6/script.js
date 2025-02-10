class NotificationSystem {
    constructor() {
        // Створення контейнера для повідомлень
        this.container = document.body;
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.classList.add('notification-container');
            this.container.appendChild(container);
        }
    }

    getIcon(type) {
        switch (type) {
            case 'success': return '✓';
            case 'error': return '✕';
            case 'info': return 'ℹ';
            default: return 'ℹ';
        }
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.innerHTML = `
            <span class="notification-icon">${this.getIcon(type)}</span>
            <div class="notification-content">${message}</div>
        `;
        return notification;
    }

    addCloseButton(notification) {
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('notification-close');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => this.hide(notification));
        notification.appendChild(closeBtn);
    }

    autoHideNotification(notification, timeout = 5000) {
        setTimeout(() => {
            if (notification.parentElement) {
                this.hide(notification);
            }
        }, timeout);
    }

    show(message, type = 'info') {
        const notification = this.createNotification(message, type);

        const container = document.querySelector('.notification-container');
        container.appendChild(notification);

        this.addCloseButton(notification);
        this.autoHideNotification(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        return notification;
    }

    hide(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }
}

const notificationSystem = new NotificationSystem();
