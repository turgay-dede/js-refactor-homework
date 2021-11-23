import { EMPLOYEE } from "../data/types.js";
import { users } from "../data/users.js";
import DataError from "../models/dataError.js";

export default class EmployeeService {
  constructor() {
    this.employees = [];
    this.errors = []
  }

  loadEmployee() {
    for (const user of users) {
      if (
        this.checkUserTypeForEmployee(user) &&
        !this.checkEmployeeValidityForErrors(user) &&
        this.checkEmployeeAge(user)
      ) {
        this.employees.push(user);
      }
    }
  }

  add(user) {
    if (this.checkUserTypeForEployee(user)) {
      this.employees.push(user);
    }
    this.errors.push(
        new DataError("This user can not be added. Wrong user type", user))
    this.loggerService.log(user);
  }

  listEployees() {
    return this.employees;
  }

  getEmployeeById(id) {
    return this.employees.find((u) => u.id === id);
  }

  getEmployeesSorted() {
    return this.employees.sort((employee1, employee2) => {
      if (employee1.firstName > employee2.firstName) {
        return 1;
      } else if (employee1.firstName === employee2.firstName) {
        return 0;
      } else {
        return -1;
      }
    });
  }

  checkUserTypeForEmployee(user) {
    if (user.type == EMPLOYEE) {
      return true;
    }
    return false;
  }

  checkEmployeeValidityForErrors(user) {
    let requiredFields = "id firstName lastName age city salary".split(" ");
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

  checkEmployeeAge(user) {
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
