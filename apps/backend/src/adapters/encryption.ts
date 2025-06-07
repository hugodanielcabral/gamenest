import bcrypt from "bcrypt";

interface IEncryptionAdapter {
  encrypt(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export class BcryptEncryptionAdapter implements IEncryptionAdapter {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async encrypt(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      throw new Error(`Error al encriptar contraseña: ${error}`);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new Error(`Error al comparar contraseña: ${error}`);
    }
  }
}
