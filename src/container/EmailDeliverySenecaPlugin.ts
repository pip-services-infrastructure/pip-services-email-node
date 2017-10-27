import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EmailDeliveryController } from '../logic/EmailDeliveryController';
import { EmailDeliverySenecaServiceV1 } from '../services/version1/EmailDeliverySenecaServiceV1';

export class EmailDeliverySenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-emaildelivery', seneca, EmailDeliverySenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new EmailDeliveryController();
        controller.configure(ConfigParams.fromValue(options));

        let service = new EmailDeliverySenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-emaildelivery', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-emaildelivery', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new EmailDeliverySenecaPlugin(seneca, options);
    return { name: plugin.name };
}