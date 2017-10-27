# Email Delivery Microservice

This is a email delivery microservice from Pip.Services library. 
This microservice sends emails to specified recipients.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-users/pip-clients-emaildelivery-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class EmailMessageV1 {
    public from: string;
    public cc: string;
    public bcc: string;
    public to: string;
    public reply_to: string;
    public subject: string;
    public text: string;
    public html: string;
}

class EmailRecipientV1 {
    public id: string;
    public name: string;
    public email: string;
    public language: string;
}

interface IEmailDeliveryV1 {
    sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams,
        callback?: (err: any) => void): void;
    sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void);
    sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams, callback?: (err: any) => void): void;
}
```

Message subject, text and html content can be set by handlebars template, that it processed using parameters set. Here is an example of the template:

```html
Dear {{ name }},
<p/>
Please, help us to verify your email address. Your verification code is {{ code }}.
<p/>
Click on the 
<a href="{{ clientUrl }}/#/verify_email?server_url={{ serverUrl }}&email={{ email }}&code={{ code }}">link</a>
to complete verification procedure
<p/>
---<br/>
{{ signature }}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-users/pip-services-emaildelivery-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 
Example of microservice configuration
```yaml
---
- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-emaildelivery:controller:default:default:1.0"
  message:
    from: 'somebody@somewhere.com'
    to: 'somebody@somewhere.com'
  connection:
    service: 'Gmail'
    host: 'smtp.gmail.com'
    secure_connection: true
    port: 465
  credential:
    username: 'somebody@gmail.com'
    password: 'pass123'
  
- descriptor: "pip-services-emaildelivery:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-emaildelivery-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-emaildelivery-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.EmailDeliveryHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Send email message to address
client.sendMessage(
    null,
    { 
        to: 'somebody@somewhere.com',
        subject: 'Test',
        text: 'This is a test message. Please, ignore it'
    },
    function (err) {
        ...
    }
);
```

```javascript
// Send email message to users
client.sendMessageToRecipients(
    null,
    [
        { id: '123', email: 'user1@somewhere.com' },
        { id: '321', email: 'user2@somewhere.com' }
    ],
    { 
        subject: 'Test',
        text: 'This is a test message. Please, ignore it'
    },
    function (err) {
        ...
    }
);
```

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

