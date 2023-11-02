import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    instance: schema.string(),
    authToken: schema.string(),
    pushToken: schema.string(),
  });

  public messages: CustomMessages = {};
}
