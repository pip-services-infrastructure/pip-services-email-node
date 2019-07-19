import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class EmailCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-email', 'controller', 'default', '*', '1.0'));
    }
}