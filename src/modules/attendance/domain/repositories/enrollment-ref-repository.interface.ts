export type EnrollmentRefStatus = "active" | "canceled";

export const ENROLLMENT_REF_REPOSITORY = Symbol("ENROLLMENT_REF_REPOSITORY");

export interface EnrollmentRefRepository {
  upsert(enrollment: {
    id: string;
    studentId: string;
    classOfferingId: string;
    status: EnrollmentRefStatus;
  }): Promise<void>;
  cancelById(id: string): Promise<void>;
}
