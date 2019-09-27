# Cosmos Transaction Collector

### *Documentation goes here

## Preparation

Don't forget to install MongoDB and start it first with `sudo service mongod start`.

Installation Guide of MongoDB: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

## Run

To run it normally on localhost use `npm run start`. Alternatively you can do `node index.js` or `nodemon index.js`.

To run it with docker use `npm run docker`.

## Remarks

Finally I didn't use the https://stargate.cosmos.network endpoint. The server providing this API was too faulty and slow, giving every now and then a `502 Error`.
So I thank Mario for sharing with me his fantastic endpoint instead, at https://lunie.mariopino.es. What an incredible difference between the two!