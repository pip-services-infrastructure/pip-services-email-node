let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { EmailDeliveryController } from '../../src/logic/EmailDeliveryController';
import { EmailDeliveryLambdaFunction } from '../../src/container/EmailDeliveryLambdaFunction';

suite('EmailDeliveryLambdaFunction', ()=> {
    let lambda: EmailDeliveryLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'controller.descriptor', 'pip-services-emaildelivery:controller:default:default:1.0'
        );

        lambda = new EmailDeliveryLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Send message', (done) => {
        lambda.act(
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