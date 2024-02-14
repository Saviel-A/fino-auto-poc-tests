import { logger } from '@finonex-rnd/fino-logger';

//* User Class: Represents a user with properties such as first name, last name, and email.
export class User {
  firstName: string;
  lastName: string;
  email: string;

  constructor(firstName: string = '', lastName: string = '', email: string = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;

    logger.info('User created successfully');
    logger.info(`Firstname: ${this.firstName}\nLastname: ${this.lastName}\nEmail: ${this.email}`);
  }
}
