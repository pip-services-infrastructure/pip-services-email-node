"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const EmailServiceFactory_1 = require("../build/EmailServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class EmailProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory_1.EmailServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_node_1.DefaultGrpcFactory);
    }
}
exports.EmailProcess = EmailProcess;
//# sourceMappingURL=EmailProcess.js.map