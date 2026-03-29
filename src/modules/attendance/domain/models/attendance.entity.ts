export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
}

export class Attendance {
  private readonly _id?: string;
  private _studentId: string;
  private _lessonId: string;
  private _classOfferingId: string;
  private _status: AttendanceStatus;
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

  get studentId(): string {
    return this._studentId;
  }

  get lessonId(): string {
    return this._lessonId;
  }

  get classOfferingId(): string {
    return this._classOfferingId;
  }

  get status(): AttendanceStatus {
    return this._status;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  withStudentId(studentId: string) {
    this._studentId = studentId;
    return this;
  }

  withLessonId(lessonId: string) {
    this._lessonId = lessonId;
    return this;
  }

  withClassOfferingId(classOfferingId: string) {
    this._classOfferingId = classOfferingId;
    return this;
  }

  withStatus(status: AttendanceStatus) {
    this._status = status;
    return this;
  }

  static restore(props?: {
    id?: string;
    studentId: string;
    lessonId: string;
    classOfferingId: string;
    status: AttendanceStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }): Attendance | null {
    if (!props) return null;

    const attendance = new Attendance(
      props.id,
      props.createdAt,
      props.updatedAt,
    );

    attendance._studentId = props.studentId;
    attendance._lessonId = props.lessonId;
    attendance._classOfferingId = props.classOfferingId;
    attendance._status = props.status;

    return attendance;
  }
}
