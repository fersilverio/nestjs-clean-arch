import { SigninUseCase } from "@/users/application/usecases/sign-in.usecase"

export class SigninDto implements SigninUseCase.Input {
  email: string
  password: string
}