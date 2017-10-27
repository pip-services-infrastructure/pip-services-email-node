"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class EmailRecipientV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('email', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('language', pip_services_commons_node_2.TypeCode.String);
    }
}
exports.EmailRecipientV1Schema = EmailRecipientV1Schema;
//# sourceMappingURL=EmailRecipientV1Schema.js.map