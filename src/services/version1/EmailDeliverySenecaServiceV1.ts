import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class EmailDeliverySenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('email_delivery');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-emaildelivery', 'controller', 'default', '*', '1.0'));
    }
}