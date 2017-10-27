import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { EmailDeliveryServiceFactory } from '../build/EmailDeliveryServiceFactory';

export class EmailDeliveryProcess extends ProcessContainer {

    public constructor() {
        super("email_delivery", "Email delivery microservice");
        this._factories.add(new EmailDeliveryServiceFactory);
    }


}
