let EmailDeliveryLambdaFunction = require('../obj/src/container/EmailDeliveryLambdaFunction').EmailDeliveryLambdaFunction;

module.exports = new EmailDeliveryLambdaFunction().getHandler();