"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const EmailDeliveryServiceFactory_1 = require("../build/EmailDeliveryServiceFactory");
class EmailDeliveryLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("email_delivery", "Email delivery function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailDeliveryServiceFactory_1.EmailDeliveryServiceFactory());
    }
}
exports.EmailDeliveryLambdaFunction = EmailDeliveryLambdaFunction;
exports.handler = new EmailDeliveryLambdaFunction().getHandler();
//# sourceMappingURL=EmailDeliveryLambdaFunction.js.map