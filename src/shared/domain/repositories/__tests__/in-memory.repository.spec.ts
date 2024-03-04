import { Entity } from "../../entities/entity"
import { NotFoundError } from "../../errors/not-found-error"
import { InMemoryRepository } from "../in-memory.repository"

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> { }


class StubInMemoryRepository extends InMemoryRepository<StubEntity> {

}

describe("InMemoryRepository unit tests", () => {
  let sut = new StubInMemoryRepository()

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it("Should insert a new entity", async () => {
    const entity = new StubEntity({ name: "test", price: 10 })

    await sut.insert(entity)

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it("Should throw error when entity not found", async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(new NotFoundError("Entity not found"))
  })

  it("Should find a entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 10 })

    await sut.insert(entity)
    const result = await sut.findById(entity._id)

    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })
})
