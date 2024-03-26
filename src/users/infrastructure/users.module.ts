import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases/sign-up.usecase';
import { UserInMemoryRepository } from './database/in-memory/user-in-memory.repository';
import { BcryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider';
import { UserRepository } from '../domain/repositories/user.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository', // nome que definimos pra chamar fora daqui
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    UsersService, // na pratica esse eh um jeito encurtado
    {
      provide: SignupUseCase.UseCase,
      useFactory: ( // use factory para criar de fato um vinculo entre classe e dependencias
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignupUseCase.UseCase(userRepository, hashProvider)
      },
      inject: ['UserRepository', 'HashProvider'],
    }
  ],
})
export class UsersModule { }
