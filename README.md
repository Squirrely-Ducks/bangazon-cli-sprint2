
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
>Too open the main menu 
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
--- | ---  | --- |--- | ---  | --- | --- | ---
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

