import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class EmailHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('email');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-email', 'controller', 'default', '*', '1.0'));
    }
}