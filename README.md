# AWS LAMBDA

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Features

- User CRUD operation
- Unit testing
- Ability to run code offline

## Tech

- [Lambda] - For building serverless function
- [Dynamodb] - No-sql database
- [Serverless framework] - Framework to build serverless application.
- [Jest] - Unit testing of lambda

## Installation

Install the dependencies and devDependencies and start the server.

1. To run application offline (serverless package must be installed)

   ```
       npm install
       sls deploy
       sls offline/ serverless offline
   ```

2. To deploy application to AWS
   ```
   aws configure (to configure aws profile)
   sls deploy/ serverless deploy
   ```
3. To run unit testing
   ```
       npm test
   ```

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |

| GitHub | [github/README.md](https://github.com/Kajal18/aws-lambda-unit-testing/blob/master/README.md)

## Development

Design considered for

1. database:
   a. user_name : string
   b. password: string

2. Lambda
   a. seperate lambda functions for all API endpoint
   b. all functions are authorize (cannot be accessed without authentication)
   c. to test lambda locally, use command `sls offline`. this is provide all API endpoints with localhost
   d. to test lambda in aws, use command `sls deploy`. this will deploy application to aws and enpoint for API can be retreived
   e. coding practice for lambda is followed as, single lambda handler per API endpoint with error handling.

3. Unit testing
   a. refer .env file in the root directory for test to execute properly
   b. already added static data in test case
   c. to run test cases, use command `npm jest`
