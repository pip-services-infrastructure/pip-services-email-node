"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const EmailController_1 = require("../logic/EmailController");
const EmailHttpServiceV1_1 = require("../services/version1/EmailHttpServiceV1");
class EmailServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmailServiceFactory.ControllerDescriptor, EmailController_1.EmailController);
        this.registerAsType(EmailServiceFactory.HttpServiceDescriptor, EmailHttpServiceV1_1.EmailHttpServiceV1);
    }
}
EmailServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-email", "factory", "default", "default", "1.0");
EmailServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-email", "controller", "default", "*", "1.0");
EmailServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-email", "service", "http", "*", "1.0");
exports.EmailServiceFactory = EmailServiceFactory;
//# sourceMappingURL=EmailServiceFactory.js.map