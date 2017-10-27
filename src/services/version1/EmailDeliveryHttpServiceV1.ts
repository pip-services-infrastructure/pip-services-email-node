import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class EmailDeliveryHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('email_delivery');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emaildelivery', 'controller', 'default', '*', '1.0'));
    }
}