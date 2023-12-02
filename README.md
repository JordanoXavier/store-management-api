# Building Materials Store API

This Typescript Node API serves as a management system for a building materials store.

## Environment Variables

To run this API locally, create a `.env` file and set values for the following variables:
- `MYSQL_USER`: Your MySQL username
- `MYSQL_PASS`: Your MySQL password

## How to Run

To get started, follow these steps:
1. Install dependencies using `npm install` or `yarn install`.
2. Run the development server with `yarn dev`.

## Database Access Configuration

For the API to interact with your MySQL database, execute the following queries in your MySQL environment:

```sql
ALTER USER 'your_username_here' IDENTIFIED WITH mysql_native_password BY 'your_password_here';
flush privileges;
