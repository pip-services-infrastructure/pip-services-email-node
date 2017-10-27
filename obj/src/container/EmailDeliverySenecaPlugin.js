"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const EmailDeliveryController_1 = require("../logic/EmailDeliveryController");
const EmailDeliverySenecaServiceV1_1 = require("../services/version1/EmailDeliverySenecaServiceV1");
class EmailDeliverySenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-emaildelivery', seneca, EmailDeliverySenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new EmailDeliveryController_1.EmailDeliveryController();
        controller.configure(pip_services_commons_node_3.ConfigParams.fromValue(options));
        let service = new EmailDeliverySenecaServiceV1_1.EmailDeliverySenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-emaildelivery', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.EmailDeliverySenecaPlugin = EmailDeliverySenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new EmailDeliverySenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=EmailDeliverySenecaPlugin.js.map