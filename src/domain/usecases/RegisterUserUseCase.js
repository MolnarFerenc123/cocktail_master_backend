const bcrypt = require("bcryptjs");

class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create(email, passwordHash);

    return { id: newUser.id, email: newUser.email };
  }
}

module.exports = RegisterUserUseCase;