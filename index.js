const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const intializeDBandServer = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at localhost://3000/");
    });
  } catch (e) {
    console.log(`DB error ${e.message}`);
    process.exit(1);
  }
};

intializeDBandServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    select 
    * from
    book
    order by
    book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
