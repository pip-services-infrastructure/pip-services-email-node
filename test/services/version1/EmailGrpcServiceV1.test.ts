let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/email_v1_grpc_pb');
let messages = require('../../../../src/protos/email_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { EmailController } from '../../../src/logic/EmailController';
import { EmailGrpcServiceV1 } from '../../../src/services/version1/EmailGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EmailGrpcServiceV1', ()=> {
    let service: EmailGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let controller = new EmailController();
        controller.configure(ConfigParams.fromTuples(
            'options.disabled', true
        ));

        service = new EmailGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-email', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-email', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/email_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).email_v1.Email;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Send message', (done) => {
        client.send_message(
            {
                message: {
                    to: 'pipdevs@gmail.com',
                    subject: 'Test message',
                    text: 'This is a test message'
                }
            },
            (err, response) => {
                err = err || response.error;

                assert.isNull(err);

                done();
            }
        );
    });

});
