"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class EmailDeliverySenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('email_delivery');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailDeliverySenecaServiceV1 = EmailDeliverySenecaServiceV1;
//# sourceMappingURL=EmailDeliverySenecaServiceV1.js.map