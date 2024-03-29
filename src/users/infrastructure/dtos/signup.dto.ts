import { SignupUseCase } from "@/users/application/usecases/sign-up.usecase"

export class SignupDto implements SignupUseCase.Input {
  name: string
  email: string
  password: string
}