
# Bangazon

## The Command Line Ordering System

In this group project, you will be allowing a user to interact with a basic product ordering database via a command line interface.

## Ordering System Interface

### Main Menu

```bash
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************
1. Create a customer account
2. Choose active customer
3. Create a payment option
4. Add product to sell
5. Add product to shopping cart
6. Complete an order
7. Remove customer product
8. Update product information
9. Show stale products
10. Show customer revenue report
11. Show overall product popularity
12. Leave Bangazon!
>
```

## Requirements

You will create a series of prompts that will allow the user to create various types of data in your ordering system.

1. Start with writing unit tests. As a group, determine the core functionality of the application. Define classes, controllers and methods that you think you need to build. Do that before writing the implementation code for core logic. DO NOT WRITE TESTS FOR THE USER INTERFACE (menu and prompts).
1. All classes and methods must be fully documented.

>5. Complete An order
* User must have an open order where payment type is null

* If the user does not have an order open, the user will be prompted to start an order to complete.

* If the user does not have a payment type on file, the user will be prompted to add a payment type before completing an order.

* Users are prompted with y/n to complete an order.

* Users are then prompted to select a payment type

* After a payment type is selected, users are given a prompt that an order has successfully been completed and taken back to the main menu

>6. Add a Product to Sell

* User must select a product type id 1-10

* User must enter a Product Title

* User must enter a price   `e.g. $12.12`

* User must enter a description

* User must enter a quantity of the product they want to sell

* User is then take back to the main menu

>7. Update a Product
* If a user does not have a product that is not on an order, user will be prompted back to the main menu

* If user has products that are not on an order, user will be prompted to select from a list of products to update.

* User is then prompted to update the product type id

* User is then prompted to update the Product Title

* User is then prompted to update the price of the product

* User is then prompted to update the product description

* User is then prompted to update the quantity of the product

* User is then prompted to back to the main menu

>8. Remove a Customer Product From Inventory

* If all products are on order, User cannot update a product

* If there a products not on orders, user is then prompted to select a product to delete

* User is then prompted that the product has been deleted and is prompted with the main menu

>9. Get revenue report

* User is prompted with the revenue for all product they are selling

>10. 
* User is prompted with a cash money baller exit from #Bangazon
