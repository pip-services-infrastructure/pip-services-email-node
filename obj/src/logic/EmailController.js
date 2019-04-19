"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let mustache = require('mustache');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_components_node_2 = require("pip-services3-components-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const EmailCommandSet_1 = require("./EmailCommandSet");
class EmailController {
    constructor() {
        this._parameters = new pip_services3_commons_node_1.ConfigParams();
        this._connectionResolver = new pip_services3_components_node_1.ConnectionResolver();
        this._credentialResolver = new pip_services3_components_node_2.CredentialResolver();
    }
    configure(config) {
        this._config = config.setDefaults(EmailController._defaultConfig);
        this._messageFrom = config.getAsStringWithDefault("message.from", this._messageFrom);
        this._messageCc = config.getAsStringWithDefault("message.cc", this._messageCc);
        this._messageBcc = config.getAsStringWithDefault("message.bcc", this._messageBcc);
        this._messageReplyTo = config.getAsStringWithDefault("message.reply_to", this._messageReplyTo);
        this._parameters = config.getSection("parameters");
        this._connectionResolver.configure(config);
        this._credentialResolver.configure(config);
    }
    setReferences(references) {
        this._connectionResolver.setReferences(references);
        this._credentialResolver.setReferences(references);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EmailCommandSet_1.EmailCommandSet(this);
        return this._commandSet;
    }
    isOpen() {
        return this._transport != null;
    }
    open(correlationId, callback) {
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
                    let params = {
                        service: this._connection.getAsString('service'),
                        host: this._connection.getHost(),
                        secureConnection: this._connection.getAsBoolean('ssl'),
                        port: this._connection.getPort(),
                    };
                    if (this._credential != null) {
                        params.auth = {
                            user: this._credential.getUsername(),
                            pass: this._credential.getPassword()
                        };
                    }
                    this._transport = nodemailer.createTransport('SMTP', params);
                }
                callback();
            }
        ], callback);
    }
    close(correlationId, callback) {
        this._transport = null;
        callback(null);
    }
    getLanguageTemplate(value, language = 'en') {
        if (value == null)
            return value;
        if (!_.isObject(value))
            return value;
        // Set default language
        language = language || "en";
        // Get template for specified language
        let template = value[language];
        // Get template for default language
        if (template == null)
            template = value["en"];
        return "" + template;
    }
    renderTemplate(value, parameters, language = 'en') {
        let template = this.getLanguageTemplate(value, language);
        return template ? mustache.render(template, parameters) : null;
    }
    sendMessage(correlationId, message, parameters, callback) {
        // Skip processing if email is disabled or message has no destination
        if (this._transport == null || message.to == null) {
            let err = new pip_services3_commons_node_2.BadRequestException(correlationId, 'EMAIL_DISABLED', 'emails disabled, or email recipient not set');
            if (callback)
                callback(err);
            return;
        }
        try {
            parameters = this._parameters.override(parameters);
            let subject = this.renderTemplate(message.subject, parameters);
            let text = this.renderTemplate(message.text, parameters);
            let html = this.renderTemplate(message.html, parameters);
            let envelop = {
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
        }
        catch (ex) {
            callback(ex);
        }
    }
    makeRecipientParameters(recipient, parameters) {
        parameters = this._parameters.override(parameters);
        parameters.append(recipient);
        return parameters;
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters, callback) {
        // Skip processing if email is disabled
        if (this._transport == null || recipient == null || recipient.email == null) {
            let err = new pip_services3_commons_node_2.BadRequestException(correlationId, 'EMAIL_DISABLED', 'emails disabled, or recipients email not set');
            if (callback)
                callback(err);
            return;
        }
        try {
            let recParams = this.makeRecipientParameters(recipient, parameters);
            let recLanguage = recipient.language;
            let subject = this.renderTemplate(message.subject, recParams, recLanguage);
            let text = this.renderTemplate(message.text, recParams, recLanguage);
            let html = this.renderTemplate(message.html, recParams, recLanguage);
            let envelop = {
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
        }
        catch (ex) {
            callback(ex);
        }
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters, callback) {
        // Skip processing if email is disabled
        if (this._transport == null || recipients == null || recipients.length == 0) {
            let err = new pip_services3_commons_node_2.BadRequestException(correlationId, 'EMAIL_DISABLED', 'emails disabled, or no recipients sent');
            if (callback)
                callback(err);
            return;
        }
        // Send email separately to each user
        async.each(recipients, (recipient, callback) => {
            this.sendMessageToRecipient(correlationId, recipient, message, parameters, callback);
        }, callback);
    }
}
EmailController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('message.from', null, 'message.cc', null, 'message.bcc', null, 'message.reply_to', null);
exports.EmailController = EmailController;
//# sourceMappingURL=EmailController.js.map