# NodeJS test task

<!-- ## Getting Started

Clone this repo -->

### Prerequisites

Node.js v12

### Installing


Clone this repo and run:

```
npm start
```

If server was successfuly start you'll next message:

```
Server is running on 3000
```

### Create transaction

There are implemented two kind of transaction: debit and credit. Debit transaction reduce user balans, credit - increase.
To create a new transaction send POST request to url:

```
http://localhost:3000/account/commit-transaction
```
With request body:

```
{
    "type": "debit",
    "amount": 10
}
```

Response body:
```
{
    "id": "id",
    "type": "debit",
    "amount": 10,
    "effectiveDate": "2020-02-05T07:17:40.915Z"
}
```

You can specify transaction type in property type - debit or credit. Any other transactions type are not implemented.

The property 'amount' could be only number. Transaction with negative amount will be rejected.

### Transaction hisoty
Each successful transaction will have record in history:
```
{
    "id": "string",
    "type": "credit",
    "amount": 0,
    "effectiveDate": "2020-02-05T07:19:39.691Z"
}
```

To get all history send request

GET:
```
http://localhost:3000/history
```
Response:
```
[  
    {
        "id": "id",
        "type": "debit",
        "amount": 10,
        "effectiveDate": "2020-02-05T07:17:40.915Z"
    }
]
```

Also you can get specific transaction by id.
GET:
```
http://localhost:3000/history/:id
```
Response:
```
{
    "id": "9876a030-47e7-11ea-af46-8b27ac531e2b",
    "type": "credit",
    "amount": 20,
    "effectiveDate": "2020-02-05T07:17:40.915Z"
}
```
