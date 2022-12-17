/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
export const BsonType = {
  object: 'object',
  string: 'string',
  init: 'init',
  double: 'double',
};

type StringProperty = {
  bsonType: 'string' | 'string'[];
  description: string;
};

type NumberProperty = {
  description: string;
  minimum: number;
  maximum: number;
};

type ObjectProperty = {
  bsonType: 'object' | 'object'[];
  description: string;
};

interface IntProperty extends NumberProperty {
  bsonType: 'int' | 'int'[];
}

interface DoubleProperty extends NumberProperty {
  bsonType: 'double' | 'double'[];
}

type Properties = StringProperty | IntProperty | DoubleProperty | ObjectProperty;

type SchemaValidator = {
  bsonType: 'object';
  title: string;
  required: string[];
  properties: Record<string, Properties>;
};

export class Schema {
  private _schemas!: Record<string, SchemaValidator>;

  public createSchema(entity: string, schemasValidator: SchemaValidator) {
    this._schemas[entity] = schemasValidator;
  }

  public hasSchemaStructure(entity: string) {
    return this._schemas[entity] != undefined;
  }

  public validatePayload<Payload = Record<string, any>>(
    entity: string,
    payload: Payload
  ): { hasSchemaError: boolean; errorMessage: string } {
    return {} as any;
  }
}
