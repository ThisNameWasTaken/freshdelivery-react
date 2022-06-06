# ToDos

- [] Get products from firestore
- [] Get categories from firestore
- [] Enable auth
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

No work done here

## Auth

No work done here

## Basic flow

User signs in -> adds some products in the cart -> (gets a few suggestions) -> places the order -> order details are displayed
