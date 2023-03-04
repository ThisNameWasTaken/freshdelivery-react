# ToDos

- [x] Get products from firestore
- [x] Get categories from firestore
- [x] Enable auth
- [] Get User's orders from firestore (might be better for this collection to be standalone and have an userId prop so that it can be queried using the where statement; it might be easier to train the AI on such a collection)
- [] Publish orders
- [] Delivery address (not really needed for now)

## Collections

### Products

Pretty much in place

### Related Products

Should be products within the same category

### Popular products

Should be the most purchased products; Each order should trigger an update on the purchases counter for each product

### Categories

Pretty much in place

### Orders

- [] Delivery hours
- [] Delivery Address
- [] Contact number
- [] Whether or not the order has been payed for
- [] Delivery instructions
- [] Leave it at the door step if not answered
- [] Delivery tip

## Auth

Mostly done

## Basic flow

User signs in -> adds some products in the cart -> (gets a few suggestions) -> places the order -> order details are displayed

## Reviews

- [x] Display reviews (for a product)
- [x] Add a review

## Cart

<!-- - [] Inside the cart show some suggested products -->

- [x] Or add a suggested products list / hook
