"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class EmailHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-email', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailHttpServiceV1 = EmailHttpServiceV1;
//# sourceMappingURL=EmailHttpServiceV1.js.map