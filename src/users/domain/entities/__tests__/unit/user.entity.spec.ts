import { UserEntity, UserProps } from "../../user.entity"
import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"

describe("UserEntity unit tests", () => {

  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder({})

    sut = new UserEntity(props)
  })

  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe("string")
  })

  it('Setter of name field', () => {
    sut['name'] = 'Other Name'

    expect(sut.props.name).toEqual('Other Name')
    expect(typeof sut.props.name).toBe("string")
  })

  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe("string")
  })

  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe("string")
  })

  it('Setter of password field', () => {
    sut['password'] = 'Other password' // para driblar o private para usar aqui no teste

    expect(sut.props.password).toEqual('Other password')
    expect(typeof sut.props.password).toBe("string")
  })

  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })


  it('Should update an user', () => {
    sut.update('Other Name')

    expect(sut.props.name).toEqual('Other Name')
  })

  it('Should update password field from an user', () => {
    sut.updatePassword('Other password')

    expect(sut.props.password).toEqual('Other password')
  })
})
