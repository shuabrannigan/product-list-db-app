# product-list-db-app


This project is my follow up to my Basic-Full-Stack-App; I wanted to take the concepts learnt there and make them functional.

This application is based on the concept of buying and selling computer parts, the user inputs the items **Name**, **Type** and **Cost**.

The application then takes that information and stores it within the database, giving it values for **Sold Value** and **Sold Status*.

The information is then fetched and put into a table, at this point functions for working out *margin* and *margin %* are calculated.

The user can then mark the item as *Sold* or *Delete*. Marking the item **Sold** will update the values stored in the db and move the
item to the **Sold Table**, if the user selects to *Delete* the item, this removes the item from the table and the db.

When the item is moved to the **Sold Table** the table item now displays the **Profit Made** and the **Profit %*.

From here the user can mark the item as *Unsold* which will put the item back into the *For Sale* table, reverting the items **Sold Value**
and **Sold Status**.

Additionally I have added a function which runs to see if the item *Sold Value* is negative, if so it gives the table item a class of 'negative',
which enables the value to be displayed in red.

### Landing Screen

![landing-screen](https://github.com/shuabrannigan/product-list-db-app/blob/master/ScreenShots/Landing%20Page.png)

### Sold Table

![sold-table](https://github.com/shuabrannigan/product-list-db-app/blob/master/ScreenShots/Sold%20Items.png)

### Negative Items

![negative-items](https://github.com/shuabrannigan/product-list-db-app/blob/master/ScreenShots/Negative%20Values.png)

##### Technology used
- JavaScript, front end / back end.
- Express.

- Monk.

- Cors.

- MongoDB, for database.

- Nodemon, for auto-refresh when server file updated.

- Live-server, for front end.

- Skeleton, for boilerplate CSS styling.

