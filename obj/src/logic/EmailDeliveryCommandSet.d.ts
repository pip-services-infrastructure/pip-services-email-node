import { CommandSet } from 'pip-services-commons-node';
import { IEmailDeliveryController } from './IEmailDeliveryController';
export declare class EmailDeliveryCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEmailDeliveryController);
    private makeSendMessageCommand();
    private makeSendMessageToRecipientCommand();
    private makeSendMessageToRecipientsCommand();
}
