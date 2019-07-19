let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { EmailController } from '../../../src/logic/EmailController';
import { EmailCommandableGrpcServiceV1 } from '../../../src/services/version1/EmailCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EmailCommandableGrpcServiceV1', ()=> {
    let service: EmailCommandableGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let controller = new EmailController();
        controller.configure(ConfigParams.fromTuples(
            'options.disabled', true
        ));

        service = new EmailCommandableGrpcServiceV1();
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
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Send message', (done) => {
        client.invoke(
            {
                method: 'v1/email.send_message',
                args_empty: false,
                args_json: JSON.stringify({ 
                    message: {
                        to: 'pipdevs@gmail.com',
                        subject: 'Test message',
                        text: 'This is a test message'
                    }
                })
            },
            (err, response) => {
                assert.isNull(err);

                assert.isTrue(response.result_empty);

                done();
            }
        );
    });

});
