import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

interface IMailTemplateProvider {
  parse({ template, variables }: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
