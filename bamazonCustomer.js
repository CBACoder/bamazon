// this app will display items for sale and allow customer to place order if item in stock

//import mysql and inquirer modules
var mysql = require('mysql');
var inquire = require('inquirer');
var Table = require('cli-table');

// array to hold result set
let itemsAvailable = [];
//create a connection to the database
var connection = mysql.createConnection({
    host:"localhost",
    port:8889,
    user:"root",
    password:'root',
    database:'bamazon_db'
});
//connect to the database and dis
connection.connect(function(err){
    if(err) throw err;
    console.log('Successfully connected to the db..');
    console.clear();
    startApp();
});

//startApp function runs the app
function startApp(){
    console.clear();
    //new table to hold items for sale
    var table = new Table({
        head: ['Item ID', 'Product Name','Price','Department']
      , colWidths: [10,40, 10,30]
    });

    //first query database for all items for sale
    const qString ='SELECT item_id,product_name,price,department_name FROM products WHERE stock_quantity > 0';
    connection.query(qString,function(err,results){
        if(err){
            console.log('There was an error in your app. Consult Admin.');
        }

        for( let i in results){
            table.push([
                results[i].item_id,
                results[i].product_name,
                results[i].price,
                results[i].department_name
            ])
        }
        // add items into an array
        for( let i in results){
            itemsAvailable.push({
                itemid:results[i].item_id,
                productname:results[i].product_name,
                price:results[i].price,
                department:results[i].department_name
            })
        }
        //display items
        console.log(`Displaying items available for sale.`);
        // console.log(`------------------------------------`);
        // for(let i in itemsAvailable){
        //     console.log('ItemID: '+itemsAvailable[i].itemid+', Product Name: '+itemsAvailable[i].productname+', Price: '+itemsAvailable[i].price);
        // }
        // console.log(`------------------------------------`);
        console.log(table.toString());
        initializeApp();
    });
}
//ask user what item they would like to buy and quantity
function askUserForOder(){
    inquire.prompt([
        {
            type: "input",
            message: "Enter item ID to purchase: ",
            name: "itemID"
        },
        {
            type: "input",
            message: "Enter quantity to purchase: ",
            name: "quantity"
        }
    ]).then(function(inquirerResponse) {
        // console.log(inquirerResponse);
        // console.log(inquirerResponse.itemID);
        

        //loop itmes array to check if id entered exists and if not tell user. this piece I will code later.

        // check if no selection restart app
        if(inquirerResponse.itemID === "" || inquirerResponse.quantity === ""){
            console.log('A selection is neede !!');
            startApp();
        }else{
            var qString = "";
            var totalcost=0;
            const customerQuantity = parseInt(inquirerResponse.quantity);
            // query database to check if in stock
            qString = "SELECT stock_quantity,price FROM products WHERE item_id ="+parseInt(inquirerResponse.itemID);
            
            connection.query(qString,function(err,results){
                if(err) throw err;
                // console.log(results);
                // console.log(results[0].stock_quantity);

                //compare quantity to order and actual stock
                if(customerQuantity > results[0].stock_quantity){
                    console.log('Your order exceeds items in stock.');
                    console.log('Only '+results[0].stock_quantity+' item(s) in stock.');
                    console.log("Your order was unsuccessful");
                    console.log("Please revise your order.");
                    initializeApp();
                }else{
                    //place order and update stock.
                    totalcost = results[0].price * customerQuantity;
                    qString = "UPDATE products SET stock_quantity = stock_quantity -"+customerQuantity+"  WHERE ?"
                    connection.query(qString,
                    [
                        {
                            item_id:parseInt(inquirerResponse.itemID)
                        }
                    ],function(err,results){
                        if(err) throw err;
                        console.log("Your order was successful. \nYour order total is: "+"$"+totalcost+" \nThank you");
                        proceed();
                    });
                }         
            });
        }
    });
}

// Ask customer to confirm if they would like to place an order
function initializeApp() {
    inquire.prompt([{
        type: "confirm",
        message: "Would you like to place an order ?",
        name: "confirm",
        default: true
    }
    ]).then(function (inquirerResponse) {
        // console.log(inquirerResponse);
        // If customer confirms to placing an order as for input
        if (inquirerResponse.confirm) {
            askUserForOder();
        }
        else {
            console.log("\nThat's okay, come again when you are more sure.\n");
            connection.end();
        }
    });
}

// ask customer if they would like to proceed buying another item.
function proceed() {
    inquire.prompt([{
        type: "confirm",
        message: "Would you like to continue ?",
        name: "confirm",
        default: true
    }
    ]).then(function (inquirerResponse) {
        //console.log(inquirerResponse);
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.confirm) {
            startApp();
        }
        else {
            console.log("\nThat's okay, come again when you are more sure.\n");
            connection.end();
        }
    });
}