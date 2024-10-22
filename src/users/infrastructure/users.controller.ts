import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, Put, Query } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';
import { GetUserUseCase } from '../application/usecases/get-user.usecase ';
import { ListUsersUseCase } from '../application/usecases/list-users.usecase';
import { SigninUseCase } from '../application/usecases/sign-in.usecase';
import { SignupUseCase } from '../application/usecases/sign-up.usecase';
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usecase';
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase ';
import { ListUsersDto } from './dtos/list-users.dto';
import { SigninDto } from './dtos/signin.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserOutput } from '../application/dtos/user-output.dto';
import { UserPresenter } from './presenters/user.presenter';

@Controller('users')
export class UsersController {

  @Inject(SignupUseCase.UseCase)
  private signupUseCase: SignupUseCase.UseCase

  @Inject(SigninUseCase.UseCase)
  private signinUseCase: SigninUseCase.UseCase

  @Inject(UpdateUserUseCase.UseCase)
  private updateUserUseCase: UpdateUserUseCase.UseCase

  @Inject(UpdatePasswordUseCase.UseCase)
  private updatePasswordUseCase: UpdatePasswordUseCase.UseCase

  @Inject(DeleteUserUseCase.UseCase)
  private deleteUserUseCase: DeleteUserUseCase.UseCase

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase

  @Inject(ListUsersUseCase.UseCase)
  private listUsersUseCase: ListUsersUseCase.UseCase

  static userToResponse(output: UserOutput) {
    return new UserPresenter(output);
  }

  @Post()
  async create(@Body() signupDto: SignupDto) {
    const output = await this.signupUseCase.execute(signupDto);
    return UsersController.userToResponse(output);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signinDto: SigninDto) {
    const output = await this.signinUseCase.execute(signinDto)
    return UsersController.userToResponse(output)
  }

  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return this.listUsersUseCase.execute(searchParams)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getUserUseCase.execute({ id })
    return UsersController.userToResponse(output)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const output = await this.updateUserUseCase.execute({
      id,
      ...updateUserDto,
    })
    return UsersController.userToResponse(output)
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const output = await this.updatePasswordUseCase.execute({
      id,
      ...updatePasswordDto,
    })
    return UsersController.userToResponse(output)
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }
}
