import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import Table from 'cli-table3';

// Open database connection
const db = new sqlite3.Database('testDB.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    }
});

// Promisify db.all for async/await
const dbAll = promisify(db.all).bind(db);

// Function to get all table names
async function getTables() {
    const tables = await dbAll("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
    return tables.map(row => row.name);
}

// Function to display contents of a table
async function displayTable(tableName) {
    console.log(`\n📂 Table: ${tableName}\n`);

    // Get column names
    const columns = await dbAll(`PRAGMA table_info(${tableName});`);
    const columnNames = columns.map(col => col.name);

    // Get table rows
    const rows = await dbAll(`SELECT * FROM ${tableName};`);

    if (rows.length === 0) {
        console.log("⚠️  No data found in this table.\n");
        return;
    }

    // Create table format
    const cliTable = new Table({
        head: columnNames,
        colWidths: columnNames.map(() => 20) // Adjust column width
    });

    // Add rows to the table
    rows.forEach(row => {
        cliTable.push(columnNames.map(col => row[col] || 'NULL')); 
    });

    console.log(cliTable.toString());
}

// Main function to display all tables
async function displayDatabase() {
    const tables = await getTables();

    if (tables.length === 0) {
        console.log("⚠️  No tables found in the database.");
        return;
    }

    for (const table of tables) {
        await displayTable(table);
    }

    db.close();
}

// Run the script
displayDatabase().catch(err => console.error("Error:", err));
