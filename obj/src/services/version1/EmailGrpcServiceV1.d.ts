import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class EmailGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private sendMessage(call, callback);
    private sendMessageToRecipient(call, callback);
    private sendMessageToRecipients(call, callback);
    register(): void;
}
