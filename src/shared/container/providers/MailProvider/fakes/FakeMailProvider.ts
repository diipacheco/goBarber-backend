import IMailProvider from '../models/IMailProvider';

interface IMassage {
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private messages: IMassage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}

export default FakeMailProvider;
