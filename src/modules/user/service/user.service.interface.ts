export interface IUserService {
  create: () => Promise<void>;
  get: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
}
