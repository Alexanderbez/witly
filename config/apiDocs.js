'use strict';

module.exports = {
  "swagger": "2.0",
  "info": {
    "description": "A simple Bitly-esque RESTful API exposing a URL shortening functionality.",
    "version": "0.0.1",
    "title": "Witly API"
  },
  "host": "localhost:1337",
  "basePath": "/api",
  "tags": [{
    "name": "shorty",
    "description": "A shortened URL resource."
  }],
  "schemes": [
    "http"
  ],
  "paths": {
    "/shorties": {
      "post": {
        "tags": [
          "shorty"
        ],
        "summary": "Create a new Shorty",
        "description": "",
        "operationId": "createShorty",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "in": "body",
          "name": "body",
          "description": "Shorty resource to be created",
          "required": true,
          "schema": {
            "$ref": "#/definitions/Shorty"
          }
        }],
        "responses": {
          "200": {
            "description": "Resource created",
            "schema": {
              "$ref": "#/definitions/Shorty"
            }
          },
          "400": {
            "description": "Failed to create resource"
          },
          "422": {
            "description": "Invalid input"
          }
        }
      },
      "get": {
        "tags": [
          "shorty"
        ],
        "summary": "Retrieve all Shorties",
        "description": "",
        "operationId": "getAllShorties",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Shorty"
              }
            }
          },
          "400": {
            "description": "Failed to query for resources"
          }
        }
      }
    },
    "/shorties/search": {
      "get": {
        "tags": [
          "shorty"
        ],
        "summary": "Find Shorties by search criteria",
        "description": "",
        "operationId": "searchShorties",
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "name": "uid",
          "in": "query",
          "description": "The shortened UID of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "url",
          "in": "query",
          "description": "The URL of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "expireAt",
          "in": "query",
          "description": "The expiration timestamp of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "createdAt",
          "in": "query",
          "description": "The creation timestamp of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "updatedAt",
          "in": "query",
          "description": "The last updated timestamp of the Shorty resource",
          "required": false,
          "type": "string"
        }],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Shorty"
              }
            }
          },
          "400": {
            "description": "Failed to query for resources"
          }
        }
      }
    },
    "/shorties/find": {
      "get": {
        "tags": [
          "shorty"
        ],
        "summary": "Find a Shorty by search criteria",
        "description": "",
        "operationId": "findShorty",
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "name": "uid",
          "in": "query",
          "description": "The shortened UID of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "url",
          "in": "query",
          "description": "The URL of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "expireAt",
          "in": "query",
          "description": "The expiration timestamp of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "createdAt",
          "in": "query",
          "description": "The creation timestamp of the Shorty resource",
          "required": false,
          "type": "string"
        }, {
          "name": "updatedAt",
          "in": "query",
          "description": "The last updated timestamp of the Shorty resource",
          "required": false,
          "type": "string"
        }],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "$ref": "#/definitions/Shorty"
            }
          },
          "404": {
            "description": "No resource found"
          },
          "400": {
            "description": "Failed to query for resource"
          }
        }
      }
    },
    "/shorties/{shortyId}": {
      "get": {
        "tags": [
          "shorty"
        ],
        "summary": "Find a Shorty by ID",
        "description": "Returns a single Shorty",
        "operationId": "getShortyById",
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "name": "shortyId",
          "in": "path",
          "description": "ID of Shorty to return",
          "required": true,
          "type": "integer",
          "format": "int64"
        }],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "$ref": "#/definitions/Shorty"
            }
          },
          "404": {
            "description": "No resource found"
          },
          "400": {
            "description": "Failed to query for resource"
          }
        }
      },
      "delete": {
        "tags": [
          "shorty"
        ],
        "summary": "Delete a Shorty",
        "description": "",
        "operationId": "deleteShorty",
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "name": "shortyId",
          "in": "path",
          "description": "ID of Shorty to delete",
          "required": true,
          "type": "integer",
          "format": "int64"
        }],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "$ref": "#/definitions/Shorty"
            }
          },
          "404": {
            "description": "No resource found"
          },
          "400": {
            "description": "Failed to query for resource"
          }
        }
      },
      "patch": {
        "tags": [
          "shorty"
        ],
        "summary": "Update a Shorty",
        "description": "",
        "operationId": "updateShorty",
        "produces": [
          "application/json"
        ],
        "parameters": [{
          "name": "shortyId",
          "in": "path",
          "description": "ID of Shorty to update",
          "required": true,
          "type": "integer",
          "format": "int64"
        }, {
          "in": "body",
          "name": "body",
          "description": "Shorty resource to be updated",
          "required": true,
          "schema": {
            "$ref": "#/definitions/Shorty"
          }
        }],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "$ref": "#/definitions/Shorty"
            }
          },
          "404": {
            "description": "No resource found"
          },
          "400": {
            "description": "Failed to query for resource"
          }
        }
      }
    }
  },
  "definitions": {
    "Shorty": {
      "type": "object",
      "required": [
        "url"
      ],
      "properties": {
        "_id": {
          "type": "integer",
          "format": "int64"
        },
        "url": {
          "type": "string",
          "example": "http://www.google.com"
        },
        "uid": {
          "type": "string"
        },
        "hits": {
          "type": "integer",
          "format": "int32"
        },
        "expireAt": {
          "type": "string",
          "format": "date-time"
        },
        "createdAt": {
          "type": "string",
          "format": "date-time"
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time"
        }
      },
      "xml": {
        "name": "Shorty"
      }
    },
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
};
