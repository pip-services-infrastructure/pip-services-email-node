import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EmailServiceFactory } from '../build/EmailServiceFactory';

export class EmailProcess extends ProcessContainer {

    public constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory);
    }


}
