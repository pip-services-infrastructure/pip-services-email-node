import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class EmailHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-email', 'controller', 'default', '*', '1.0'));
    }
}