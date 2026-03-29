export class Subject {
  private readonly _id?: string;
  private _name: string;
  private _code: string;
  private _workload: number;
  private _description: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  private constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get workload(): number {
    return this._workload;
  }

  get description(): string {
    return this._description;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  withName(name: string) {
    this._name = name;
    return this;
  }

  withCode(code: string) {
    this._code = code;
    return this;
  }

  withWorkload(workload: number) {
    this._workload = workload;
    return this;
  }

  withDescription(description: string) {
    this._description = description;
    return this;
  }

  static restore(props?: {
    id?: string;
    name: string;
    code: string;
    workload: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Subject | null {
    if (!props) return null;

    const subject = new Subject(props.id, props.createdAt, props.updatedAt);

    subject._name = props.name;
    subject._code = props.code;
    subject._workload = props.workload;
    subject._description = props.description;

    return subject;
  }
}
