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
you can send the http request straight from the md file as a test.

 **list of APIs:**
* **add User:**
add a new user in the database if it doesn't exist or the email is not in use.

```http
POST http://localhost:3000/user/check
Content-Type: application/json

{
"username": "admin",
"email": "admin@gmail.com",
"password": "admin123"
}
```
    might raise errors if: password is shorter than 8, username or email already used. (the email and user check is only availlable at **/user/check**).
* **delete User:**
delete a user from the database ONLY if all the parameters are correct (user, email and password):
```http
DELETE  http://localhost:3000/user
Content-Type: application/json

{
"username": "admin",
"email": "admin@gmail.com",
"password": "admin123"
}
```
    might raise errors if the user is not found or it has incorrect parameters.

+ **get all users:**
//TODO implement password check ?
```http
GET http://localhost:3000/user
```
+ **Get a specific user:**  
  _TODO: Given a username or email + password, return the user object._  

  - **To get a user with a known email and password:**  
    ```http
    GET http://localhost:3000/user/authenticate?email=test@mail.com&password=password123
    ```  

  - **To get a user with a known username and password:**  
    ```http
    GET http://localhost:3000/user/authenticate?username=Sam&password=password123
    ```


    ----
    (you mayupdate this file to keep track of the progress of your group work, throughout the weeks)
