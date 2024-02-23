/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */





const AWS = require('aws-sdk');    //Best Approch to User Layers For node_modules
export const getExpense = async (event) => {
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();  //Assume Role Policy Must Be Allowed
        const params = {
          TableName: "ExpenseTable",
          FilterExpression: 'userId = :subId',
          ExpressionAttributeValues: {
            ':userId': event?.requestContext?.authorizer?.claims?.sub   
          }
        };
    
        const data = await dynamoDB.scan(params).promise();
    
        return {
          statusCode: 200,
          body: JSON.stringify(data.Items)
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to download expenses' })
        };
      }
    

}
exports.addExpense = async (event) => {
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();    //Assume Role Policy Must Be Allowed
      const { amount, category, date,  } = JSON.parse(event.body);
      
      const params = {
        TableName: "ExpenseTable",
        Item: {
          id: Date.now().toString(), 
          amount,
          category,
          date,
          user_id:event?.requestContext?.authorizer?.claims?.sub   //cognito SubId
        }
      };
  
      await dynamoDB.put(params).promise();
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Expense added successfully' })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to add expense' })
      };
    }
  };