import React from "react";
import Home from "./pages/Home";
/* import AWS from "aws-sdk";

AWS.config.update({
  region: "sa-east-1",
  endpoint: "https://dynamodb.sa-east-1.amazonaws.com",
  accessKeyId: "AKIAXOOTFKMWLTN5HRK6",
  secretAccessKey: "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",
}); */

/* var docClient = new AWS.DynamoDB.DocumentClient();

function createItem() {
  var params = {
    TableName: "Reminder",
    Item: {
      id: 1231231341,
      email: "cauegmoyano@gmail.com",
      info: {
        date: "20210512T16:00:00Z",
        match: "Manchester United vs Liverpool",
        cron: "cron(12 12 * *)",
      },
    },
  };
  docClient.put(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
} */
/* createItem(); */
/* var dynamodb = new AWS.DynamoDB();
function createTable() {
  var params = {
    TableName: "Reminder",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
      { AttributeName: "email", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" },
      { AttributeName: "email", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };
  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("success added", data);
    }
  });
}
createTable(); */
const App = () => {
  return <Home />;
};

export default App;
