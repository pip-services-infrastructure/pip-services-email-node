import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { EmailServiceFactory } from '../build/EmailServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';
import { DefaultGrpcFactory } from 'pip-services3-grpc-node';

export class EmailProcess extends ProcessContainer {

    public constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
    }

}
