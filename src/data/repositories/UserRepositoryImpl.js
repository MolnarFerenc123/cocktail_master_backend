const UserModel = require("../models/UserModel.js");
const User = require("../../domain/models/User.js");

class UserRepositoryImpl {
  async findByEmail(email) {
    const userDoc = await UserModel.findOne({ where: { email } });
    if (!userDoc) return null;
    return new User(userDoc.id, userDoc.email, userDoc.password_hash);
  }

  async create(email, passwordHash) {
    const userDoc = await UserModel.create({
      email,
      password_hash: passwordHash,
    });
    return new User(userDoc.id, userDoc.email, userDoc.password_hash);
  }
}

module.exports = UserRepositoryImpl;