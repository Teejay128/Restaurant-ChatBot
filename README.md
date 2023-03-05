# Restaurant-ChatBot

A restaurant chatbot that will assist customers in placing orders for their preferred meals.

## Concept

Customers will choose from a given set of queries to send to the backend, which will provide responses to those options.

## Requirements

1. The chatBot interface will be chat like (obviously)
2. Authentication is not required, but user session should be stored on users device
3. On landing customer should be welcomed be given the following options to choose from

    - Select 1 to place an order
    - Select 99 to checkout order
    - Select 98 to view order history
    - Select 97 to see current order
    - Select 0 to cancel order

### Place An Order

- When customer selects 1
- Should respond with a list of available dishes or items, (menu)
- Order items can have multiple options and be accessed with the number select system

### Checkout Order

- When customer selects 99
- Should respond with "order placed"
- If there are no orders, respond with "No order to place" and display an option to place a new order

### See Order History

- When customer selects 98
- Should respond with all placed orders

### See Current Order

- When customer selects 97
- Should respond with the current order

### Cancel Order

- When customer selects 0
- Should respond with "Order Cancelled"
- Cancels any available order

## Notice Board

- Validate inputs
- Tryout multiple features
- Try to make an interactive design
