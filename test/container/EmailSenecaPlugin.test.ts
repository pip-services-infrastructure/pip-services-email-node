let _ = require('lodash');
let assert = require('chai').assert;

let pluginOptions = {
    logger: {
        level: 'debug'
    },
    service: {
        connection: {
            protocol: 'none'
        }
    }
};

suite('EmailSenecaPlugin', ()=> {
    let seneca;

    suiteSetup((done) => {
        seneca = require('seneca')({ strict: { result: false } });

        // Load Seneca plugin
        let plugin = require('../../src/container/EmailSenecaPlugin');
        seneca.use(plugin, pluginOptions);

        seneca.ready(done);
    });

    suiteTeardown((done) => {
        seneca.close(done);
    });

    test('Send message', (done) => {
        seneca.act(
            {
                role: 'email',
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