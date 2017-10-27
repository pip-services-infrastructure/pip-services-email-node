import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

import { EmailMessageV1Schema } from '../data/version1/EmailMessageV1Schema';
import { EmailRecipientV1Schema } from '../data/version1/EmailRecipientV1Schema';
import { EmailMessageV1 } from '../data/version1/EmailMessageV1';
import { IEmailDeliveryController } from './IEmailDeliveryController';

export class EmailDeliveryCommandSet extends CommandSet {
    private _logic: IEmailDeliveryController;

    constructor(logic: IEmailDeliveryController) {
        super();

        this._logic = logic;

		this.addCommand(this.makeSendMessageCommand());
		this.addCommand(this.makeSendMessageToRecipientCommand());
		this.addCommand(this.makeSendMessageToRecipientsCommand());
    }

	private makeSendMessageCommand(): ICommand {
		return new Command(
			"send_message",
			new ObjectSchema(true)
				.withRequiredProperty('message', new EmailMessageV1Schema())
				.withOptionalProperty('parameters', TypeCode.Map),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message = args.get("message");
                let parameters = args.get("parameters");
                this._logic.sendMessage(correlationId, message, parameters, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeSendMessageToRecipientCommand(): ICommand {
		return new Command(
			"send_message_to_recipient",
			new ObjectSchema(true)
				.withRequiredProperty('message', new EmailMessageV1Schema())
				.withRequiredProperty('recipient', new EmailRecipientV1Schema())
				.withOptionalProperty('parameters', TypeCode.Map),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message = args.get("message");
                let recipient = args.get("recipient");
                let parameters = args.get("parameters");
                this._logic.sendMessageToRecipient(correlationId, recipient, message, parameters, (err) => {
					callback(err, null);
				});
            }
		);
	}

	private makeSendMessageToRecipientsCommand(): ICommand {
		return new Command(
			"send_message_to_recipients",
			new ObjectSchema(true)
				.withRequiredProperty('message', new EmailMessageV1Schema())
				.withRequiredProperty('recipients', new ArraySchema(new EmailRecipientV1Schema()))
				.withOptionalProperty('parameters', TypeCode.Map),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message = args.get("message");
                let recipients = args.get("recipients");
                let parameters = args.get("parameters");
                this._logic.sendMessageToRecipients(correlationId, recipients, message, parameters, (err) => {
					callback(err, null);
				});
            }
		);
	}

}