export interface IUserRepository {
  create: () => Promise<void>;
  get: () => Promise<void>;
  update: () => Promise<void>;
  delete: () => Promise<void>;
}
