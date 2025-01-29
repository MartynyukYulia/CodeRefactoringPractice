class Table {
    constructor(headers = []) {
        this.headers = headers;
        this.rows = [];
    }

    addRow(data) {
        if (data.length !== this.headers.length) {
            console.log("Довжина даних повинна відповідати кількості заголовків.");
        }
        this.rows.push(data);
    }

    addColumn(header, values = [], defaultValue = "") {
        this.headers.push(header);
        this.rows.forEach((row, index) => {
            row.push(values[index] !== undefined ? values[index] : defaultValue);
        });
    }

    generateHTML() {
        const table = document.createElement("table");

        const headerRow = document.createElement("tr");
        this.headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        this.rows.forEach(rowData => {
            const row = document.createElement("tr");
            rowData.forEach(cellData => {
                const td = document.createElement("td");
                td.textContent = cellData;
                row.appendChild(td);
            });
            table.appendChild(row);
        });
        return table;
    }
}

const table = new Table(["Name", "Age", "City"]);
table.addRow(["Alice", 25, "New York"]);
table.addRow(["Bob", 30, "Los Angeles"]);
table.addRow(["Charlie", 35, "Toronto"]);
table.addColumn("Country", ["USA", "UK", "Canada"]);

document.body.appendChild(table.generateHTML());