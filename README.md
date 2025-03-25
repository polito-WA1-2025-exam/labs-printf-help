# Group "prinf("Help");"

## Members
- s347814 APPEL ROLF
- s346565 SEDIA TOMMASO
- s346317 UGLIANO ANDREA
- s293382 VIANELLO SAMUELE

# FOR NODE MODULES:
run `npm install` or `npm.cmd install` to check if you have all the necessary modules, `npm update` or `npm.cmd update` to update all existing modules to the newest version.

# Exercise "Poke"

# Lab Journal

## Directory Tree

_TODO_

## Lab1:
- added basic functions, getters and setters
- chose the topic: Poke

    **Container Functions**
    | Function Name    | What it does |
    | -------- | ------- |
    addBowl(size, base)    |     add a bowl into a list
    getFilter(size, base) |     return a list of bowls matching size and base criteria
    sortBySize()|               sort all the bowls added by their size
    getBowlsList()|             return the list of all the added bowls
    getBowlbyID(id)|            return the bowl object matching the id
    deleteBowl(id)|             delete the bowl from the list matching the id



    **Bowl**

    | Function Name    | What it does |
    | -------- | ------- |
    getSize()    |     returns bowl size
    getBase() 	|returns bowl base
    getProteins()	|returns list of proteins in bowl
    getIngredients() |	returns list of ingredients in bowl
    addProtein(protein)	|adds a protein to a bowl, if the limit is not yet reached
    addIngredient(ingredient) |	adds an ingredient to a bowl, if the limit is not yet reached
    getContents()	|returns a list of all the current ingredients in a bowl

    **Size**

    Function Name    | What it does
    -------- | -------
    getSize()    |     returns size type
    maxProteins() 	|returns proteins limit (1 - 3)
    maxIngredients() 	|returns ingredients limit (4 or 6)
    
    **Base**
    | Function Name    | What it does |
    | -------- | ------- |
    getBase()    |     returns base name

    **Protein**
    | Function Name    | What it does |
    | -------- | ------- |
    getProtein()    |     returns protein name

    **Ingredient**
    | Function Name    | What it does |
    | -------- | ------- |
    getIngredient()    |     returns Ingredient name

---
## Lab2:
- added database orders. How to insert:
'''INSERT INTO orders (user_id, order_contents, (default 0.0)total_price, (optional) applied_discount)
VALUES (1, '[
    {"bowl_id": 1, "proteins" : ["salmon"], "ingredients": ["chicken", "rice", "broccoli"]},
    {"bowl_id": 2, "proteins" : ["tuna", "octopus"] "ingredients": ["beef", "noodles", "carrots"]}
]', ); '''
---
## Lab 3:
You can send the http request straight from the md file as a test.

 **list of APIs:**
* **Add User:**
> [!NOTE]
>Add a new user in the database if it doesn't exist or the email is not in use.

```http
POST http://localhost:3000/user
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

> [!WARNING]
> Might raise errors if: 
> + Password is shorter than 8 characters.
> + Username or email already present in the database.

+ **Delete User:**
> [!NOTE]
>Delete a user from the database.
```http
DELETE  http://localhost:3000/user
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "admin123"
}
```
> [!WARNING]
> Might raise errors if the user identifier is not found.
>> [!NOTE]
>> This error should only rise during testing, because a deletion of the user should only be possible after the user log in and after he specifically decide to remove his account.

+ **Retrieve all users:**
> [!NOTE]
>Retrieve the list of all user present in the database.
```http
GET http://localhost:3000/user

> [!CAUTION]  
> This query should only be done for testing purpose and not be implemented in the final project.
```
+ **Retrieve a specific user:**  
> [!NOTE]
>  Given a email/username and password, return the user object.   

```http
GET http://localhost:3000/user/authenticate?identifier=admin@gmail.com&password=admin123
```
> [!WARNING]
> Returns an error if the email/username doesn't exist or the password inserted was wrong.
+ **get all bowls:**
//TODO implement password check ?
```http
GET http://localhost:3000/bowls
```
+ **Get all bowls for a specific user:**  
  _TODO: Given a username or email + password, return the user object._  

  - **To get bowls of a user with a known email and password:**  

```http
GET http://localhost:3000/bowls/auth/user?email=admin@gmail.com&password=admin123
```  

  - **To get bowls of a user with a known username and password:**  
```http
GET http://localhost:3000/bowls/auth/user?username=admin&password=admin123
```
>returns error if the email/user don't exist or wrong password
>returns empty list if no orders are made

+ **get all orders:**
//TODO implement password check ?
```http
GET http://localhost:3000/orders
```
+ **get all discounted orders:**
+ **get all bowls:**
//TODO implement password check ?
```http
GET http://localhost:3000/orders/discounts
```

+ **add an order:**
_remember that an order object is created by passing an object/dict {name:asd, thing:asd}, this is done in case no ID is known to the frontend but just added at insertion_
```http
POST http://localhost:3000/orders
Content-Type: application/json

{ "userID": userID,
  "appliedDiscount": optional it defaults to "FALSE" case sensitive and text,
  "total" : 10.5,
  "orderDate": optional, defaults to dayjs today,
  "orderID":optional and only used in extraction usually defaults to null}
```
>raises issues if userID or total are not correct

//TODO possibly add a check on whter the user exists before

+ **Delete an order:**
deletion of an order given its id

```htpp 
DELETE http://localhost:3000/orders/orderID
```
>if the order ID is not present returns error message

+ **add a bowl:**
adds a bowl given the proper parameters
```http
POST http://localhost:3000/bowls
Content-Type: application/json

{
 "userId": INTEGER,
 "orderId": INTEGER,
 "size": S,M,L,
 "base": "Rice",
 "proteins": "Chicken,Salmon" or ["chicken",...],
 "ingredients": "Tomato,Cucumber,Onion",
 "price": 2 decimals float
 }
```
>may raise errors if the userId, orderId or price are not numbers


+ **Delete bowl by bowl ID:**
given the bowl Id deletes the element from database
```http
DELETE http://localhost:3000/bowls/:bowlId
```
>raises error if the bowl id is not found
+ **Delete bowl by OrderId:**
given the order ID deletes all the bowls from that order
```http
DELETE http://localhost:3000/bowls/orders/:orderId
```
>raiser error if the orderId is not found


# TODO:
b ) add:
- get by specific characteristics

c ) add:
 - get user by ID
 - get order by ID
 - get bowl by ID
 - get by date? 
 - get bowls by size
 ...?

d) add:
- create new user (DONE but could also do directly in the http link ?)
- create new bowl (DONE could it be the same?)
- create new order (DONE but same)

e - f) add:
didn't quite catch what it meant anyway:
- update user changing email/password/username ?
- bowl ? 

g) add:
- delete user (DONE)
- delete bowl (DONE)
- delete order (DONE)




----
(you mayupdate this file to keep track of the progress of your group work, throughout the weeks)
