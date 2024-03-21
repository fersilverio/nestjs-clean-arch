import { ListUsersUseCase } from '../../listusers.usecase'
import { UserRepository } from '@/users/domain/repositories/user.repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/user-in-memory.repository'

describe('ListUsersUseCase unit tests', () => {
  let sut: ListUsersUseCase.UseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new ListUsersUseCase.UseCase(repository)
  })

  it('toOutput method', () => {
    let result = new UserRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    let output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })

    const entity = new UserEntity(UserDataBuilder({}))
    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    })
    output = sut['toOutput'](result)
    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
    })
  })
})
