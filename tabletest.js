// this .js is used to test the table used to present the items for sale.
var mysql = require('mysql');
var inquire = require('inquirer');
var Table = require('cli-table');

var Table = require('cli-table');
 
// instantiate
function startApp() {
    var table = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Department']
        , colWidths: [5, 30, 10, 30]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    table.push(
        ['First value', 'Second value', 'Third value', 'Fourth Value']
        , ['First value', 'Second value', 'Third value', 'Fourth Value']
    );

    console.log(table.toString());
}


function initializeApp() {
    inquire.prompt([{
        type: "confirm",
        message: "Would you like to place an order ?",
        name: "confirm",
        default: true
    }
    ]).then(function (inquirerResponse) {
        console.log(inquirerResponse);
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.confirm) {
            startApp()
        }
        else {
            console.log("\nThat's okay, come again when you are more sure.\n");
        }
    });
}

initializeApp();