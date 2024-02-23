

# Expense Tracker App

This project contains the source code and configuration for a serverless expense tracker application. The application allows users to add and get expenses securely using AWS services such as Lambda, API Gateway, DynamoDB, and Cognito.

## Getting Started

To deploy the application, follow these steps:

1. Install the AWS CLI and configure your AWS credentials.
2. Install the SAM CLI.
3. Clone this repository to your local machine.
4. Navigate to the root directory of the project.
5. Run the following commands:

```
sam build
sam deploy --guided
```

Follow the prompts during the guided deployment process to configure the stack name, AWS region, and other options.

## Usage

Once deployed, you can use the API endpoints to interact with the expense tracker application. Here are the available endpoints:

- **Add Expense**: `/addExpense` (POST)
  - Use this endpoint to add a new expense. Send a JSON payload with the expense details in the request body.
- **Get Expense**: `/getExpense` (GET)
  - Use this endpoint to download the list of expenses. The response will be a JSON array containing all expenses stored in the DynamoDB table.



## Architecture

The expense tracker application uses the following AWS services:

- AWS Lambda: Handles business logic for adding and retrieving expenses.
- Amazon API Gateway: Provides HTTP endpoints for interacting with the application.
- Amazon DynamoDB: Stores expense data.
- Amazon Cognito: Provides user authentication and authorization for accessing the APIs.

