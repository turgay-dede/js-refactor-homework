import { users } from "../data/users.js";
import DataError from "../models/dataError.js";

export default class UserService {
  constructor(loggerService) {
    this.types = ["customer", "employee"];
    this.errors = [];
  }

  handleUsersType() {
    for (const user of users) {
      if (this.types.indexOf(user.type) === -1) {
        this.errors.push(new DataError("Wrong user type", user));
      }
    }
  }
}
