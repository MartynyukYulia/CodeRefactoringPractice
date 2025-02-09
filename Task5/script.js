class Tabs {
    constructor(container) {
        this.container = container;
        this.tabs = [];
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="tabs-nav"></div>
            <div class="tabs-content"></div>
        `;

        this.navContainer = this.container.querySelector('.tabs-nav');
        this.contentContainer = this.container.querySelector('.tabs-content');
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    appendTo(parent, child) {
        parent.appendChild(child);
    }

    addTab(title, content) {
        const tabIndex = this.tabs.length;

        const tabButton = this.createElement('button', 'tab-button');
        tabButton.textContent = title;
        tabButton.addEventListener('click', () => this.showTab(tabIndex));
        this.appendTo(this.navContainer, tabButton);

        // Створення контенту вкладки
        const tabContent = this.createElement('div', 'tab-content');
        tabContent.innerHTML = content;
        this.appendTo(this.contentContainer, tabContent);

        this.tabs.push({ button: tabButton, content: tabContent });

        if (tabIndex === 0) {
            this.showTab(0);
        }

        return this;
    }

    showTab(index) {
        this.tabs.forEach((tab, i) => {
            if (i === index) {
                tab.button.classList.add('active');
                tab.content.classList.add('active');
            } else {
                tab.button.classList.remove('active');
                tab.content.classList.remove('active');
            }
        });
    }
}

window.onload = function () {
    const tabs = new Tabs(document.getElementById('myTabs'));

    tabs.addTab(
        'Головна 🏠',
        `<h2>Ласкаво просимо до нашого сервісу! 👋</h2>
        <div class="success-stats">
            <div class="stat-card">
                <div class="stat-number">5000+ Задоволених клієнтів</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">98% Позитивних відгуків</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">10 років на ринку</div>
            </div>
        </div>`
    )
        .addTab(
            'Послуги 🛠️',
            `<h2>Наші послуги та ціни 💫</h2>
        <div class="feature-card">
            <div class="feature-title">🌐 Веб-розробка</div>
            <p>Створення сучасних веб-сайтів та додатків з адаптивним дизайном</p>
            <div class="price-tag">від 10000 ₴</div>
        </div>`
        )
        .addTab(
            'Контакти 📞',
            `<h2>Зв'яжіться з нами! 🤝</h2>
        <div class="contact-info">
            <span>📍</span>
            <div><strong>Адреса:</strong><br>м. Житомир, вул. Чуднівська, 103</div>
        </div>`
        );
};
