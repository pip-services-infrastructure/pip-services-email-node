"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EmailDeliveryServiceFactory_1 = require("../build/EmailDeliveryServiceFactory");
class EmailDeliveryProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("email_delivery", "Email delivery microservice");
        this._factories.add(new EmailDeliveryServiceFactory_1.EmailDeliveryServiceFactory);
    }
}
exports.EmailDeliveryProcess = EmailDeliveryProcess;
//# sourceMappingURL=EmailDeliveryProcess.js.map