import { ConfigParams } from 'pip-services-commons-node';
import { EmailMessageV1 } from '../data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../data/version1/EmailRecipientV1';
export interface IEmailDeliveryController {
    sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
    sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1, message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): any;
    sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[], message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
}
