"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EmailServiceFactory_1 = require("../build/EmailServiceFactory");
class EmailProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory_1.EmailServiceFactory);
    }
}
exports.EmailProcess = EmailProcess;
//# sourceMappingURL=EmailProcess.js.map