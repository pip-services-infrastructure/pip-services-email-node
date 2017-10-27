"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const EmailDeliveryController_1 = require("../logic/EmailDeliveryController");
const EmailDeliveryHttpServiceV1_1 = require("../services/version1/EmailDeliveryHttpServiceV1");
const EmailDeliverySenecaServiceV1_1 = require("../services/version1/EmailDeliverySenecaServiceV1");
class EmailDeliveryServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmailDeliveryServiceFactory.ControllerDescriptor, EmailDeliveryController_1.EmailDeliveryController);
        this.registerAsType(EmailDeliveryServiceFactory.SenecaServiceDescriptor, EmailDeliverySenecaServiceV1_1.EmailDeliverySenecaServiceV1);
        this.registerAsType(EmailDeliveryServiceFactory.HttpServiceDescriptor, EmailDeliveryHttpServiceV1_1.EmailDeliveryHttpServiceV1);
    }
}
EmailDeliveryServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-emaildelivery", "factory", "default", "default", "1.0");
EmailDeliveryServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emaildelivery", "controller", "default", "*", "1.0");
EmailDeliveryServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emaildelivery", "service", "seneca", "*", "1.0");
EmailDeliveryServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-emaildelivery", "service", "http", "*", "1.0");
exports.EmailDeliveryServiceFactory = EmailDeliveryServiceFactory;
//# sourceMappingURL=EmailDeliveryServiceFactory.js.map