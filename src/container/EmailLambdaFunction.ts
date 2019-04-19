import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { EmailServiceFactory } from '../build/EmailServiceFactory';

export class EmailLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("email", "Email delivery function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-email', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailServiceFactory());
    }
}

export const handler = new EmailLambdaFunction().getHandler();