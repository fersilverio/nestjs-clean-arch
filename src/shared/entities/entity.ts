import { v4 as uuidv4 } from "uuid";

export abstract class Entity<Props = any> {
  public readonly _id: string
  public readonly props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this._id = id || uuidv4()
  }

  get id() {
    return this.id
  }

  // Required transforma tudo em obrigatorio, ao contratio do Parcial

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this._id,
      ...this.props
    } as Required<{ id: string } & Props>
  }
}
