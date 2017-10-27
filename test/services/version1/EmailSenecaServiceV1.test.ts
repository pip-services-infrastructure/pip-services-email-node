let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EmailDeliveryController } from '../../../src/logic/EmailDeliveryController';
import { EmailDeliverySenecaServiceV1 } from '../../../src/services/version1/EmailDeliverySenecaServiceV1';

suite('EmailDeliverySenecaServiceV1', ()=> {
    let seneca: any;
    let service: EmailDeliverySenecaServiceV1;
    let controller: EmailDeliveryController;

    suiteSetup((done) => {
        controller = new EmailDeliveryController();
        controller.configure(new ConfigParams());

        service = new EmailDeliverySenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emaildelivery', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    test('Send message', (done) => {
        seneca.act(
            {
                role: 'email_delivery',
                cmd: 'send_message',
                message: {
                    to: 'pipdevs@gmail.com',
                    subject: 'Test message',
                    text: 'This is a test message'
                }
            },
            (err, result) => {
                assert.isNull(err);
                done();
            }
        );
    });
    
});