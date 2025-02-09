class Table {
    constructor(container) {
        this.container = container;
        this.data = [];
        this.init();
    }

    init() {
        this.table = document.createElement('table');
        this.container.appendChild(this.table);
        this.createHeaders(['Ім\'я', 'Вік', 'Місто']);
    }

    createHeaders(headers) {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        this.table.appendChild(thead);
        this.table.appendChild(document.createElement('tbody'));
    }

    addRow(data = null) {
        const tbody = this.table.querySelector('tbody');
        const tr = document.createElement('tr');

        const randomNames = ['Олександра', 'Марія', 'Іван', 'Наталія', 'Дмитро', 'Ольга', 'Андрій', 'Анна'];

        const rowData = data || {
            'Ім\'я': randomNames[Math.floor(Math.random() * randomNames.length)],
            'Вік': Math.floor(Math.random() * 50) + 20,
            'Місто': ['Київ', 'Львів', 'Харків', 'Одеса'][Math.floor(Math.random() * 4)]
        };

        Object.values(rowData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
        this.data.push(rowData);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('tableContainer');
    const table = new Table(tableContainer);

    const addRowBtn = document.getElementById('addRowBtn');
    addRowBtn.addEventListener('click', () => {
        table.addRow();
    });
});
