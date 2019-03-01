# bamazon
*This is a NodeJS application running on a MySQL database backend*

#Purpose
This app will display a list of items(products) available for sale and prompt the customer for input on whether they would like to place an order.

If the customer says yes, the app prompt user to enter item ID and quantity.
If item ID and quantity are valid, and there is enough stock, order is processed and the stock is updated in the database.

if item ID or quantity are invalid, user is is notified to enter a valid selection and prompted whether to continue.

if user chooses to continue, the user needs to enter valid item ID and quantity. these are integer entries.

The app does not have tracking of orders placed, this will be developed in another phase. 

#usefullness
This app will help small business owner to sell their products and keep track of inventory instead of using a manual process. customers will not place orders of items not in stock which is a good thing.
in the next phase, manager view and supervisor views will be added to make the app robust.

# to get started
Start the app from a git bash console by typing *node bamazonCustomer.js*
a list of items will be displayed.
Follow prompts to place your order.

See in the images folder the screen shots of the flow.