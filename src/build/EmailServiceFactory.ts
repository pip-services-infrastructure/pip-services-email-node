import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { EmailController } from '../logic/EmailController';
import { EmailHttpServiceV1 } from '../services/version1/EmailHttpServiceV1';
import { EmailSenecaServiceV1 } from '../services/version1/EmailSenecaServiceV1'; 

export class EmailServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-email", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-email", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-email", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-email", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmailServiceFactory.ControllerDescriptor, EmailController);
		this.registerAsType(EmailServiceFactory.SenecaServiceDescriptor, EmailSenecaServiceV1);
		this.registerAsType(EmailServiceFactory.HttpServiceDescriptor, EmailHttpServiceV1);
	}
	
}
