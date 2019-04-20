"use strict";
const awsServerlessExpress = require('aws-serverless-express');
const application = require('./build/App').default;
const server = awsServerlessExpress.createServer(application);

exports.handler = (event, context) => {
  console.log("EVENT: " + JSON.stringify(event));
  awsServerlessExpress.proxy(server, event, context);
};
