"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class EmailSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('email');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-email', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailSenecaServiceV1 = EmailSenecaServiceV1;
//# sourceMappingURL=EmailSenecaServiceV1.js.map