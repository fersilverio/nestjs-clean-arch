import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { DeleteUserUseCase } from '../../delete-user.usecase'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/user-in-memory.repository'

describe('DeleteUserUseCase unit tests', () => {
  let sut: DeleteUserUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new DeleteUserUseCase.UseCase(repository)
  })

  it('Should throw error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should delete an user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const items = [new UserEntity(UserDataBuilder({}))]
    repository.items = items

    expect(repository.items).toHaveLength(1)
    await sut.execute({ id: items[0]._id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items).toHaveLength(0)
  })
})
