# Restaurant-ChatBot

This is a restaurant chatbot that allows customers to place, cancel, view, and checkout orders for their preferred meals.

All responses are hard-coded and there was no use of external APIs or artificial intelligent software.

## Concept

Customers will make request on a chat-like frontend, which will then send these responses to the backend. The customers are given a list of options, which can be selected by entering the corresponding number.

The connection between the frontend and backend is established with websockets. This ensures a persistent connection among the two, and erases the need to send a request to specific endpoints.

## Requirements

The requirements for this project were given by Altschool_Africa and are as follows:

1. The project interface will be chat-like (Requests and response on opposing sides, along with the input form at the bottom of the screen).
2. Authentication is not required, but the user session should be stored on user's device.
3. On landing, the customer should be welcomed and be given the following options to choose from

    - Select 1 to place an order
    - Select 99 to checkout order
    - Select 98 to view order history
    - Select 97 to see current order
    - Select 0 to cancel order

## Implemented Solution

I made a specific event for each request, such that any time a request is made on the frontend, the request triggers a corresponding request on the backend, where it is then handled and responded to.

On login, the user is directed to the main menu where there are given 5 options to choose from.

### Place An Order

- When a customer selects 1
- Responds with a list of available dishes, in which the user can order from
- Once a dish is clicked, it is added to the user's orders
- It then gives the user an option, to view, checkout, or plave more orders

### Checkout Order

- When a customer selects 99
- Responds with "order placed" if the user has any orders
- If there are no orders, a response of "No order to place" is displayed along with an option to place a new order

### See Order History

- When a customer selects 98
- Responds with "All placed orders", number of others placed, and a list of all the placed others with an option to view each one
- If there are no orders, it responds with "No order to place", and the user is redirected to the order placing section.

### See Current Order

- When a customer selects 97
- Responds with the current order, details about the order, and an option to either place more checkout all orders
- If there are no orders, it responds with "There is no current order", and the user is redirected to the order placing section.

### Cancel Order

- When a customer selects 0
- Responds with "Order Cancelled" and gives the user an option to place an order, or rate the entire project
- If there are no orders, it responds with "There are no orders to cancel", and gives the user an option to place a new order
- Cancels all available order

## Notice Board

- Validate inputs
    User can only input numeric data
- Tryout multiple features
    Added a ratings feature
    Added a go to main menu feature
- Try to make an interactive design
    Got the basic interface from [codepen](https://codepen.io/solygambas/pen/MWJxaOJ) and then modified it to meet my needs and made it more responsive

Visit the [live site](https://foodgpt.onrender.com) and make a new issue or add any suggestions
