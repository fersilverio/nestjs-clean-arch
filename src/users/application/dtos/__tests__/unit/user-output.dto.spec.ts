import { UserEntity } from "@/users/domain/entities/user.entity"
import { UserOutput, UserOutputMapper } from "@/users/application/dtos/user-output.dto"
import { PaginationOutputMapper } from "@/shared/application/dtos/pagination-output.dto"
import { SearchResult } from "@/shared/domain/repositories/searchable-repository-contracts"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"

describe("UserOutputMapper unit tests", () => {
  it('should convert a user in output', () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const spyToJson = jest.spyOn(entity, 'toJSON')
    const sut = UserOutputMapper.toOutput(entity)

    expect(spyToJson).toHaveBeenCalled()
    expect(sut).toStrictEqual(entity.toJSON())
  })
})

