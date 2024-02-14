import { User } from '../models/user';
import { generateRandomNumbers } from '../utils/generateRandomNumbers';
import { logger } from '@finonex-rnd/fino-logger';

//* Factory Interface: Defines a factory for creating user instances and obtaining user details
interface Factory {
  user: User;
  getUser: () => Promise<User>;
}

export const userFactory: Factory = {
  user: {
    firstName: 'testa',
    lastName: 'testu',
    email: '',
  },

  //* Getting a new user
  async getUser(): Promise<User> {
    //* Generate a dynamic email for the user
    this.user.email = `test${await generateRandomNumbers()}@mailinator.com`;
    logger.error('User created successfully');
    logger.info(`Firstname: ${this.user.firstName}`);
    logger.info(`Lastname: ${this.user.lastName}`);
    logger.info(`Email: ${this.user.email}`);
    return this.user;
  },
};
