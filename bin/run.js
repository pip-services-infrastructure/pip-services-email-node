let EmailDeliveryProcess = require('../obj/src/container/EmailDeliveryProcess').EmailDeliveryProcess;

try {
    new EmailDeliveryProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
