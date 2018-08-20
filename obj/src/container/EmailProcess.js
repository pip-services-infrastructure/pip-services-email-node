"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const EmailServiceFactory_1 = require("../build/EmailServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class EmailProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory_1.EmailServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.EmailProcess = EmailProcess;
//# sourceMappingURL=EmailProcess.js.map