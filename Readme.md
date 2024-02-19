# Sequence API

This API provides endpoints for inserting and retrieving sequences.

## Table of Contents

- [Endpoints](#endpoints)
- [Installation](#installation)

## Endpoints

### `POST /sequences`

This endpoint accepts a sequence in the request body, sorts it, generates subsequences, sorts the subsequences, and inserts them into the database.

#### Request Body

```json
{
  "sequence": [1, 4, 2]
}
```

#### Response

```json
[[1], [2], [4], [1, 2], [1, 4], [2, 4], [1, 2, 4]]
```

### `GET /sequences`

This endpoint retrieves the last 10 subsequences inserted into the database with their respective sequence.

#### Response

```json
[
  {
    "sequence": [1, 4, 2],
    "subsequences": [[1], [2], [4], [1, 2], [1, 4], [2, 4], [1, 2, 4]]
  }
]
```

### `GET /token`

This endpoint generates a token for the user to use in the other endpoints of the application.

#### Response

```json
  some_token
```

## Installation

1. Clone the repository.
2. Update the `.env` file with your database credentials, the `JWT_SECRET` with your secret key, and the `PORT` with the port you want to use.
3. Run your docker.
4. Run the command `docker compose up` to start the application.
