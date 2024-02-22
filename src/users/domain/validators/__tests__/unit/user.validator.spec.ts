import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserRules, UserValidator, UserValidatorFactory } from "../../user.validator"


let sut: UserValidator

describe('User Validator unit tests', () => {
  describe('Name field', () => {

    beforeEach(() => {
      sut = UserValidatorFactory.create()
    })

    it('Invalidation cases for name field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()

      // i logged sut.errors['name'] to get the error messages from class validator
      expect(sut.errors['name']).toStrictEqual(
        [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      )


      isValid = sut.validate({ ...UserDataBuilder({}), name: '' as any })

      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(['name should not be empty'])


      isValid = sut.validate({ ...UserDataBuilder({}), name: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(
        [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      )

      isValid = sut.validate({ ...UserDataBuilder({}), name: 'a'.repeat(256) as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual(
        [
          'name must be shorter than or equal to 255 characters'
        ]
      )


    })


    it("Valid case for name field", () => {
      const props = UserDataBuilder({})

      const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRules(props))


    })

  });


  describe('Email field', () => {

    beforeEach(() => {
      sut = UserValidatorFactory.create()
    })


    it("Valid case for user validator class", () => {
      const props = UserDataBuilder({})

      const isValid = sut.validate(props)
      expect(isValid).toBeTruthy()
      expect(sut.validatedData).toStrictEqual(new UserRules(props))


    })

    it('Invalidation cases for email field', () => {
      let isValid = sut.validate(null as any)
      expect(isValid).toBeFalsy()

      // i logged sut.errors['email'] to get the error messages from class validator
      expect(sut.errors['email']).toStrictEqual(
        [
          'email must be an email',
          'email should not be empty',
          'email must be a string',
          'email must be shorter than or equal to 255 characters'
        ]
      );


      isValid = sut.validate({ ...UserDataBuilder({}), email: '' as any })

      expect(isValid).toBeFalsy()



      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email should not be empty',
      ])


      isValid = sut.validate({ ...UserDataBuilder({}), email: 10 as any })
      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual(
        [
          'email must be an email',
          'email must be a string',
          'email must be shorter than or equal to 255 characters'
        ]
      )

      isValid = sut.validate({ ...UserDataBuilder({}), email: 'a'.repeat(256) as any })

      console.log(sut.errors['email'])


      expect(isValid).toBeFalsy()
      expect(sut.errors['email']).toStrictEqual(
        [
          "email must be an email",
          'email must be shorter than or equal to 255 characters'
        ]
      )


    });

  })

})
