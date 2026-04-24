import type { AuthRepository, LoginInput } from "../../domain/repositories/AuthRepository";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(input: LoginInput) {
    return this.authRepository.login(input);
  }
}
