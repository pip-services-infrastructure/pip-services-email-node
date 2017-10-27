import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { EmailDeliveryServiceFactory } from '../build/EmailDeliveryServiceFactory';

export class EmailDeliveryLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("email_delivery", "Email delivery function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emaildelivery', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailDeliveryServiceFactory());
    }
}

export const handler = new EmailDeliveryLambdaFunction().getHandler();