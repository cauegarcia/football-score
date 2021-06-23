import AWS from "aws/sdk";

const dynamoDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const test = (() => {
  console.log(dynamoDb);
})();
