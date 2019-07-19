// package: email_v1
// file: email_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class EmailMessage extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getCc(): string;
  setCc(value: string): void;

  getBcc(): string;
  setBcc(value: string): void;

  getTo(): string;
  setTo(value: string): void;

  getReplyTo(): string;
  setReplyTo(value: string): void;

  getSubject(): string;
  setSubject(value: string): void;

  getText(): string;
  setText(value: string): void;

  getHtml(): string;
  setHtml(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EmailMessage): EmailMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailMessage;
  static deserializeBinaryFromReader(message: EmailMessage, reader: jspb.BinaryReader): EmailMessage;
}

export namespace EmailMessage {
  export type AsObject = {
    from: string,
    cc: string,
    bcc: string,
    to: string,
    replyTo: string,
    subject: string,
    text: string,
    html: string,
  }
}

export class EmailRecipient extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailRecipient.AsObject;
  static toObject(includeInstance: boolean, msg: EmailRecipient): EmailRecipient.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailRecipient, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailRecipient;
  static deserializeBinaryFromReader(message: EmailRecipient, reader: jspb.BinaryReader): EmailRecipient;
}

export namespace EmailRecipient {
  export type AsObject = {
    id: string,
    name: string,
    email: string,
    language: string,
  }
}

export class EmailMessageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): EmailMessage | undefined;
  setMessage(value?: EmailMessage): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailMessageRequest): EmailMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailMessageRequest;
  static deserializeBinaryFromReader(message: EmailMessageRequest, reader: jspb.BinaryReader): EmailMessageRequest;
}

export namespace EmailMessageRequest {
  export type AsObject = {
    correlationId: string,
    message?: EmailMessage.AsObject,
    parametersMap: Array<[string, string]>,
  }
}

export class EmailMessageWithRecipientRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): EmailMessage | undefined;
  setMessage(value?: EmailMessage): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  hasRecipient(): boolean;
  clearRecipient(): void;
  getRecipient(): EmailRecipient | undefined;
  setRecipient(value?: EmailRecipient): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailMessageWithRecipientRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailMessageWithRecipientRequest): EmailMessageWithRecipientRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailMessageWithRecipientRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailMessageWithRecipientRequest;
  static deserializeBinaryFromReader(message: EmailMessageWithRecipientRequest, reader: jspb.BinaryReader): EmailMessageWithRecipientRequest;
}

export namespace EmailMessageWithRecipientRequest {
  export type AsObject = {
    correlationId: string,
    message?: EmailMessage.AsObject,
    parametersMap: Array<[string, string]>,
    recipient?: EmailRecipient.AsObject,
  }
}

export class EmailMessageWithRecipientsRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): EmailMessage | undefined;
  setMessage(value?: EmailMessage): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  clearRecipientsList(): void;
  getRecipientsList(): Array<EmailRecipient>;
  setRecipientsList(value: Array<EmailRecipient>): void;
  addRecipients(value?: EmailRecipient, index?: number): EmailRecipient;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailMessageWithRecipientsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailMessageWithRecipientsRequest): EmailMessageWithRecipientsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailMessageWithRecipientsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailMessageWithRecipientsRequest;
  static deserializeBinaryFromReader(message: EmailMessageWithRecipientsRequest, reader: jspb.BinaryReader): EmailMessageWithRecipientsRequest;
}

export namespace EmailMessageWithRecipientsRequest {
  export type AsObject = {
    correlationId: string,
    message?: EmailMessage.AsObject,
    parametersMap: Array<[string, string]>,
    recipientsList: Array<EmailRecipient.AsObject>,
  }
}

export class EmailEmptyReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailEmptyReply.AsObject;
  static toObject(includeInstance: boolean, msg: EmailEmptyReply): EmailEmptyReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailEmptyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailEmptyReply;
  static deserializeBinaryFromReader(message: EmailEmptyReply, reader: jspb.BinaryReader): EmailEmptyReply;
}

export namespace EmailEmptyReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
  }
}

