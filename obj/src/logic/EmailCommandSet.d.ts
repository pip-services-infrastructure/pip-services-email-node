import { CommandSet } from 'pip-services3-commons-node';
import { IEmailController } from './IEmailController';
export declare class EmailCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IEmailController);
    private makeSendMessageCommand;
    private makeSendMessageToRecipientCommand;
    private makeSendMessageToRecipientsCommand;
}
