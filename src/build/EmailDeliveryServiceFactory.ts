import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { EmailDeliveryController } from '../logic/EmailDeliveryController';
import { EmailDeliveryHttpServiceV1 } from '../services/version1/EmailDeliveryHttpServiceV1';
import { EmailDeliverySenecaServiceV1 } from '../services/version1/EmailDeliverySenecaServiceV1'; 

export class EmailDeliveryServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-emaildelivery", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-emaildelivery", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-emaildelivery", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-emaildelivery", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmailDeliveryServiceFactory.ControllerDescriptor, EmailDeliveryController);
		this.registerAsType(EmailDeliveryServiceFactory.SenecaServiceDescriptor, EmailDeliverySenecaServiceV1);
		this.registerAsType(EmailDeliveryServiceFactory.HttpServiceDescriptor, EmailDeliveryHttpServiceV1);
	}
	
}
