// Assignment5
// Part 1: ERD Diagram (1 Grade)
// Musicana records have decided to store information on musicians who perform on their albums in a database. The company has wisely chosen to hire you as a database designer.
// Each musician that is recorded at Musicana has an ID number,a name, an address (street, city) and a phone number.
// Each instrument that is used in songs recorded at Musicana has a unique name and a musical key (e.g., C, B-flat, E-flat).
// Each album that is recorded at the Musicana label has a unique title, a copyright date, and an album identifier.
// Each song recorded at Musicana has a unique title and an author.
// Each musician may play several instruments, and a given instrument may be played by several musicians.
// Each album has a number of songs on it, but no song may appear on more than one album.
// Each song is performed by one or more musicians, and a musician may perform a number of songs.
// Each album has exactly one musician who acts as its producer.
// A producer may produce several albums.
// Answer attached as an image with name (part1 answer - Musicana_ERD.jpg)
//----------------------------------------------------------------------------------//

// Part2: Design a schema (Mapping) for the following ERD. (Use any design tool you want) (1 Grade)
// Answer attached as an image with name (part2 answer.png)
//----------------------------------------------------------------------------------//

// Part 3: (Using Node.js and MySQL) Answer the Questions below based on the given Scenario
// The small retail store needs a database to manage information about its products, suppliers, and sales.
// Database Requirements
const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "assignment5",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// app.get('/products', (req, res) => {
//     connection.execute('SELECT * FROM Products where StockQuantity>=?',[50],(err, results) => {
//         if (err) {
//             console.error('Error executing the query:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json(results);
//     })
// })
app.get("/", (req, res) => {
  console.log("Home Page");
  res.send("Home Page");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Tables:

// 1.Products Table:
// ProductID: Unique identifier for each product (integer, primary key, auto-increment).
// ProductName: Name of the product (text).
// Price: Price of the product (decimal).
// StockQuantity: Quantity of the product in stock (integer).
// SupplierID: ID of the supplier providing the product (integer, foreign key referencing Suppliers).

// 2.Suppliers Table:
// SupplierID: Unique identifier for each product (integer, primary key, auto-increment).
// SupplierName: Name of the supplier (text).
// ContactNumber: Supplier’s contact number (text).

// 3.Sales Table:
// SaleID: Unique identifier for each product (integer, primary key, auto-increment).
// ProductID: Reference to the product sold (integer, foreign key referencing Products).
// QuantitySold: Quantity of the product sold (integer).
// SaleDate: Date of sale (date).

// (Using Node.js and MySQL) generate queries that perform the following tasks (8 Grades):
// 1- Create the required tables for the retail store database based on the tables structure and relationships. (0.5 Grade)
//tables structure and relationships created and attached in as an image.
// 2- Add a column “Category” to the Products table. (0.5 Grade)
app.patch("/products/addCategory", (req, res) => {
  connection.execute(
    "ALTER TABLE Products ADD COLUMN Category VARCHAR(255)",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 3- Remove the “Category” column from Products. (0.5 Grade)
app.patch("/products/removeCategory", (req, res) => {
  connection.execute(
    "ALTER TABLE Products DROP COLUMN Category",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 4- Change “ContactNumber” column in Suppliers to VARCHAR (15). (0.5 Grade)
app.patch("/suppliers/changeContactNumber", (req, res) => {
  connection.execute(
    "ALTER TABLE Suppliers MODIFY COLUMN ContactNumber VARCHAR(15)",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 5- Add a NOT NULL constraint to ProductName. (0.5 Grade)
app.patch("/products/addNotNull", (req, res) => {
  connection.execute(
    "ALTER TABLE Products MODIFY COLUMN ProductName VARCHAR(255) NOT NULL",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 6- Perform Basic Inserts: (0.5 Grade)
// a.Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
app.post("/suppliers/addSupplier", (req, res) => {
  connection.execute(
    "INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)",
    ["FreshFoods", "01001234567"],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// b.Insert the following three products, all provided by 'FreshFoods':
// i.'Milk' with a price of 15.00 and stock quantity of 50.
// ii.'Bread' with a price of 10.00 and stock quantity of 30.
// iii.'Eggs' with a price of 20.00 and stock quantity of 40.
app.get("/products/addProducts", (req, res) => {
  connection.execute(
    "INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)",
    ["Milk", 15.0, 50, 1, "Bread", 10.0, 30, 1, "Eggs", 20.0, 40, 1],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// c.Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
app.post("/sales/addSale", (req, res) => {
  connection.execute(
    "INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (?, ?, ?)",
    [1, 2, "2025-05-20"],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 7- Update the price of 'Bread' to 25.00. (0.5 Grade)
app.patch("/products/updatePriceOfBread", (req, res) => {
  connection.execute(
    "UPDATE Products SET Price = ? WHERE ProductName = ?",
    [25.0, "Bread"],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 8- Delete the product 'Eggs'. (0.5 Grade)
app.delete("/products/deleteEggs", (req, res) => {
  connection.execute(
    "DELETE FROM Products WHERE ProductName = ?",
    ["Eggs"],
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 9- Retrieve the total quantity sold for each product. (0.5 Grade)
app.get("/sales/totalQuantitySold", (req, res) => {
  connection.execute(
    "SELECT ProductID, SUM(QuantitySold) AS TotalQuantitySold FROM Sales GROUP BY ProductID",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 10- Get the product with the highest stock. (0.5 Grade)
app.get("/products/highestStock", (req, res) => {
  connection.execute(
    "SELECT * FROM Products WHERE StockQuantity = (SELECT MAX(StockQuantity) FROM Products)",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 11- Find suppliers with names starting with 'F'. (0.5 Grade)
app.get("/suppliers/suppliersStartingWithF", (req, res) => {
  connection.execute(
    "SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 12- Show all products that have never been sold. (0.5 Grade)
app.get("/products/productsNeverSold", (req, res) => {
  connection.execute(
    "SELECT * FROM Products WHERE ProductID NOT IN (SELECT DISTINCT ProductID FROM Sales)",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 13- Get all sales along with product name and sale date. (0.5 Grade)
app.get("/sales/salesWithProductNameAndSaleDate", (req, res) => {
  connection.execute(
    "SELECT Sales.*, Products.ProductName FROM Sales INNER JOIN Products ON Sales.ProductID = Products.ProductID",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 14- Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables. (0.5 Grade)
app.get("/users/store_manager", (req, res) => {
  connection.execute(
    "CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY 'password'",
    (err, results) => {
      if (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      connection.execute(
        "GRANT SELECT, INSERT, UPDATE ON *.* TO 'store_manager'@'localhost'",
        (err, results) => {
          if (err) {
            console.error("Error granting permissions:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json(results);
        }
      );
    }
  );
});

// 15- Revoke UPDATE permission from “store_manager”. (0.5 Grade)
app.get("/users/revoke_store_manager", (req, res) => {
  connection.execute(
    "REVOKE UPDATE ON *.* FROM 'store_manager'@'localhost';",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
// 16- Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade)
app.get("/users/grant_store_manager", (req, res) => {
  connection.execute(
    "GRANT DELETE ON Sales TO 'store_manager'@'localhost';",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});

app.use("{/*demo}", (req, res) => {
  res
    .status(404)
    .json({ error: `Your entered URL [ ${req.originalUrl} ] not Found` });
});
