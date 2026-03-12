const UserRepositoryImpl = require("../../data/repositories/UserRepositoryImpl");
const RegisterUserUseCase = require("../../domain/usecases/RegisterUserUseCase");
const LoginUserUseCase = require("../../domain/usecases/LoginUserUseCase");

const userRepository = new UserRepositoryImpl();

exports.register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Password must contain at least one uppercase letter, one lowercase letter, and one number" });
    }

    const useCase = new RegisterUserUseCase(userRepository);
    const result = await useCase.execute(email, password);

    res.status(201).json(result);
  } catch (err) {
    if (err.message === "Email already in use") {
      return res.status(409).json({ error: "Email is already in use" });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const useCase = new LoginUserUseCase(userRepository);
    const result = await useCase.execute(email, password);

    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};