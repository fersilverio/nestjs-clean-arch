import { ConflictError } from "@/shared/domain/errors/conflict-error"
import { NotFoundError } from "@/shared/domain/errors/not-found-error"
import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/user-in-memory.repository"

describe("UserInMemoryRepository", () => {
  let sut: UserInMemoryRepository

  beforeEach(() => {
    sut = new UserInMemoryRepository()
  })

  it("should throw error when not found - findByEmail method", async () => {
    await expect(sut.findByEmail("a@a.com")).rejects.toThrow(new NotFoundError(`Entity not found using email a@a.com`));
  })

  it("should find an entity by email - findByEmail method", async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)

    const result = await sut.findByEmail(entity.email)

    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should throw error when not found - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email address already used'),
    )
  })

  it('Should find an entity by email - emailExists method', async () => {
    expect.assertions(0)
    await sut.emailExists('a@a.com')
  })
})
