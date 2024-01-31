export type FieldsErrors = {
  [field: string]: string[]
}

// contrato para validacoes
export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors
  validatedData: PropsValidated

  validate(data: any): ConstrainBoolean
}
