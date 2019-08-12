"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const EmailMessageV1Schema_1 = require("../data/version1/EmailMessageV1Schema");
const EmailRecipientV1Schema_1 = require("../data/version1/EmailRecipientV1Schema");
class EmailCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        this.addCommand(this.makeSendMessageCommand());
        this.addCommand(this.makeSendMessageToRecipientCommand());
        this.addCommand(this.makeSendMessageToRecipientsCommand());
    }
    makeSendMessageCommand() {
        return new pip_services3_commons_node_2.Command("send_message", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('message', new EmailMessageV1Schema_1.EmailMessageV1Schema())
            .withOptionalProperty('parameters', pip_services3_commons_node_5.TypeCode.Map), (correlationId, args, callback) => {
            let message = args.get("message");
            let parameters = args.get("parameters");
            this._logic.sendMessage(correlationId, message, parameters, (err) => {
                callback(err, null);
            });
        });
    }
    makeSendMessageToRecipientCommand() {
        return new pip_services3_commons_node_2.Command("send_message_to_recipient", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('message', new EmailMessageV1Schema_1.EmailMessageV1Schema())
            .withRequiredProperty('recipient', new EmailRecipientV1Schema_1.EmailRecipientV1Schema())
            .withOptionalProperty('parameters', pip_services3_commons_node_5.TypeCode.Map), (correlationId, args, callback) => {
            let message = args.get("message");
            let recipient = args.get("recipient");
            let parameters = args.get("parameters");
            this._logic.sendMessageToRecipient(correlationId, recipient, message, parameters, (err) => {
                callback(err, null);
            });
        });
    }
    makeSendMessageToRecipientsCommand() {
        return new pip_services3_commons_node_2.Command("send_message_to_recipients", new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('message', new EmailMessageV1Schema_1.EmailMessageV1Schema())
            .withRequiredProperty('recipients', new pip_services3_commons_node_4.ArraySchema(new EmailRecipientV1Schema_1.EmailRecipientV1Schema()))
            .withOptionalProperty('parameters', pip_services3_commons_node_5.TypeCode.Map), (correlationId, args, callback) => {
            let message = args.get("message");
            let recipients = args.get("recipients");
            let parameters = args.get("parameters");
            this._logic.sendMessageToRecipients(correlationId, recipients, message, parameters, (err) => {
                callback(err, null);
            });
        });
    }
}
exports.EmailCommandSet = EmailCommandSet;
//# sourceMappingURL=EmailCommandSet.js.map