## Food Delivery App

## Tech Stacks Used
- node.js, express.js, mongoose, mongodb

## Features 
-  Authentication
-  Register/Login
-  Crud operations on restaurant and orders schema

### Environment Variables Required
`mongoURL`

`key`

`port` 
   
## API Endpoints
   #### Welcome
```javascript
GET  /api/
```

  #### User Register
```javascript
POST  /api/register

`Request body:
    {
        name: String,
        email: String,
        password: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String
        }
    }
`

Process:
- Hashing the password.
- Saving user data in database
- Respond with status 201

```
  #### User Login
```javascript
POST  /api/login

`Request body:
    {
        email: String,
        password: String
    }
`
Process:
- Compare password with hashed password in database
- Generate access token
- Respond with status 201

```

  #### Reset Password
```javascript
PATCH  /api/user/:id/reset

`Request body:
    {
        cur_pass: String,
        new_pass: String
    }
`
Process:
- Fetch user from user id provided in params
- Compare current password with hashed password in database
- If passwords match, hash the new password and update in database 
- Respond with status 204

```

  #### Fetching all restaurants data
```javascript
GET  /api/restaurants

Process:
- Fetch data from restaurants collection in database
- Respond with status 200

```

  #### Fetching restaurant with desired id
```javascript
GET  /api/restaurants/:id

Process:
- Fetch data from restaurants collection in database
- Respond with status 200

```

  #### Add new restaurant
```javascript
POST  /api/restaurants

Process:
- Add new flight data flights collection in database
- Respond with status 201

`Request body:

    {
        name: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String
        },
        menu: [{
            name: String,
            description: String,
            price: Number,
            image: String
        }]
    }
`
```

  #### Fetching menu of specific restaurant with id
```javascript
GET  /api/restaurants/:id/menu

Process:
- Fetch restaurant with id provided in params
- Fetch the menu of the restaurant
- Respond with status 200

```

  #### Add new menu
```javascript
POST  /api/restaurants/:id/menu

Process:
- Fetch restaurant with id provided in params
- Add new menu data in restaurant
- Respond with status 201

`Request body:

    {
        name: String,
        description: String,
        price: Number,
        image: String
    }
`
```

  #### Delete menu from restaurant
```javascript
DELETE  /api/restaurants/:id/menu/:id

Process:
- Fetch restaurant with id provided in params
- Delete menu with menu id provided in params
- Respond with status 202

```

  #### Place new order
```javascript
POST  /api/orders

Process:
- Get userID of user who is ordering from authenticate middleware
- Add new order data in orders collection in database
- Respond with status 201

`Request body:

    {
        items: [{
            name: String,
            price: Number,
            quantity: Number
        }],
        deliveryAddress: {
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String
        },
        restaurantID: {ObjectID, ref:restaurants}
    }
`
```

  #### Fetching specific order with given id
```javascript
GET  /api/orders/:id

Process:
- Fetch order with id provided in params
- Respond with status 200

```

  #### Update Order Status
```javascript
PATCH  /api/orders/:id

`Request body:
    {
        status: String, 
    }
    e.g, "placed", "preparing", "on the way", "delivered"
`
Process:
- Fetch order from order id provided in params
- Update status of the order
- Respond with status 204

```