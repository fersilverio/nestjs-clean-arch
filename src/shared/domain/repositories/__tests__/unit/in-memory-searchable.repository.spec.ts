import { Entity } from '@/shared/domain/entities/entity'
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> { }

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name']

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items
    }

    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository()
  })

  describe('applyFilter method', () => {
    it('Should not filter items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'name value', price: 50 })]

      // para verificar se o filter nao foi chamado
      const spyFilterMethod = jest.spyOn(items, 'filter') // spyOn serve para ver se algo foi chamado-executado


      const itemsFiltered = await sut['applyFilter'](items, null) // pegando as propriedades protected como array
      expect(itemsFiltered).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('Should filter using filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'TEST', price: 50 }),
        new StubEntity({ name: 'fake', price: 50 })
      ]

      // para verificar se o filter nao foi chamado
      const spyFilterMethod = jest.spyOn(items, 'filter') // spyOn serve para ver se algo foi chamado-executado

      let itemsFiltered = await sut['applyFilter'](items, 'TEST') // pegando as propriedades protected como array

      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)

      itemsFiltered = await sut['applyFilter'](items, 'test')
      expect(itemsFiltered).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(2)

      itemsFiltered = await sut['applyFilter'](items, 'no-filter')
      expect(itemsFiltered).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
    })
  })

  describe('applySort method', () => { })

  describe('applyPaginate method', () => { })

  describe('search method', () => { })
})
