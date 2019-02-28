DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DECIMAL(7,2),
    stock_quantity INT
);

// Insert into products
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Bad Blood','Books',13.99,6);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Space 2.0','Books',14.55,11);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Winter Tire Chain','Automotive',9.15,13);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Toolbox','Automotive',17.98,5);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('RCA Refridgerator','Appliances',209,12);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Ice Maker','Appliances',99,8);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Sony DSCW800','Electronics',88,2);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Cannon Powershot','Electronics',158,1);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Dell xps','Computers',1800,4);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Lenovo Yoga','Computers',1600,3);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Office 365','Software',159,5);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Adobe Photoshop','Software',600,7);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Mountain Bike','Sports And Outdoors',1200,3);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Golf Clubs','Sports And Outdoors',450,4);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Electric Guitar','Musical Instruments',199,1);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Accoustic Guitar','Musical Instruments',105,10);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('TRENDnet Intelligent 1000 Base-T','Industrial',55,8);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES('Gigabit Ethernet Fiber Media Converter','Industrial',42,3);
