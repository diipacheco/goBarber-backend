import ISendMailDTO from '../dtos/ISendMailDTO';

interface IMailProvider {
  sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void>;
}

export default IMailProvider;
