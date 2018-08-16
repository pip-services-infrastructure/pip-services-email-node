import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class EmailSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('email');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-email', 'controller', 'default', '*', '1.0'));
    }
}