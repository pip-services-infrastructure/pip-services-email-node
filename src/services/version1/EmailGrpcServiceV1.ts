let _ = require('lodash');
let services = require('../../../../src/protos/email_v1_grpc_pb');
let messages = require('../../../../src/protos/email_v1_pb');

import { IReferences, ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { EmailMessageV1 } from '../../data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../../data/version1/EmailRecipientV1';
import { IEmailController } from '../../logic/IEmailController';
import { EmailGrpcConverterV1 } from './EmailGrpcConverterV1';

export class EmailGrpcServiceV1 extends GrpcService {
    private _controller: IEmailController;
	
    public constructor() {
        super(services.EmailService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-email", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IEmailController>('controller');
    }
    
    private sendMessage(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());

        this._controller.sendMessage(
            correlationId,
            message, parameters,
            (err) => {
                let error = EmailGrpcConverterV1.fromError(err);

                let response = new messages.EmailEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private sendMessageToRecipient(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipient = EmailGrpcConverterV1.toRecipient(call.request.getRecipient());

        this._controller.sendMessageToRecipient(
            correlationId,
            recipient, message, parameters,
            (err) => {
                let error = EmailGrpcConverterV1.fromError(err);

                let response = new messages.EmailEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private sendMessageToRecipients(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipients = EmailGrpcConverterV1.toRecipients(call.request.getRecipientList());

        this._controller.sendMessageToRecipients(
            correlationId,
            recipients, message, parameters,
            (err) => {
                let error = EmailGrpcConverterV1.fromError(err);

                let response = new messages.EmailEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }
        
    public register() {
        this.registerMethod(
            'send_message', 
            null,
            this.sendMessage
        );

        this.registerMethod(
            'send_message_to_recipient', 
            null,
            this.sendMessageToRecipient
        );

        this.registerMethod(
            'send_message_to_recipients', 
            null,
            this.sendMessageToRecipients
        );
    }
}
