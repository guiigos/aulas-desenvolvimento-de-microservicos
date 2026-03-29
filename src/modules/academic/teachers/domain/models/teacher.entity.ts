export class Teacher {
  private readonly _id?: string;
  private _name: string;
  private _email: string;
  private _document: string;
  private _degree: string;
  private _specialization: string;
  private _admissionDate: Date;
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

  get email(): string {
    return this._email;
  }

  get document(): string {
    return this._document;
  }

  get degree(): string {
    return this._degree;
  }

  get specialization(): string {
    return this._specialization;
  }

  get admissionDate(): Date {
    return this._admissionDate;
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

  withEmail(email: string) {
    this._email = email;
    return this;
  }

  withDocument(document: string) {
    this._document = document;
    return this;
  }

  withDegree(degree: string) {
    this._degree = degree;
    return this;
  }

  withSpecialization(specialization: string) {
    this._specialization = specialization;
    return this;
  }

  withAdmissionDate(admissionDate: Date) {
    this._admissionDate = admissionDate;
    return this;
  }

  static restore(props?: {
    id?: string;
    name: string;
    email: string;
    document: string;
    degree: string;
    specialization: string;
    admissionDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }): Teacher | null {
    if (!props) return null;

    const teacher = new Teacher(props.id, props.createdAt, props.updatedAt);

    teacher._name = props.name;
    teacher._email = props.email;
    teacher._document = props.document;
    teacher._degree = props.degree;
    teacher._specialization = props.specialization;
    teacher._admissionDate = props.admissionDate;

    return teacher;
  }
}
