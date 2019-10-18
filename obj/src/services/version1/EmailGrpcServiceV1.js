"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/email_v1_grpc_pb');
let messages = require('../../../../src/protos/email_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const EmailGrpcConverterV1_1 = require("./EmailGrpcConverterV1");
class EmailGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.EmailService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-email", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    sendMessage(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new pip_services3_commons_node_1.ConfigParams();
        EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        this._controller.sendMessage(correlationId, message, parameters, (err) => {
            let error = EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromError(err);
            let response = new messages.EmailEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    sendMessageToRecipient(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new pip_services3_commons_node_1.ConfigParams();
        EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipient = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toRecipient(call.request.getRecipient());
        this._controller.sendMessageToRecipient(correlationId, recipient, message, parameters, (err) => {
            let error = EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromError(err);
            let response = new messages.EmailEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    sendMessageToRecipients(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new pip_services3_commons_node_1.ConfigParams();
        EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipients = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toRecipients(call.request.getRecipientList());
        this._controller.sendMessageToRecipients(correlationId, recipients, message, parameters, (err) => {
            let error = EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromError(err);
            let response = new messages.EmailEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('send_message', null, this.sendMessage);
        this.registerMethod('send_message_to_recipient', null, this.sendMessageToRecipient);
        this.registerMethod('send_message_to_recipients', null, this.sendMessageToRecipients);
    }
}
exports.EmailGrpcServiceV1 = EmailGrpcServiceV1;
//# sourceMappingURL=EmailGrpcServiceV1.js.map