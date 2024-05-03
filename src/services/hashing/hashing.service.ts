import { injectable } from 'inversify';
import { compare, genSalt, hash } from 'bcrypt';

import { IHashingService } from './hashing.service.interface';

@injectable()
export class HashingService implements IHashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
