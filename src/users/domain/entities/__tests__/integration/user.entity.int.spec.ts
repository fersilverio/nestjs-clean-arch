import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/shared/domain/errors/validation-error"

describe("UserEntity integration tests", () => {
  describe("Constructor method", () => {
    it("Should throw an error when creating a user with invalid name", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        name: "",
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        name: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        name: "a".repeat(256),
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })


    it("Should throw an error when creating a user with invalid email", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        email: "",
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        email: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        email: "a".repeat(256),
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })

    it("Should throw an error when creating a user with invalid password", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        password: "",
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        password: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)


      props = {
        ...UserDataBuilder({}),
        password: "a".repeat(101),
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)
    })


    it("Should throw an error when creating a user with invalid createdAt", () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: "2024" as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        createdAt: 10 as any,
      }

      expect(() => new UserEntity(props)).toThrow(EntityValidationError)

    })


    it("Should a valid user", () => {
      expect.assertions(0);

      let props: UserProps = {
        ...UserDataBuilder({}),
      }

      new UserEntity(props)

    })




  })


  describe("Update method", () => {
    it("Should throw an error when updating a user with invalid name", () => {
      const entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.update(null)).toThrow(EntityValidationError)
      expect(() => entity.update("")).toThrow(EntityValidationError)
      expect(() => entity.update(10 as any)).toThrow(EntityValidationError)
      expect(() => entity.update("a".repeat(256))).toThrow(EntityValidationError)
    })

    it("Should a valid user", () => {
      expect.assertions(0);

      let props: UserProps = {
        ...UserDataBuilder({}),
      }

      const entity = new UserEntity(props)
      entity.update("Other name")

    })
  })

  describe("Update password method", () => {
    it("Should invalid a user using password field", () => {
      const entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.updatePassword(null)).toThrow(EntityValidationError)
      expect(() => entity.updatePassword("")).toThrow(EntityValidationError)
      expect(() => entity.updatePassword(10 as any)).toThrow(EntityValidationError)
      expect(() => entity.updatePassword("a".repeat(101))).toThrow(EntityValidationError)
    })

    it('Should a valid user', () => {
      expect.assertions(0)

      const props: UserProps = {
        ...UserDataBuilder({}),
      }

      const entity = new UserEntity(props)
      entity.updatePassword('other password')
    })


  })
})
