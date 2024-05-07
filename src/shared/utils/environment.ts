import { EnvironmentMode } from '../constants/environment';

export const isDevEnvironment = (): boolean => {
  return process.env.NODE_ENV === EnvironmentMode.Development;
};
