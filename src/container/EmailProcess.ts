import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EmailServiceFactory } from '../build/EmailServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class EmailProcess extends ProcessContainer {

    public constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
