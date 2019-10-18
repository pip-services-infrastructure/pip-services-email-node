"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const EmailServiceFactory_1 = require("../build/EmailServiceFactory");
class EmailLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("email", "Email delivery function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-email', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailServiceFactory_1.EmailServiceFactory());
    }
}
exports.EmailLambdaFunction = EmailLambdaFunction;
exports.handler = new EmailLambdaFunction().getHandler();
//# sourceMappingURL=EmailLambdaFunction.js.map