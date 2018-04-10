
# Bangazon

## The Command Line Ordering System


## Steps for Installation:
In your terminal enter the following commands to gain access to the BangazonCorp API:
* ``` git clone https://github.com/Squirrely-Ducks/bangazon-cli-sprint2.git ```
>To initialize the node packet manager:
* ``` npm init -y ```
>To install all required node packet dependancies"
* ``` npm install ```

## Your environment is now set up run the BangazonCorp CLI !


## Ordering System Interface
In your terminal enter the following commands
>To open the main menu 
* `` In your terminal enter  node bin/bangazon ``

## Main Menu

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
>> To create a new customer account select 1. in the main menu
* `` Then enter customer information the result should post to the table as such ``

First Name | Last Name | Street | City | Zip | Phone 
--- | ---  | --- |--- | ---  | --- | 
*Cookie* | *Case* | **Seasy Streat** | **Bird Land** | 37209 | 615-828-569

>> To be able to use any of the menu options 3-10 you must select an active customer by selecting 2. in the main menu 

```
*********************************************************
Select Active Customer
*********************************************************
1. Fred Smith
2. Cher null
3. Maurice Moss
4. Myrtle Moaning
5. Ben Gentle
6. Danny Elfman
7. Fred Sanford
8. Yolanda Garrison
```

* `` Select the correct number corresponding to the customer your would like to make active``


>> To create a payment option select 3. in the main menu
* `` Then enter payment information the result should post to the table as such ``

 Type | Account Number
--- | ---  | 
 Visa | 5158431997693020

>> To create add a product to shopping cart select 4. in the main menu

```
*********************************************************
Please select an order to add to
Bangazon Corp: Please make a selection:  

```
* `` Then after an order has been selected a menu of all products to select from will be showed ``

```
*********************************************************

1. Fantastic Frozen Bacon: vertical e-enable models, ONLY $327.00!
2. the thing: stuff , ONLY $60.6!
3. Handcrafted Concrete Sausages: viral engage technologies, ONLY $157.00!
4. Ergonomic Wooden Hat: extensible target technologies, ONLY $690.00!
5. Fantastic Wooden Bacon: B2B deliver bandwidth, ONLY $14.00!
6. Intelligent Frozen Computer: end-to-end drive web-readiness, ONLY $274.00!
7. Handcrafted Plastic Salad: virtual repurpose functionalities, ONLY $930.00!
8. Handcrafted Soft Table: impactful transform architectures, ONLY $644.00!
9. Refined Granite Shoes: one-to-one deliver partnerships, ONLY $385.00!
10. Ergonomic Plastic Hat: strategic monetize technologies, ONLY $555.00!
12. the thing: hot stuff, ONLY $66.69!
Bangazon Corp: Please make a selection:
```
>> After you have added the product to the active customers order you may complete it by pressing 5 in the main menu. You will be prompted with the following menu

```
*********************************************************
               Active Order
*********************************************************

Fantastic Frozen Bacon, 327.00
Complete This order y/n
Bangazon Corp: Complete:  n
You have chosen not to complete this order
```
* `` If no is chosen you will be directed back to the main menu``
* `` If yes is chosen you will be prompted to finish completing the order``
```
*********************************************************
                   Active Order
*********************************************************

1.  Visa, 5158431997693020
Select payment type to complete order
Bangazon Corp: type:  1
You have successfuly completed this order. Have a nice day!
```


>5. Complete An order
* User must have an open order where payment type is null

* If the user does not have an order open, the user will be prompted to start an order to complete.

* If the user does not have a payment type on file, the user will be prompted to add a payment type before completing an order.

* Users are prompted with y/n to complete an order.

* Users are then prompted to select a payment type

* After a payment type is selected, users are given a prompt that an order has successfully been completed and taken back to the main menu

>6. Add a Product to Sell
``` 
*********************************************************
Add a product
*********************************************************
Bangazon Corp: Enter product type id:  2
Bangazon Corp: Enter Product Title:  A cool jelly bean
Bangazon Corp: Enter price in the format xx.yy:  4300.12
Bangazon Corp: Enter product description:  This is a cookie jelly bean
Bangazon Corp: Enter the quantity to sell:  7000
* User must select a product type id 1-10 
```

* User must enter a Product Title

* User must enter a price   `e.g. $12.12`

* User must enter a description

* User must enter a quantity of the product they want to sell

* User is then take back to the main menu

>7. Update a Product
```
Please select a product to update
12. A cool jelly bean
Bangazon Corp: Please make a selection:  12
Bangazon Corp: Enter product type id:  3
Bangazon Corp: Enter Product Title:  A not cool jelly bean
Bangazon Corp: Enter price in the format xx.yy:  80000.00
Bangazon Corp: Enter product description:  This jelly bean is a cookie
Bangazon Corp: Enter the quantity to sell:  456
```
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
```
Bangazon Corp: Please make a selection:  9
Revenue report for Maurice Moss

Order #2
--------------------------------------------------
this Thing                           1    $12.12

Order Total: $12.12

Order #8
--------------------------------------------------
Refined Granite Shoes              1    $385.00

Order Total: $385.00

TOTAL REVENUE: $397.12
Bangazon Corp: Would you like to go back to main menu? (Y/N):
```
* User is prompted with the revenue for all product they are selling

* User is then asked if they would like to go back to main menu. If Yes, main menu is prompted. If not, user is exited from #Bangazon is fashionable style
>10. 
* User is prompted with a cash money baller exit from #Bangazon
