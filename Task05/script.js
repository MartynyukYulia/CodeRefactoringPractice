class Tab {
    constructor(containerId) {
        this.container = document.createElement("div");
        this.container.classList.add("container");
        this.tabsPanel = document.createElement("div");
        this.tabsPanel.classList.add("tabs-panel");
        this.tabButtons = [];
        this.tabContents = [];
        this.activeIndex = 0;
        this.container.appendChild(this.tabsPanel);
        document.body.appendChild(this.container);
    }

    addTab(title, content) {
        const tabIndex = this.tabButtons.length;

        const button = document.createElement("div");
        button.classList.add("tab-button");
        button.innerText = title;
        button.addEventListener("click", (event) => { this.switchTab(tabIndex) });
        this.tabsPanel.appendChild(button);
        this.tabButtons.push(button);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("tab-content");
        contentDiv.innerHTML = content;
        this.container.appendChild(contentDiv);
        this.tabContents.push(contentDiv);

        if (tabIndex === 0) {
            button.classList.add("active");
            contentDiv.classList.add("active");
        }
    }

    switchTab(index) {
        this.tabButtons[this.activeIndex].classList.remove("active");
        this.tabContents[this.activeIndex].classList.remove("active");

        this.tabButtons[index].classList.add("active");
        this.tabContents[index].classList.add("active");

        this.activeIndex = index;
    }
}

const tabs = new Tab("tabs");
tabs.addTab("Tab 1", "<p>Вміст першої вкладки.</p>");
tabs.addTab("Tab 2", "<p>Вміст другої вкладки.</p>");
tabs.addTab("Tab 3", "<p>Вміст третьої вкладки.</p>");

