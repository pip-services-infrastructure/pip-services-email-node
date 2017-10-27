"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class EmailDeliveryHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('email_delivery');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-emaildelivery', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailDeliveryHttpServiceV1 = EmailDeliveryHttpServiceV1;
//# sourceMappingURL=EmailDeliveryHttpServiceV1.js.map