import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { EmailController } from '../logic/EmailController';
import { EmailHttpServiceV1 } from '../services/version1/EmailHttpServiceV1';
import { EmailCommandableGrpcServiceV1 } from '../services/version1/EmailCommandableGrpcServiceV1';
import { EmailGrpcServiceV1 } from '../services/version1/EmailGrpcServiceV1';

export class EmailServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-email", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-email", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-email", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-email", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-email", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmailServiceFactory.ControllerDescriptor, EmailController);
		this.registerAsType(EmailServiceFactory.HttpServiceDescriptor, EmailHttpServiceV1);
		this.registerAsType(EmailServiceFactory.CommandableGrpcServiceDescriptor, EmailCommandableGrpcServiceV1);
		this.registerAsType(EmailServiceFactory.GrpcServiceDescriptor, EmailGrpcServiceV1);
	}
	
}
