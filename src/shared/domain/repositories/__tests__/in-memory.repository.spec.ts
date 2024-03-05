import { en } from "@faker-js/faker"
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

  it("Should find an entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 10 })

    await sut.insert(entity)
    const result = await sut.findById(entity._id)

    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it("Should return all entities", async () => {
    const entity = new StubEntity({ name: "test", price: 10 })

    await sut.insert(entity)
    const result = await sut.findAll()

    expect([entity]).toStrictEqual(result)
  })



  it("Should throw error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "test", price: 10 })
    await expect(sut.update(entity)).rejects.toThrow(new NotFoundError("Entity not found"))
  })


  it("Should update an entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 10 })

    await sut.insert(entity)

    const entityUpdated = new StubEntity({ name: "updated test name", price: 50 }, entity._id)

    await sut.update(entityUpdated)

    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })


  it("Should throw error when entity not found", async () => {
    await expect(sut.delete('fakeId')).rejects.toThrow(new NotFoundError("Entity not found"))
  })


  it("Should delete an entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 10 })

    await sut.insert(entity)


    await sut.delete(entity._id)

    expect(sut.items).toHaveLength(0)
  })
})
