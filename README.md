# Witly API

A simple Bitly-esque RESTful API using Node.js and MongoDB!

## Preliminary

1.) Install package dependencies:

```shell
$ npm install
```

2.) Have MongoDB running on your local machine

```shell
$ mongod
```

3.) Must be running on version >= 4.2.2<br>

## API

```shell
$ npm start
```

API documenation can be found by using the Swagger docs @ `http://localhost:1337`

How are URLs mapped?

A URL has a unique UID that consists of a random permutation of characters in the set `[A-Za-z0-9]`.

See the `Permutator` class in `api/utils/permutator.js`.