import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { AuthApiRepository } from "../api/AuthApiRepository";

export function createLoginUseCase() {
  return new LoginUseCase(new AuthApiRepository());
}
