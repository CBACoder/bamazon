// this app will display items for sale and allow customer to place order if item in stock


//import mysql and inquirer modules
var mysql = require('mysql');
var inquire = require('inquirer');

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
    startApp();
});

//startApp function runs the app
function startApp(){
    //console.clear();
    //first query database for all items for sale
    const qString ='SELECT item_id,product_name,price,department_name FROM products WHERE stock_quantity > 0';
    connection.query(qString,function(err,results){
        if(err){
            console.log('There was an error in your app. Consult Admin.');
        }
        // add items into an array
        let itemsAvailable = [];
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
        console.log(`------------------------------------`);
        for(let i in itemsAvailable){
            console.log('ItemID: '+itemsAvailable[i].itemid+', Product Name: '+itemsAvailable[i].productname+', Price: '+itemsAvailable[i].price);
        }
        console.log(`------------------------------------`);
        askUserForOder();
    });
}
//ask user what item they would like to buy and quantity
function askUserForOder(){
    inquire.prompt([
        {
            type: "input",
            message: "Enter item ID to purchase",
            name: "itemID"
        },
        {
            type: "input",
            message: "Enter quantity to purchase",
            name: "quantity"
        }
    ]).then(function(inquirerResponse) {
        console.log(inquirerResponse);
        console.log(inquirerResponse.itemID);
        var qString = "";
        // query database to check if in stock
        qString = "SELECT stock_quantity FROM products WHERE item_id ="+parseInt(inquirerResponse.itemID);
        console.log(qString);
        connection.query(qString,function(err,results){
            if(err) throw err;
            console.log(results);
            console.log(results[0].stock_quantity);
            //compare quantity to order and actual stock
            if(parseInt(inquirerResponse.quantity) > results[0].stock_quantity){
                console.log('Your order exceeds items in stock.');
                console.log('Only '+results[0].stock_quantity+' item(s) in stock.');
                console.log("Your order was unsuccessful");
                console.log("Please revise your order.");
            }else{
                //place order and update stock.
                qString = "UPDATE products SET stock_quantity = stock_quantity -"+parseInt(inquirerResponse.quantity)+"  WHERE ?"
                connection.query(qString,
                [
                    {
                        item_id:parseInt(inquirerResponse.itemID)
                    }
                ],function(err,results){
                    if(err) throw err;
                    console.log("Your order was successful. Thank you");
                });
            } 
            startApp();          
        });
        
    });
}