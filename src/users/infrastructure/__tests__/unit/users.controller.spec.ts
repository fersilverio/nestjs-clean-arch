import { UsersController } from '../../users.controller'
import { SignupDto } from '../../dtos/signup.dto'
import { UserOutput } from '@/users/application/dtos/user-output.dto'
import { SignupUseCase } from '@/users/application/usecases/sign-up.usecase'
import { SigninDto } from '../../dtos/signin.dto'
import { SigninUseCase } from '@/users/application/usecases/sign-in.usecase'

describe('UsersController unit tests', () => {
  let sut: UsersController
  let id: string
  let props: UserOutput

  beforeEach(async () => {
    sut = new UsersController()
    id = 'df96ae94-6128-486e-840c-b6f78abb4801'
    props = {
      id,
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    }
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create an user', async () => {
    const output: SignupUseCase.Output = props
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['signupUseCase'] = mockSignupUseCase as any
    const input: SignupDto = {
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
    }
    const result = await sut.create(input)
    expect(output).toMatchObject(result)
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input)
  })

  it('should authenticate an user', async () => {
    const output: SigninUseCase.Output = props
    const mockSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['signinUseCase'] = mockSigninUseCase as any
    const input: SigninDto = {
      email: 'a@a.com',
      password: '1234',
    }
    const result = await sut.login(input)
    expect(output).toMatchObject(result)
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input)
  })
})