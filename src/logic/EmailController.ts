let _ = require('lodash');
let async = require('async');
let handlebars = require('handlebars');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { ConnectionParams } from 'pip-services-commons-node';
import { ConnectionResolver } from 'pip-services-commons-node';
import { CredentialParams } from 'pip-services-commons-node';
import { CredentialResolver } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { BadRequestException } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';

import { EmailMessageV1 } from '../data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../data/version1/EmailRecipientV1';
import { IEmailController } from './IEmailController';
import { EmailCommandSet } from './EmailCommandSet';

export class EmailController implements IConfigurable, IReferenceable, ICommandable, IOpenable, IEmailController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'message.from', null,
        'message.cc', null,
        'message.bcc', null,
        'message.reply_to', null
    );

    private _config: ConfigParams;

    private _messageFrom: string;
    private _messageCc: string;
    private _messageBcc: string;
    private _messageReplyTo: string;
    private _parameters: ConfigParams = new ConfigParams();

    private _connection: ConnectionParams;
    private _connectionResolver: ConnectionResolver = new ConnectionResolver();
    private _credential: CredentialParams;
    private _credentialResolver: CredentialResolver = new CredentialResolver();
    private _transport: any;
    private _commandSet: EmailCommandSet;

    public configure(config: ConfigParams): void {
        this._config = config.setDefaults(EmailController._defaultConfig);

        this._messageFrom = config.getAsStringWithDefault("message.from", this._messageFrom);
        this._messageCc = config.getAsStringWithDefault("message.cc", this._messageCc);
        this._messageBcc = config.getAsStringWithDefault("message.bcc", this._messageBcc);
        this._messageReplyTo = config.getAsStringWithDefault("message.reply_to", this._messageReplyTo);
        this._parameters = config.getSection("parameters");

        this._connectionResolver.configure(config);
        this._credentialResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._connectionResolver.setReferences(references);
        this._credentialResolver.setReferences(references);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EmailCommandSet(this);
        return this._commandSet;
    }

    public isOpened(): boolean {
        return this._transport != null;
    }

    public open(correlationId: string, callback: (err: any) => void): void {
        if (this._transport) {
            callback(null);
            return;
        }

        async.series([
            (callback) => {
                this._connectionResolver.resolve(correlationId, (err, connection) => {
                    this._connection = connection;
                    // Hack!!!
                    if (this._connection != null && this._connection.getAsString('service') == null)
                        this._connection = null;
                    callback(err);
                });
            },
            (callback) => {
                this._credentialResolver.lookup(correlationId, (err, credential) => {
                    this._credential = credential;
                    callback(err);
                });
            },
            (callback) => {
                if (this._connection != null) {
                    let nodemailer = require('nodemailer');

                    let params: any = {
                        service: this._connection.getAsString('service'),
                        host: this._connection.getHost(),
                        secureConnection: this._connection.getAsBoolean('ssl'),
                        port: this._connection.getPort(),
                    };

                    if (this._credential != null) {
                        params.auth = {
                            user: this._credential.getUsername(),
                            pass: this._credential.getPassword()
                        }
                    }

                    this._transport = nodemailer.createTransport('SMTP', params);
                }

                callback();
            }
        ], callback);
    }

    public close(correlationId: string, callback: (err: any) => void): void {
        this._transport = null;

        callback(null);
    }
    
    private getLanguageTemplate(value: any, language: string = 'en') {
        if (value == null) return value;
        if (!_.isObject(value)) return value;

        // Set default language
        language = language || "en";

        // Get template for specified language
        let template = value[language];

        // Get template for default language
        if (template == null)
            template = value["en"];
        
        return "" + template;
    }

    private compileTemplate(value: any, language: string): any {
        let template = this.getLanguageTemplate(value, language);
        return template ? handlebars.compile(template) : null;
    }

    private renderTemplate(value: any, parameters: ConfigParams, language: string = 'en'): string {
        let template = this.compileTemplate(value, language);
        return template ? template(parameters) : null;
    }

    public sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void {
        
        // Skip processing if email is disabled or message has no destination
        if (this._transport == null || message.to == null) {
            if (callback) callback(null);
            return;
        }

        try {
            parameters = this._parameters.override(parameters);

            let subject = this.renderTemplate(message.subject, parameters);
            let text = this.renderTemplate(message.text, parameters);
            let html = this.renderTemplate(message.html, parameters);

            let envelop: any = {
                from: message.from || this._messageFrom,
                cc: message.cc || this._messageCc,
                bcc: message.bcc || this._messageBcc,
                replyTo: message.reply_to || this._messageReplyTo,
                
                to: message.to,
 
                subject: subject,
                text: text,
                html: html
            };
            
            this._transport.sendMail(envelop, callback);
        } catch (ex) {
            callback(ex);
        }
    }

    private makeRecipientParameters(recipient: EmailRecipientV1, parameters: any): ConfigParams {
        parameters = this._parameters.override(parameters);
        parameters.setAsObject(recipient);
        return parameters;
    }

    public sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void) {

        // Skip processing if email is disabled
        if (this._transport == null || recipient == null || recipient.id == null) {
            if (callback) callback(null);
            return;
        }

        try {
            let recParams = this.makeRecipientParameters(recipient, parameters);
            let recLanguage = recipient.language;

            let subject = this.renderTemplate(message.subject, recParams, recLanguage);
            let text = this.renderTemplate(message.text, recParams, recLanguage);
            let html = this.renderTemplate(message.html, recParams, recLanguage);

            let envelop: any = {
                from: message.from || this._messageFrom,
                cc: message.cc || this._messageCc,
                bcc: message.bcc || this._messageBcc,
                replyTo: message.reply_to || this._messageReplyTo,
                
                to: recipient.email,

                subject: subject,
                text: text,
                html: html
            };
            
            this._transport.sendMail(envelop, callback);
        } catch (ex) {
            callback(ex);
        }
    }

    public sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void {

        // Skip processing if email is disabled
        if (this._transport == null || recipients == null || recipients.length == 0) {
            if (callback) callback(null);
            return;
        }

        // Send email separately to each user
        async.each(recipients, (recipient, callback) => {
            this.sendMessageToRecipient(correlationId, recipient, message, parameters, callback); 
        }, callback);
    }

}
