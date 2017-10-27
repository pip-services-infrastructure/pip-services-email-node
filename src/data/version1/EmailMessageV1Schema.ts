import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class EmailMessageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('from', TypeCode.String);
        this.withOptionalProperty('cc', TypeCode.String);
        this.withOptionalProperty('bcc', TypeCode.String);
        this.withOptionalProperty('to', TypeCode.String);
        this.withOptionalProperty('reply_to', TypeCode.String);
        this.withOptionalProperty('subject', null);
        this.withOptionalProperty('text', null);
        this.withOptionalProperty('html', null);
    }
}
