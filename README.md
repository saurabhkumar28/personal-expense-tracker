# Personal Expense Tracker API

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the server: `node app.js`.

## API Endpoints
- **POST /transactions**: Add a new transaction.
- **GET /transactions**: Get all transactions.
- **GET /transactions/:id**: Get a transaction by ID.
- **PUT /transactions/:id**: Update a transaction.
- **DELETE /transactions/:id**: Delete a transaction.

## Example Request and Response
### Add a New Transaction
Request:
```json
{
  "type": "income",
  "category": "Salary",
  "amount": 5000,
  "description": "October Salary"
}
