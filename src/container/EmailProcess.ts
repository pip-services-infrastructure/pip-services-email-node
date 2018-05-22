import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { EmailServiceFactory } from '../build/EmailServiceFactory';

export class EmailProcess extends ProcessContainer {

    public constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }


}
