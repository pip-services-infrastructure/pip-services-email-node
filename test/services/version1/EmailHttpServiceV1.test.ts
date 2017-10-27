let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { EmailDeliveryController } from '../../../src/logic/EmailDeliveryController';
import { EmailDeliveryHttpServiceV1 } from '../../../src/services/version1/EmailDeliveryHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EmailDeliveryHttpServiceV1', ()=> {
    let service: EmailDeliveryHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let controller = new EmailDeliveryController();
        controller.configure(new ConfigParams());

        service = new EmailDeliveryHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emaildelivery', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

    test('Send message', (done) => {
        rest.post('/email_delivery/send_message',
            {
                message: {
                    to: 'pipdevs@gmail.com',
                    subject: 'Test message',
                    text: 'This is a test message'
                }
            },
            (err, req, res, result) => {
                assert.isNull(err);
                done();
            }
        );
    });
    
});