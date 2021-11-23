import { users } from "../data/users.js";
import DataError from "../models/dataError.js";

export default class CustomerService {
  constructor() {
    this.customers = [];
    this.errors = []
  }

  loadCustomer() {
    for (const user of users) {
      if (
        this.checkUserTypeForCustomer(user) &&
        !this.checkCustomerValidityForErrors(user) &&
        this.checkCustomerAge(user)
      ) {
        this.customers.push(user);
      }
    }
  }

  add(user) {
    if (this.checkUserTypeForCustomer(user)&&
    !this.checkCustomerValidityForErrors(user) &&
    this.checkCustomerAge(user)) {
      this.customers.push(user);
    }
    this.errors.push(
        new DataError("This user can not be added.", user))
  }

  listCustomers() {
    return this.customers;
  }

  getCustomerById(id) {
    return this.customers.find((u) => u.id === id);
  }

  getCustomersSorted() {
    return this.customers.sort((customer1, customer2) => {
      if (customer1.firstName > customer2.firstName) {
        return 1;
      } else if (customer1.firstName === customer2.firstName) {
        return 0;
      } else {
        return -1;
      }
    });
  }

  checkUserTypeForCustomer(user) {
    if (user.type === "customer") {
      return true;
    }
    return false;
  }

  checkCustomerValidityForErrors(user) {
    let requiredFields = "id firstName lastName age city".split(" ");
    let hasErrors = false;
    for (const field of requiredFields) {
      if (!user[field]) {
        hasErrors = true;
        this.errors.push(
          new DataError(`Validation problem. ${field} is required`, user)
        );
      }
    }
    return hasErrors;
  }

  checkCustomerAge(user) {
    let isNumber = true;
    if (Number.isNaN(Number.parseInt(+user.age))) {
      isNumber = false;
      this.errors.push(
        new DataError(`Validation problem. ${user.age} is not a number`, user)
      );
    }
    return isNumber;
  }
}
